<script setup lang="ts">
  import { ref, computed, onMounted, reactive, nextTick, onUnmounted, watch } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
  import Chart from 'chart.js/auto';
  import html2canvas from 'html2canvas';
  import CoffeeFairyIcon from '@/components/common/CoffeeFairyIcon.vue';
  import { useAuthStore } from '@/store/auth';
  import {
    brewRecordService,
    type FlavorRadar,
    type AIFeedback,
  } from '@/services/brewRecordService';

  // 引入本地樣式 (玻璃效果、動畫等)
  import './style.css';

  // import { GoogleGenAI } from "@google/genai"; // 移除前端直接調用

  // --- BREW LOGIC (從模組匯入) ---
  import {
    clamp,
    safeRatio,
    lerp,
    getRoastIndex,
    getRatioNorm,
    getRatioDist01,
    getStrengthIndex,
    getSimProgress01,
    getFlowRateMlPerSec,
    getPercolationResistance01,
    getIdealFlowMlPerSec,
    getBloomFactor,
    getDegassingPourPenalty01,
    getExtractionIndex,
    createBloomState,
    getCoffeeDose,
    getIdealBloomWater,
    getIdealBloomTimeSec,
    startBloomIfNeeded,
    updateBloomWetting,
    updateBloomDegassing,
    getBloomQuality01,
    getUniformityIndex,
    getRatioPenalty,
    calculateSweetness,
    calculateAcidity,
    calculateClarity,
    calculateBody,
    calculateAftertaste,
  } from '@/utils/Refine/brewMath';

  // --- END BREW LOGIC ---

  // ====== 使用 useBrewState Composable ======
  import { useBrewState } from '@/composables/Refine/useBrewState';

  const brewState = useBrewState();
  const authStore = useAuthStore();

  const {
    canvasContainer,
    showResultModal,
    isSnapshotting,
    showMobileSettings,
    showMobileStats,
    isMobile,
    checkMobile,
    deltaSecRef,
    waterDeltaMlRef,
    flowRateMlPerSecRef,
    pourRateMlPerSec,
    roastLevel,
    grindLevel,
    totalWater,
    accumulatedCoffee,
    brewTimeSec,
    pours,
    isPouring,
    hasStarted,
    startTime,
    coffeeDose,
    lastPourStopTime,
    bloomState,
    distributionScore,
    wetGrid,
    sessionLog,
    addLogEntry,
    currentRatio,
    roastLabel,
    grindLabel,
    formattedTime,
    bloomPhase,
    bloomPhaseDisplay,
    configObject,
    coachInfo,
    predictedYield,
    currentExtractionIndex,
    currentUniformityIndex,
    flavorScores,
    extractionVisual,
    uniformityVisual,
    resetSimulation: resetBrewStateSimulation,
  } = brewState;

  // 用於 AI 日誌
  let lastLogTime = 0;

  // AI Coach State
  const aiAdvice = reactive({ action: '', reason: '' });
  const isAiLoading = ref(false);
  let lastAiCallTime = 0;
  // Note: Using Vite environment variable
  // Note: API Key removed from frontend
  // const aiClient = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // AI Brew Report State
  const aiReport = reactive({
    summary: '',
    top_issues: [] as string[],
    next_attempt_plan: [] as string[],
    taste_prediction: '',
    loading: false,
    done: false,
  });

  // 結果卡片的 ref (用於截圖)
  const resultCardRef = ref<HTMLElement | null>(null);

  const fetchAiAdvice = async (trigger = 'update') => {
    // Simple throttle: Don't call if loading or if called within last 8 seconds (unless it's a phase change trigger)
    const now = Date.now();
    if (isAiLoading.value) return;
    if (trigger === 'update' && now - lastAiCallTime < 8000) return;

    isAiLoading.value = true;
    lastAiCallTime = now;

    const config = configObject.value;
    const simplifiedState = {
      roast: config.roastLevel < -0.3 ? 'light' : config.roastLevel > 0.3 ? 'dark' : 'medium',
      grind: config.grindLevel < -0.3 ? 'fine' : config.grindLevel > 0.3 ? 'coarse' : 'medium',
      water_poured: Math.round(config.waterPouredMl),
      time_elapsed: Math.round(config.elapsedSec),
      phase: config.bloomPhase,
      ratio: `1:${currentRatio.value}`,
      extraction_index: getExtractionIndex(config).toFixed(2),
    };

    try {
      const response = await fetch(`${API_BASE}/api/gemini/refine/advice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brewState: simplifiedState }),
      });

      if (!response.ok) throw new Error('API Request successful but returned error status');

      const json = await response.json();
      if (json) {
        aiAdvice.action = json.action;
        aiAdvice.reason = json.reason;
      }
    } catch (e: any) {
      console.error('AI Coach Error (fetchAiAdvice):', e);
      aiAdvice.action = '嘿嘿嘿';
      aiAdvice.reason = '別著急 請耐心';
    } finally {
      isAiLoading.value = false;
    }
  };

  const generateBrewReport = async () => {
    aiReport.loading = true;
    aiReport.done = false;

    // Compact log string
    const logStr = sessionLog.value.map((l) => `T${l.t}:W${l.w}:Ph-${l.ph}`).join('\n');

    const finalConfig = {
      roast: roastLabel.value,
      grind: grindLabel.value,
      ratio: currentRatio.value,
      time: formattedTime.value,
      extraction: currentExtractionIndex.value,
      uniformity: currentUniformityIndex.value,
    };

    try {
      const response = await fetch(`${API_BASE}/api/gemini/refine/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ finalConfig, logStr }),
      });

      if (!response.ok) throw new Error('Report API Error');

      const json = await response.json();
      if (json) {
        aiReport.summary = json.summary;
        aiReport.top_issues = json.top_issues || [];
        aiReport.next_attempt_plan = json.next_attempt_plan || [];
        aiReport.taste_prediction = json.taste_prediction;
        aiReport.done = true;
      }
    } catch (e: any) {
      console.error('AI Report Error (generateBrewReport):', e);
      aiReport.summary = `無法生成報告: ${e.message || '未知錯誤'}`;
    } finally {
      aiReport.loading = false;
    }
  };

  const copyRecipe = () => {
    if (!aiReport.done) return;
    const text = `FeiTime AI 建議配方:\n${aiReport.next_attempt_plan.join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('配方已複製 (Recipe Copied)');
    });
  };

  let radarChartInstance: any = null;
  let lineChartInstance: any = null;
  let resultRadarInstance: any = null;

  // 注意：currentRatio, roastLabel, grindLabel, formattedTime, bloomPhase, bloomPhaseDisplay,
  // configObject, coachInfo, predictedYield, currentExtractionIndex, currentUniformityIndex,
  // extractionVisual, uniformityVisual, flavorScores 已從 useBrewState 匯入

  let scene: any, camera: any, renderer: any, controls: any;
  let kettleGroup: any, spoutTip: any, coffeeBedMesh: any, liquidInServerMesh: any;
  let steamMesh: any, dropsMesh: any;
  let wetTexture: any, wetContext: any;

  // Updated constants for new physics
  const MAX_DROPS = 60;
  const dropsData = new Array(MAX_DROPS).fill(0).map(() => ({
    position: new THREE.Vector3(0, -100, 0),
    velocity: 0,
    active: false,
  }));

  const steamCount = 50;
  const steamData = new Array(steamCount).fill(0).map(() => ({
    x: (Math.random() - 0.5) * 0.5,
    y: Math.random() * 2,
    z: (Math.random() - 0.5) * 0.5,
    scale: Math.random(),
    speed: 0.005 + Math.random() * 0.01,
  }));

  let animationId: any;
  let lastTime = 0;
  let lastDropEmitTime = 0;
  const dummy = new THREE.Object3D();
  const clock = new THREE.Clock();
  const kettleInitialPos = new THREE.Vector3(2.7, 4.5, 0);

  // --- MATERIALS ---
  const woodMaterial = new THREE.MeshStandardMaterial({
    color: '#4a3728',
    roughness: 0.7,
    metalness: 0.1,
  });
  const brassMaterial = new THREE.MeshStandardMaterial({
    color: '#eebb44',
    metalness: 1.0,
    roughness: 0.15,
  });
  const leatherMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513', roughness: 0.9 });
  const ceramicMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.1,
    metalness: 0.1,
    flatShading: true,
  });
  const paperMaterial = new THREE.MeshStandardMaterial({
    color: '#fdfbf7',
    roughness: 1,
    side: THREE.DoubleSide,
  });
  const groundCoffeeMaterial = new THREE.MeshStandardMaterial({ color: '#3b2f2f', roughness: 0.9 });
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    thickness: 0.3,
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
    ior: 1.5,
    color: '#ffffff',
  });
  const coffeeLiquidMaterial = new THREE.MeshStandardMaterial({
    color: '#2a1810',
    roughness: 0.3,
    metalness: 0.1,
  });
  const kettleBodyMat = new THREE.MeshStandardMaterial({
    color: '#2b2b2b',
    metalness: 0.7,
    roughness: 0.3,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: '#f0f0f0',
    metalness: 0.9,
    roughness: 0.2,
  });
  const waterDropMat = new THREE.MeshBasicMaterial({
    color: '#aaddff',
    transparent: true,
    opacity: 0.8,
  });

  const startPour = () => {
    if (showResultModal.value) return;
    if (!isPouring.value) {
      const now = Date.now();
      isPouring.value = true;

      if (!hasStarted.value) {
        hasStarted.value = true;
        startTime.value = now;
        lastTime = now;
        animateTimer();
      }

      if (now - lastPourStopTime.value > 500) {
        pours.value++;
      }

      startBloomIfNeeded(bloomState);
    }
  };

  const stopPour = () => {
    if (isPouring.value) {
      isPouring.value = false;
      lastPourStopTime.value = Date.now();
    }
  };

  const animateTimer = () => {
    if (!hasStarted.value || showResultModal.value) return;
    const now = Date.now();
    brewTimeSec.value = (now - startTime.value) / 1000;
    requestAnimationFrame(animateTimer);
  };

  const renderResultChart = () => {
    if (!showResultModal.value) return;
    nextTick(() => {
      const ctx = document.getElementById('resultRadarChart') as HTMLCanvasElement;
      if (ctx) {
        if (resultRadarInstance) resultRadarInstance.destroy();
        resultRadarInstance = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['甜感', '酸度', '澄澈度', '醇厚度', '餘韻'],
            datasets: [
              {
                label: 'Flavor Profile',
                data: flavorScores.value,
                backgroundColor: 'rgba(139, 69, 19, 0.2)',
                borderColor: '#8B4513',
                pointBackgroundColor: '#8B4513',
              },
            ],
          },
          options: {
            scales: {
              r: {
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: { stepSize: 1, backdropColor: 'transparent' },
                angleLines: { display: true },
              },
            },
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
          },
        });
      }
    });
  };

  const finishBrewing = () => {
    isPouring.value = false;
    showResultModal.value = true;
    generateBrewReport();
    nextTick(() => {
      renderResultChart();
    });
  };

  const resetSimulation = () => {
    showResultModal.value = false;
    isPouring.value = false;
    hasStarted.value = false;
    brewTimeSec.value = 0;
    totalWater.value = 0;
    accumulatedCoffee.value = 0;
    pours.value = 0;
    startTime.value = 0;
    lastPourStopTime.value = 0;

    Object.assign(bloomState, createBloomState());

    // Reset AI
    aiAdvice.action = '';
    aiAdvice.reason = '';
    lastAiCallTime = 0;
    sessionLog.value = [];
    aiReport.done = false;
    aiReport.loading = false;
    aiReport.summary = '';
    aiReport.top_issues = [];
    aiReport.next_attempt_plan = [];
    aiReport.taste_prediction = '';

    distributionScore.value = 1.0;

    for (let i = 0; i < wetGrid.length; i++) wetGrid[i] = 0;

    if (liquidInServerMesh) {
      const rFill = 0.01;
      const rHeight = 1.2 * rFill;
      const rTop = THREE.MathUtils.lerp(1.15, 0.68, rFill);
      liquidInServerMesh.geometry.dispose();
      liquidInServerMesh.geometry = new THREE.CylinderGeometry(rTop, 1.15, rHeight, 32);
      liquidInServerMesh.position.y = 0.05 + rHeight / 2;
    }

    if (coffeeBedMesh) coffeeBedMesh.scale.setScalar(1);

    if (wetContext && wetTexture) {
      wetContext.fillStyle = '#3b2f2f';
      wetContext.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 3000; i++) {
        wetContext.fillStyle = Math.random() > 0.5 ? '#2f2525' : '#4a3a3a';
        wetContext.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
      }
      wetTexture.needsUpdate = true;
    }

    if (lineChartInstance) {
      lineChartInstance.data.labels = [];
      lineChartInstance.data.datasets[0].data = [];
      lineChartInstance.update();
    }
  };

  // 保存沖煮紀錄到後端（移除截圖下載功能）
  const downloadResult = async () => {
    isSnapshotting.value = true;

    // 保存沖煮記錄到後端
    if (authStore.isLoggedIn && authStore.user) {
      try {
        // 組裝風味雷達數據
        const flavorRadarData: FlavorRadar = {
          sweetness: flavorScores.value[0],
          acidity: flavorScores.value[1],
          clarity: flavorScores.value[2],
          body: flavorScores.value[3],
          aftertaste: flavorScores.value[4],
        };

        // 組裝 AI 反饋數據
        const aiFeedbackData: AIFeedback | null = aiReport.done
          ? {
              summary: aiReport.summary,
              taste_prediction: aiReport.taste_prediction,
              top_issues: aiReport.top_issues,
              next_attempt_plan: aiReport.next_attempt_plan,
            }
          : null;

        // 發送到後端
        await brewRecordService.saveBrewLog({
          title: `沖煮記錄 ${new Date().toLocaleDateString('zh-TW')}`,
          bean_roast: roastLabel.value,
          grind_level: grindLabel.value,
          dose_weight: coffeeDose,
          total_water: Math.round(totalWater.value),
          pour_count: pours.value,
          brew_time: formattedTime.value,
          timeline_events: sessionLog.value,
          extraction_yield: currentExtractionIndex.value,
          flavor_radar: flavorRadarData,
          ai_feedback: aiFeedbackData,
          is_public: false,
          user: authStore.user.documentId || authStore.user.id,
        });

        alert('沖煮記錄已保存！');
      } catch (err) {
        console.error('保存沖煮記錄失敗:', err);
        alert('保存沖煮記錄失敗，請查看 Console');
      }
    } else {
      alert('請先登入以保存沖煮紀錄');
    }

    isSnapshotting.value = false;
  };

  const initThree = () => {
    if (!canvasContainer.value) return;

    scene = new THREE.Scene();
    const bgCol = 0xf0e4d7;
    scene.background = new THREE.Color(bgCol);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 4, 8);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9; // 降低曝光讓場景更暗

    canvasContainer.value.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 0.5, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lighting - 調暗以提升可讀性
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffeebb, 0.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    const mainGroup = new THREE.Group();
    mainGroup.position.set(0, -1.5, 0);
    scene.add(mainGroup);

    // --- 1. Coffee Stand ---
    const standGroup = new THREE.Group();
    mainGroup.add(standGroup);

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.3, 2.5), woodMaterial);
    base.position.set(0, 0.15, 0);
    base.receiveShadow = true;
    standGroup.add(base);

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4, 32), brassMaterial);
    rod.position.set(-1.2, 2, 0);
    rod.castShadow = true;
    standGroup.add(rod);

    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.2, 32), leatherMaterial);
    grip.position.set(-1.2, 1.0, 0);
    standGroup.add(grip);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 32), brassMaterial);
    cap.position.set(-1.2, 4.02, 0);
    standGroup.add(cap);

    const armGroup = new THREE.Group();
    armGroup.position.set(-1.2, 3.2, 0);
    standGroup.add(armGroup);

    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.6, 32), brassMaterial);
    armGroup.add(sleeve);

    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16), brassMaterial);
    knob.rotation.set(Math.PI / 2, Math.PI / 4, 0);
    knob.position.set(-0.1, 0, 0.1);
    armGroup.add(knob);

    const mainArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 32), brassMaterial);
    mainArm.rotation.set(0, 0, Math.PI / 2);
    mainArm.position.set(0.9, 0.2, 0);
    armGroup.add(mainArm);

    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 32), brassMaterial);
    strut.rotation.set(0, 0, -Math.PI / 6);
    strut.position.set(0.4, -0.05, 0);
    armGroup.add(strut);

    const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 16), brassMaterial);
    joint.rotation.set(Math.PI / 2, 0, 0);
    joint.position.set(0.8, 0.2, 0);
    armGroup.add(joint);

    const ringGroup = new THREE.Group();
    ringGroup.position.set(0.5, 3.4, 0);
    mainGroup.add(ringGroup);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.03, 16, 64), brassMaterial);
    ring.rotation.set(Math.PI / 2, 0, 0);
    ringGroup.add(ring);

    const connector = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.2, 16),
      brassMaterial
    );
    connector.rotation.set(0, 0, Math.PI / 2);
    connector.position.set(-0.6, 0, 0);
    ringGroup.add(connector);

    // --- 2. Dripper ---
    const dripperGroup = new THREE.Group();
    dripperGroup.position.set(0.5, 2.8, 0);
    mainGroup.add(dripperGroup);

    const shell = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 0.15, 1.6, 20, 1, true),
      ceramicMaterial
    );
    shell.castShadow = true;
    dripperGroup.add(shell);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.04, 8, 20), ceramicMaterial);
    rim.rotation.set(Math.PI / 2, 0, 0);
    rim.position.set(0, 0.8, 0);
    dripperGroup.add(rim);

    const filter = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 0.1, 1.55, 32, 1, true),
      paperMaterial
    );
    filter.position.set(0, 0.05, 0);
    dripperGroup.add(filter);

    // Coffee Grounds
    const groundsGroup = new THREE.Group();
    groundsGroup.position.set(0, -0.2, 0);
    dripperGroup.add(groundsGroup);

    // Wet texture for top surface
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    wetContext = canvas.getContext('2d');
    wetContext.fillStyle = '#3b2f2f';
    wetContext.fillRect(0, 0, 256, 256);
    wetTexture = new THREE.CanvasTexture(canvas);

    const wetGroundsMat = new THREE.MeshStandardMaterial({
      color: '#3b2f2f',
      roughness: 0.9,
      map: wetTexture,
    });

    const groundsCone = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.6, 32), groundCoffeeMaterial);
    groundsCone.rotation.set(Math.PI, 0, 0);
    groundsGroup.add(groundsCone);

    coffeeBedMesh = new THREE.Mesh(new THREE.CircleGeometry(0.7, 32), wetGroundsMat);
    coffeeBedMesh.rotation.set(-Math.PI / 2, 0, 0);
    coffeeBedMesh.position.set(0, 0.3, 0);
    groundsGroup.add(coffeeBedMesh);

    // --- 3. Carafe ---
    const carafeGroup = new THREE.Group();
    carafeGroup.position.set(0.5, 0.1, 0);
    mainGroup.add(carafeGroup);

    const cBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 1.2, 1.2, 32, 1, true),
      glassMaterial
    );
    cBody.position.set(0, 0.6, 0);
    cBody.castShadow = true;
    carafeGroup.add(cBody);

    const cBottom = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32), glassMaterial);
    carafeGroup.add(cBottom);

    const cNeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.7, 0.3, 32, 1, true),
      glassMaterial
    );
    cNeck.position.set(0, 1.35, 0);
    carafeGroup.add(cNeck);

    const cSpout = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.05, 0.2, 16, 1, true, 0, Math.PI),
      glassMaterial
    );
    cSpout.rotation.set(0, 0, -Math.PI / 4);
    cSpout.position.set(0.7, 1.5, 0);
    carafeGroup.add(cSpout);

    const cHandle = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.06, 16, 32, 4), glassMaterial);
    cHandle.rotation.set(0, 0, Math.PI / 1.2);
    cHandle.position.set(-0.8, 0.8, 0);
    carafeGroup.add(cHandle);

    // Liquid in Carafe - Initial State
    const initFill = 0.01;
    const initHeight = 1.2 * initFill;
    const initTopR = THREE.MathUtils.lerp(1.15, 0.68, initFill);
    liquidInServerMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(initTopR, 1.15, initHeight, 32),
      coffeeLiquidMaterial
    );
    liquidInServerMesh.position.set(0, 0.05 + initHeight / 2, 0);
    carafeGroup.add(liquidInServerMesh);

    // Markings
    const markingsGroup = new THREE.Group();
    markingsGroup.position.set(0, 0.6, 0.9);
    carafeGroup.add(markingsGroup);
    const mBack = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 0.8),
      new THREE.MeshBasicMaterial({
        color: 'white',
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide,
      })
    );
    markingsGroup.add(mBack);
    [0.1, 0.3, 0.5].forEach((y) => {
      const mark = new THREE.Mesh(
        new THREE.PlaneGeometry(0.2, 0.015),
        new THREE.MeshBasicMaterial({ color: 'white', opacity: 0.9 })
      );
      mark.position.set(0, y - 0.3, 0.01);
      markingsGroup.add(mark);
    });

    // --- 4. Kettle ---
    kettleGroup = new THREE.Group();
    kettleGroup.position.copy(kettleInitialPos);
    kettleGroup.rotation.set(0, Math.PI, 0);
    mainGroup.add(kettleGroup);

    const kBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 1.4, 32), kettleBodyMat);
    kBody.position.set(0, -0.2, 0);
    kBody.castShadow = true;
    kettleGroup.add(kBody);

    const kTop = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.1, 32), kettleBodyMat);
    kTop.position.set(0, 0.5, 0);
    kettleGroup.add(kTop);

    const kLid = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.05, 32), kettleBodyMat);
    kLid.position.set(0, 0.55, 0);
    kettleGroup.add(kLid);

    const knob2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.05, 0.15, 16), kettleBodyMat);
    knob2.position.set(0, 0.65, 0);
    kettleGroup.add(knob2);

    // Thermometer detail
    const thermGroup = new THREE.Group();
    thermGroup.rotation.set(0, 0, 0.1);
    thermGroup.position.set(0.25, 0.6, 0);
    kettleGroup.add(thermGroup);
    const tStem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4), silverMat);
    thermGroup.add(tStem);
    const tDial = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32), silverMat);
    tDial.rotation.set(Math.PI / 2, 0, 0);
    tDial.rotation.set(0, Math.PI / 2, Math.PI / 4);
    tDial.position.set(0, 0.2, 0);
    thermGroup.add(tDial);
    const tFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 32),
      new THREE.MeshBasicMaterial({ color: 'white' })
    );
    tFace.rotation.set(0, Math.PI / 2, Math.PI / 4);
    tFace.position.set(0, 0.2, 0.026);
    thermGroup.add(tFace);

    // Handle (Curve)
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 0.4, 0),
      new THREE.Vector3(-1.2, 0.4, 0),
      new THREE.Vector3(-1.2, -0.6, 0),
      new THREE.Vector3(-0.7, -0.6, 0),
    ]);
    const kHandle = new THREE.Mesh(
      new THREE.TubeGeometry(handleCurve, 32, 0.06, 8, false),
      kettleBodyMat
    );
    kHandle.scale.set(1, 1, 0.3);
    kettleGroup.add(kHandle);

    // Spout (Curve)
    const spoutCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0.6, -0.6, 0),
        new THREE.Vector3(1.1, -0.4, 0),
        new THREE.Vector3(1.4, 0.2, 0),
        new THREE.Vector3(1.5, 0.3, 0),
        new THREE.Vector3(1.7, 0.35, 0),
      ],
      false,
      'catmullrom',
      0.1
    );
    const kSpout = new THREE.Mesh(
      new THREE.TubeGeometry(spoutCurve, 64, 0.05, 16, false),
      kettleBodyMat
    );
    kSpout.castShadow = true;
    kettleGroup.add(kSpout);

    spoutTip = new THREE.Group();
    spoutTip.position.set(1.6, 0.33, 0);
    kettleGroup.add(spoutTip);

    // --- Particles ---
    dropsMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.035, 8, 8),
      waterDropMat,
      MAX_DROPS
    );
    dropsMesh.frustumCulled = false;
    mainGroup.add(dropsMesh);

    // Steam
    const steamGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const steamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
    steamMesh = new THREE.InstancedMesh(steamGeo, steamMat, steamCount);
    mainGroup.add(steamMesh);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: '#f0e4d7', roughness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    mainGroup.add(floor);

    window.addEventListener('resize', onWindowResize);
    animate();
  };

  const onWindowResize = () => {
    checkMobile();
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const updatePhysics = () => {
    if (showResultModal.value) return;

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // --- Time-based Logic ---
    deltaSecRef.value = delta;
    const waterDelta = isPouring.value ? pourRateMlPerSec * delta : 0;
    waterDeltaMlRef.value = waterDelta;
    flowRateMlPerSecRef.value = isPouring.value ? pourRateMlPerSec : 0;

    // Apply Water Logic
    if (isPouring.value && waterDelta > 0) {
      totalWater.value += waterDelta;
      updateBloomWetting(bloomState, waterDelta, configObject.value);
      // AI: Check advice periodically while pouring
      if (hasStarted.value) fetchAiAdvice('update');
    }

    // Apply Degassing Logic
    if (hasStarted.value && bloomState.phase === 'degassing') {
      updateBloomDegassing(bloomState, delta, configObject.value);
      fetchAiAdvice('update');
    }

    // Session Logging (1Hz)
    if (hasStarted.value) {
      const now = Date.now();
      if (now - lastLogTime > 1000) {
        sessionLog.value.push({
          t: Math.round(brewTimeSec.value),
          w: Math.round(totalWater.value),
          p: isPouring.value ? 1 : 0,
          ph: bloomState.phase,
        });
        lastLogTime = now;
      }
    }

    // Trigger AI immediately on phase change logic
    // Note: Using watchers on computed bloomPhase is cleaner, but we are inside animation loop
    // --- END Logic ---

    // 1. Kettle Animation
    kettleGroup.position.y = kettleInitialPos.y + Math.sin(elapsed) * 0.05;

    const targetRot = isPouring.value ? -Math.PI / 6 : 0;
    kettleGroup.rotation.z = THREE.MathUtils.lerp(kettleGroup.rotation.z, targetRot, delta * 8);

    // 2. Water Drops Physics
    if (isPouring.value) {
      controls.autoRotate = false;

      if (elapsed - lastDropEmitTime > 0.015) {
        const drop = dropsData.find((d) => !d.active);
        if (drop) {
          drop.active = true;
          drop.velocity = 0;
          const tipWorldPos = new THREE.Vector3();
          spoutTip.getWorldPosition(tipWorldPos);
          drop.position.copy(tipWorldPos).sub(new THREE.Vector3(0, -1.5, 0));
          drop.position.x += (Math.random() - 0.5) * 0.02;
          drop.position.z += (Math.random() - 0.5) * 0.02;
          lastDropEmitTime = elapsed;
        }
      }
    } else {
      if (!hasStarted.value) controls.autoRotate = true;
    }

    const dripperThresholdY = 2.8;
    let hittingDripper = false;

    dropsData.forEach((drop, i) => {
      if (drop.active) {
        drop.velocity += 9.8 * delta;
        drop.position.y -= drop.velocity * delta;

        if (drop.position.y < dripperThresholdY) {
          const dx = drop.position.x - 0.5;
          const dz = drop.position.z - 0;
          const dist = Math.sqrt(dx * dx + dz * dz);

          if (dist < 1.0 && drop.position.y > 2.0) {
            hittingDripper = true;

            if (wetContext && wetTexture) {
              const uvX = dx / 1.4 + 0.5;
              const uvY = dz / 1.4 + 0.5;
              if (uvX >= 0 && uvX <= 1 && uvY >= 0 && uvY <= 1) {
                wetContext.beginPath();
                wetContext.arc(uvX * 256, (1 - uvY) * 256, 15, 0, 2 * Math.PI);
                wetContext.fillStyle = 'rgba(42, 24, 16, 0.15)';
                wetContext.fill();
                wetTexture.needsUpdate = true;

                const gx = Math.floor(clamp(uvX * 3, 0, 2));
                const gy = Math.floor(clamp(uvY * 3, 0, 2));
                const gIdx = gy * 3 + gx;
                wetGrid[gIdx]++;
              }
            }
          }

          if ((dist < 0.8 && drop.position.y < 2.8) || drop.position.y < -2) {
            drop.active = false;
            drop.position.set(0, -100, 0);
          }
        }

        dummy.position.copy(drop.position);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        dropsMesh.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -100, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        dropsMesh.setMatrixAt(i, dummy.matrix);
      }
    });
    dropsMesh.instanceMatrix.needsUpdate = true;

    if (hittingDripper) {
      const sum = wetGrid.reduce((a, b) => a + b, 0);
      if (sum > 0) {
        const mean = sum / 9;
        const variance = wetGrid.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / 9;
        const sd = Math.sqrt(variance);
        const cv = sd / (mean + 0.001);
        distributionScore.value = clamp(1 - cv / 1.5, 0, 1);
      }
    }

    // 3. Drainage & Liquid Level
    const waterInFilter = Math.max(0, totalWater.value - accumulatedCoffee.value);

    // CHANGED: treat drain rate as ml/s and multiply by delta
    const baseDrainRateMlPerSec = 1.5;
    const grindFactor = 1 + grindLevel.value * 0.5;
    const currentDrainRateMlPerSec = Math.max(0.2, baseDrainRateMlPerSec * grindFactor);

    const drainAmount = Math.min(waterInFilter, currentDrainRateMlPerSec * delta);
    if (drainAmount > 0) accumulatedCoffee.value += drainAmount;

    const MAX_HEIGHT = 1.2;
    const RADIUS_BOTTOM = 1.15;
    const RADIUS_TOP_FULL = 0.68;

    const rawFill = accumulatedCoffee.value / 400;
    const safeFill = Math.max(0.01, Math.min(rawFill, 1));

    const currentHeight = MAX_HEIGHT * safeFill;
    const currentTopRadius = THREE.MathUtils.lerp(RADIUS_BOTTOM, RADIUS_TOP_FULL, safeFill);

    if (liquidInServerMesh) {
      liquidInServerMesh.geometry.dispose();
      liquidInServerMesh.geometry = new THREE.CylinderGeometry(
        currentTopRadius,
        RADIUS_BOTTOM,
        currentHeight,
        32
      );
      liquidInServerMesh.position.y = 0.05 + currentHeight / 2;
    }

    // 4. Steam
    steamData.forEach((p, i) => {
      p.y += p.speed;
      if (p.y > 2.5) p.y = 0;
      const scale = Math.sin((p.y / 2.5) * Math.PI) * 0.5;
      dummy.position.set(0.5 + p.x, 2.8 + p.y, p.z);
      dummy.scale.setScalar(scale * 0.3);
      dummy.updateMatrix();
      steamMesh.setMatrixAt(i, dummy.matrix);
    });
    steamMesh.instanceMatrix.needsUpdate = true;
    steamMesh.visible = totalWater.value > 10;
  };

  function animate() {
    animationId = requestAnimationFrame(animate);
    if (controls) controls.update();
    updatePhysics();
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  const initCharts = () => {
    Chart.defaults.color = '#5d4037';
    Chart.defaults.borderColor = 'rgba(62, 39, 35, 0.1)';
    Chart.defaults.font.family = "'LXGW WenKai TC', serif";

    const radarCanvas = document.getElementById('radarChart') as HTMLCanvasElement;
    if (radarCanvas) {
      radarChartInstance = new Chart(radarCanvas, {
        type: 'radar',
        data: {
          labels: [
            ['甜感', '(Sweetness)'],
            ['酸度', '(Acidity)'],
            ['澄澈度', '(Clarity)'],
            ['醇厚度', '(Body)'],
            ['餘韻', '(Aftertaste)'],
          ],
          datasets: [
            {
              label: '風味輪廓 (Flavor Profile)',
              data: [1, 1, 1, 1, 1],
              backgroundColor: 'rgba(212, 163, 115, 0.5)',
              borderColor: '#8d6e63',
              pointBackgroundColor: '#fff',
              pointBorderColor: '#5d4037',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: 10 },
          scales: {
            r: {
              min: 0,
              max: 5,
              angleLines: { color: 'rgba(62, 39, 35, 0.1)' },
              grid: { color: 'rgba(62, 39, 35, 0.1)' },
              pointLabels: {
                color: '#5d4037',
                font: { size: 10, weight: 'bold', family: "'LXGW WenKai TC', serif" },
              },
              ticks: { display: false, backdropColor: 'transparent' },
            },
          },
          plugins: { legend: { display: false } },
        },
      });
    }

    const lineCanvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (lineCanvas) {
      lineChartInstance = new Chart(lineCanvas, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: '總水量 (Total Water)',
              data: [],
              borderColor: '#1e88e5',
              backgroundColor: 'rgba(30, 136, 229, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: { mode: 'index', intersect: false },
          plugins: { legend: { display: false } },
          scales: {
            x: {
              title: { display: true, text: '時間 (Time)', color: '#5d4037', padding: { top: 10 } },
              grid: { display: false },
              ticks: { color: '#5d4037' },
            },
            y: {
              position: 'right',
              grid: { color: 'rgba(62, 39, 35, 0.05)' },
              ticks: { color: '#5d4037' },
              suggestedMax: 300,
            },
          },
        },
      });
    }
  };

  const updateCharts = () => {
    if (!lineChartInstance || !radarChartInstance || showResultModal.value) return;

    radarChartInstance.data.datasets[0].data = flavorScores.value;
    radarChartInstance.update('none');

    if (hasStarted.value) {
      const currentT = Math.floor(brewTimeSec.value);
      const lastLabel = lineChartInstance.data.labels[lineChartInstance.data.labels.length - 1];
      if (currentT !== lastLabel) {
        lineChartInstance.data.labels.push(currentT);
        lineChartInstance.data.datasets[0].data.push(totalWater.value);
        lineChartInstance.update('none');
      }
    }
  };

  onMounted(() => {
    // Debug API Key check removed as it is handled by backend

    checkMobile();
    window.addEventListener('resize', checkMobile);
    initThree();
    initCharts();
    setInterval(updateCharts, 500);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('r')) {
      roastLevel.value = parseFloat(urlParams.get('r')!);
      grindLevel.value = parseFloat(urlParams.get('g')!);
    }
    document.body.classList.add('refine-simulator-body-lock');
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    document.body.classList.remove('refine-simulator-body-lock');
  });
</script>

<template>
  <div
    class="relative w-full h-screen text-[#3e2723] select-none"
    style="font-family: 'LXGW WenKai TC', serif"
  >
    <!-- 3D Container -->
    <div ref="canvasContainer" class="absolute inset-0 z-0 cursor-move"></div>

    <!-- UI Overlay -->
    <div class="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-8">
      <!-- Mobile Side Toggle Buttons (All on Left) -->
      <!-- 1. Settings (Top) -->
      <button
        v-show="!showMobileSettings && isMobile"
        @click="showMobileSettings = true"
        class="fixed left-0 top-24 z-40 md:hidden h-12 pl-2 pr-3 bg-white/80 backdrop-blur-sm rounded-r-full shadow-lg border border-l-0 border-[#3e2723]/20 flex items-center gap-1 transition-transform active:scale-95 text-[#3e2723] pointer-events-auto"
      >
        <span class="text-lg animate-spin-slow">⚙️</span>
        <span class="text-[10px] font-bold vertical-rl">設定</span>
      </button>

      <!-- 2. Stats (Bottom) -->
      <button
        v-show="!showMobileStats && isMobile"
        @click="showMobileStats = true"
        class="fixed left-0 top-40 z-40 md:hidden h-12 pl-2 pr-3 bg-white/80 backdrop-blur-sm rounded-r-full shadow-lg border border-l-0 border-[#3e2723]/20 flex items-center gap-1 transition-transform active:scale-95 text-[#3e2723] pointer-events-auto"
      >
        <span class="text-lg">📊</span>
        <span class="text-[10px] font-bold vertical-rl">分析</span>
      </button>

      <!-- Top Controls (Reset) -->
      <!-- Top Controls (Reset & Mobile Finish) -->
      <div
        class="absolute top-4 right-4 md:top-8 md:right-8 pointer-events-auto z-50 flex flex-col items-end gap-2"
      >
        <button
          v-if="!isSnapshotting"
          @click="resetSimulation"
          class="glass px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-[#3e2723]/5 transition-colors text-red-600 border-red-600/30"
        >
          重置 (Reset)
        </button>

        <!-- Mobile Finish Button (Updated Position) -->
        <button
          v-if="hasStarted && !showResultModal && !isSnapshotting && isMobile"
          @click="finishBrewing"
          class="glass px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-300 text-emerald-700 border-emerald-600/30 flex items-center gap-1 shadow-lg animate-pulse"
        >
          <span class="text-sm">✓</span>
          完成
        </button>
      </div>

      <!-- Header / Timer / Finish Button -->
      <div
        class="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-40 w-full max-w-md pointer-events-none"
      >
        <div class="flex flex-col items-center drop-shadow-md">
          <h1
            class="text-xs tracking-[0.3em] uppercase mb-2 font-semibold text-white drop-shadow-[0_1px_2px_rgba(62,39,35,0.8)]"
          >
            手沖模擬器 (Brew Simulator)
          </h1>
          <div
            class="text-5xl font-light tracking-tighter tabular-nums font-mono text-white drop-shadow-[0_2px_4px_rgba(62,39,35,1.0)]"
          >
            {{ formattedTime }}
          </div>
        </div>

        <!-- Start Hint -->
        <div
          v-if="!hasStarted && !showResultModal"
          class="mt-2 text-yellow-700 text-sm animate-pulse flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm"
        >
          <span>按住右側按鈕注水 (Hold Button to Pour)</span>
        </div>

        <!-- Finish Button -->
        <!-- Finish Button (Desktop Only) -->
        <div
          v-if="hasStarted && !showResultModal && !isSnapshotting && !isMobile"
          class="pointer-events-auto"
        >
          <button
            @click="finishBrewing"
            class="glass px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-300 text-emerald-700 border-emerald-600/30 flex items-center gap-2 shadow-lg"
          >
            <span class="text-lg">✓</span>
            完成沖煮 (Finish)
          </button>
        </div>
      </div>

      <!-- Result Modal -->
      <div
        v-if="showResultModal"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-[#3e2723]/20 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 overflow-y-auto py-8"
      >
        <div
          ref="resultCardRef"
          class="glass-strong p-8 rounded-3xl w-full max-w-lg flex flex-col gap-6 transform scale-100 animate-[fadeIn_0.3s_ease-out] mx-4 my-auto relative"
        >
          <div class="flex justify-between items-center border-b border-[#3e2723]/10 pb-4">
            <h2 class="text-xl font-bold text-emerald-700 tracking-wider">
              沖煮完成 (Brewing Complete)
            </h2>
            <button
              @click="showResultModal = false"
              class="text-gray-500 hover:text-[#3e2723] transition-colors"
            >
              ✕
            </button>
          </div>

          <!-- Result Content -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Stats List -->
            <div class="flex flex-col justify-center gap-4 text-[#3e2723]">
              <div>
                <span class="text-xs text-[#8d6e63] uppercase tracking-widest">總時間 (Time)</span>
                <div class="text-2xl font-mono">{{ formattedTime }}</div>
              </div>
              <div>
                <span class="text-xs text-[#8d6e63] uppercase tracking-widest">粉水比 (Ratio)</span>
                <div class="text-2xl font-mono">1:{{ currentRatio }}</div>
              </div>
              <div>
                <span class="text-xs text-[#8d6e63] uppercase tracking-widest">
                  萃取率 (Extraction)
                </span>
                <div
                  class="text-xl font-mono"
                  :class="Number(currentExtractionIndex) > 0 ? 'text-red-600' : 'text-blue-700'"
                >
                  {{ currentExtractionIndex }}
                </div>
              </div>
              <div>
                <span class="text-xs text-[#8d6e63] uppercase tracking-widest">
                  均勻度 (Uniformity)
                </span>
                <div class="text-xl font-mono text-purple-700">{{ currentUniformityIndex }}</div>
              </div>
            </div>

            <!-- Radar Chart Clone Container -->
            <div
              class="relative w-full aspect-square bg-[#3e2723]/5 rounded-xl p-2 flex items-center justify-center"
            >
              <canvas id="resultRadarChart"></canvas>
            </div>
          </div>

          <!-- AI Report Section -->
          <div
            class="mt-2 p-4 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-md flex flex-col gap-3 min-h-[140px]"
          >
            <h3 class="text-sm font-bold text-indigo-700 flex items-center gap-2">
              <div class="w-5 h-5"><CoffeeFairyIcon /></div>
              咖啡小精靈的善意提醒
            </h3>

            <div
              v-if="aiReport.loading"
              class="flex flex-col items-center justify-center py-6 gap-3 text-[#8d6e63]"
            >
              <div class="w-8 h-8 animate-bounce">
                <CoffeeFairyIcon />
              </div>
              <span class="text-xs font-bold animate-pulse text-indigo-800">
                咖啡小精靈正在咕嚕咕嚕品嘗您傑作...
              </span>
            </div>

            <div
              v-else-if="aiReport.done"
              class="flex flex-col gap-3 animate-[fadeIn_0.5s_ease-out]"
            >
              <div class="text-base font-bold text-[#3e2723] leading-snug">
                "{{ aiReport.summary }}"
              </div>

              <div class="text-xs text-orange-800 font-medium italic">
                預測風味: {{ aiReport.taste_prediction }}
              </div>

              <div v-if="aiReport.top_issues.length > 0">
                <span class="text-[10px] uppercase font-bold text-red-700/70 tracking-wider">
                  主要問題 (Issues)
                </span>
                <ul class="list-disc pl-4 mt-1 space-y-1">
                  <li
                    v-for="issue in aiReport.top_issues"
                    :key="issue"
                    class="text-xs text-red-900 leading-relaxed"
                  >
                    {{ issue }}
                  </li>
                </ul>
              </div>

              <div v-if="aiReport.next_attempt_plan.length > 0">
                <div class="flex justify-between items-center mt-2">
                  <span class="text-[10px] uppercase font-bold text-blue-700/70 tracking-wider">
                    下次建議 (Next Plan)
                  </span>
                  <button
                    @click="copyRecipe"
                    class="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                  >
                    📋 複製 (Copy)
                  </button>
                </div>
                <ol class="list-decimal pl-4 mt-1 space-y-1">
                  <li
                    v-for="step in aiReport.next_attempt_plan"
                    :key="step"
                    class="text-xs text-blue-900 leading-relaxed"
                  >
                    {{ step }}
                  </li>
                </ol>
              </div>
            </div>

            <div v-else class="text-center py-4 text-xs text-[#8d6e63]">等待報告生成...</div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-3 mt-2">
            <button
              @click="downloadResult"
              class="w-full bg-[#3e2723] text-white py-3 rounded-xl font-bold hover:bg-[#5d4037] transition-colors flex justify-center items-center gap-2"
            >
              <span v-if="isSnapshotting">� 處理中...</span>
              <span v-else>� 保存沖煮紀錄</span>
            </button>
            <button
              @click="resetSimulation"
              class="w-full py-2 text-sm text-[#8d6e63] hover:text-red-600 transition-colors"
            >
              重新開始 (Reset)
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <!-- Use flex column on mobile (though absolute positioning takes over), flex row on desktop -->
      <div
        class="flex flex-1 w-full md:justify-between items-start mt-20 md:mt-0 pt-10 px-0 md:px-4 transition-opacity duration-500 pointer-events-none"
        :class="showResultModal && !isSnapshotting ? 'opacity-0' : 'opacity-100'"
      >
        <!-- LEFT COLUMN CONTAINER (Desktop structure) -->
        <!-- On mobile, children break out via fixed positioning -->
        <div class="flex flex-col gap-3 pointer-events-auto md:w-56">
          <!-- 1. Parameters Panel -->
          <!-- Mobile: Fixed modal. Desktop: Relative block. -->
          <!-- 1. Parameters Panel -->
          <!-- Mobile: Left Drawer. Desktop: Relative block. -->
          <!-- 1. Parameters Panel -->
          <!-- Mobile: Left Bottom Drawer. Desktop: Relative block. -->
          <!-- 1. Parameters Panel -->
          <!-- Mobile: Top-Left Floating Box. Desktop: Relative block. -->
          <div
            class="p-4 flex flex-col gap-3 transition-all duration-500 ease-in-out"
            :class="
              isMobile
                ? 'fixed top-24 left-2 w-56 max-h-[35vh] bg-[#fdfbf7]/95 backdrop-blur-xl shadow-2xl z-[60] border border-[#3e2723]/10 flex flex-col overflow-hidden rounded-2xl' +
                  (showMobileSettings
                    ? ' translate-x-0 opacity-100 scale-100'
                    : ' -translate-x-10 opacity-0 scale-95 pointer-events-none')
                : 'relative w-full glass rounded-2xl opacity-100 scale-100'
            "
          >
            <h2
              class="text-xs font-bold uppercase tracking-wider text-[#8d6e63] border-b border-[#3e2723]/10 pb-2 flex justify-between"
            >
              <span>參數設定 (Parameters)</span>
              <span
                v-if="isMobile"
                @click="showMobileSettings = false"
                class="text-lg leading-none cursor-pointer"
              >
                ×
              </span>
            </h2>

            <!-- Content Wrapper for Scroll -->
            <div :class="isMobile ? 'flex-1 overflow-y-auto min-h-0 pr-1' : ''">
              <!-- Roast Level -->
              <div class="flex flex-col gap-1 mb-3">
                <div class="flex justify-between text-[10px] text-[#3e2723]">
                  <span>烘焙度 (Roast)</span>
                  <span class="text-orange-600">{{ roastLabel }}</span>
                </div>
                <input type="range" min="-1" max="1" step="0.1" v-model.number="roastLevel" />
                <div class="flex justify-between text-[9px] text-[#8d6e63]">
                  <span>淺 (Light)</span>
                  <span>深 (Dark)</span>
                </div>
              </div>

              <!-- Grind Level -->
              <div class="flex flex-col gap-1 mb-3">
                <div class="flex justify-between text-[10px] text-[#3e2723]">
                  <span>研磨度 (Grind)</span>
                  <span class="text-orange-600">{{ grindLabel }}</span>
                </div>
                <input type="range" min="-1" max="1" step="0.1" v-model.number="grindLevel" />
                <div class="flex justify-between text-[9px] text-[#8d6e63]">
                  <span>細 (Fine)</span>
                  <span>粗 (Coarse)</span>
                </div>
              </div>

              <!-- Live Stats -->
              <div class="space-y-1 pt-2 border-t border-[#3e2723]/10 text-[#3e2723]">
                <div class="flex justify-between text-[10px]">
                  <span class="opacity-60">水量 (Water)</span>
                  <span class="font-mono">{{ Math.round(totalWater) }}ml</span>
                </div>
                <div class="flex justify-between text-[10px]">
                  <span class="opacity-60">注水次數 (Pours)</span>
                  <span class="font-mono">{{ pours }}</span>
                </div>
                <div class="flex justify-between text-[10px]">
                  <span class="opacity-60">粉水比 (Ratio)</span>
                  <span class="font-mono">1:{{ currentRatio }}</span>
                </div>
              </div>
            </div>

            <!-- Mobile Back Button (Sticky Bottom) -->
            <div v-if="isMobile" class="mt-auto pt-2 border-t border-[#3e2723]/10">
              <button
                @click="showMobileSettings = false"
                class="w-full flex justify-center items-center gap-2 text-[#3e2723] hover:bg-[#3e2723]/10 px-3 py-2 rounded-lg transition-colors font-bold"
              >
                <span class="text-xl">&lt;</span>
                <span class="text-xs">返回 (Back)</span>
              </button>
            </div>
          </div>

          <!-- 2. Bloom & Guide Phase Indicator -->
          <!-- Mobile: Fixed top center. Desktop: Relative flow. -->
          <div
            v-if="hasStarted"
            class="glass p-3 rounded-xl transition-all duration-300 border-l-4 shadow-lg backdrop-blur-md"
            :class="[
              {
                'border-blue-600 bg-blue-100/40': bloomPhase === 'wetting',
                'border-yellow-600 bg-yellow-100/40': bloomPhase === 'degassing',
                'border-green-600 bg-green-100/40': bloomPhase === 'ready',
                'border-gray-400': bloomPhase === 'idle',
              },
              isMobile
                ? 'fixed top-20 left-1/2 -translate-x-1/2 w-[70%] max-w-[280px] z-40 pointer-events-none transform scale-90 origin-top'
                : 'relative w-full',
            ]"
          >
            <div class="flex justify-between items-baseline mb-2">
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#8d6e63]">
                沖煮指引 (Coach)
              </span>
              <span
                class="text-xs font-bold"
                :class="{
                  'text-blue-700': bloomPhase === 'wetting',
                  'text-yellow-700': bloomPhase === 'degassing',
                  'text-green-700 status-ready': bloomPhase === 'ready',
                }"
              >
                {{ bloomPhaseDisplay }}
              </span>
            </div>

            <!-- Phase 1: Wetting -->
            <div v-if="bloomPhase === 'wetting'">
              <div class="flex justify-between text-[9px] text-blue-800 mb-1">
                <span>浸濕程度 (Wetting)</span>
                <span>{{ Math.round(bloomState.saturation01 * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  class="bg-blue-500 h-full transition-all duration-100 relative"
                  :style="{ width: bloomState.saturation01 * 100 + '%' }"
                >
                  <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <p class="text-[10px] text-blue-800 mt-2 font-bold text-center">
                💧 {{ coachInfo.message }}
              </p>
            </div>

            <!-- Phase 2: Degassing -->
            <div v-if="bloomPhase === 'degassing'">
              <div class="flex justify-between text-[9px] text-yellow-800 mb-1">
                <span>排氣進度 (Degassing)</span>
                <span>{{ Math.round(bloomState.gasRelease01 * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  class="bg-yellow-500 h-full transition-all duration-100 relative"
                  :style="{ width: bloomState.gasRelease01 * 100 + '%' }"
                >
                  <div class="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
              <div class="flex flex-col items-center mt-2">
                <p class="text-[10px] text-yellow-800 font-bold animate-pulse">
                  !!停止注水!! (Stop Pouring)
                </p>
                <p class="text-lg font-mono font-bold text-yellow-700">
                  {{ coachInfo.message }}
                </p>
              </div>
            </div>

            <!-- Phase 3: Ready -->
            <div v-if="bloomPhase === 'ready'">
              <div class="text-[10px] text-green-800 flex flex-col gap-1 items-center">
                <span class="status-ready font-bold text-green-700">悶蒸完成 (Bloom Ready)</span>
                <div class="w-full h-px bg-green-600/30 my-1"></div>
                <span class="text-[#3e2723] font-bold text-sm">{{ coachInfo.message }}</span>
                <span class="text-[10px] text-[#8d6e63]">{{ coachInfo.subMessage }}</span>
              </div>
            </div>

            <!-- AI Coach Advice Section -->
            <div
              v-if="aiAdvice.action"
              class="mt-2 pt-2 border-t border-blue-200/50 flex flex-col gap-1 animate-[fadeIn_0.5s_ease-out]"
            >
              <div class="text-[10px] font-bold text-indigo-600 flex items-center gap-1">
                <div class="w-4 h-4">
                  <CoffeeFairyIcon />
                </div>
                <span>咖啡小精靈的叮嚀</span>
              </div>
              <div class="text-sm font-bold text-[#3e2723] leading-tight">
                {{ aiAdvice.action }}
              </div>
              <div class="text-[10px] text-[#8d6e63] leading-tight opacity-90">
                {{ aiAdvice.reason }}
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN CONTAINER (Desktop structure) -->
        <!-- On mobile, children break out via fixed positioning -->
        <div class="flex flex-col gap-3 pointer-events-auto md:w-56">
          <!-- 1. Real-time Analysis / Charts Wrapper -->
          <!-- Mobile: Fixed modal. Desktop: Relative block. -->
          <!-- 1. Real-time Analysis / Charts Wrapper -->
          <!-- Mobile: Right Drawer. Desktop: Relative block. -->
          <!-- 1. Real-time Analysis / Charts Wrapper -->
          <!-- Mobile: Left Bottom Drawer (Stacked). Desktop: Relative block. -->
          <!-- 1. Real-time Analysis / Charts Wrapper -->
          <!-- Mobile: Bottom-Left Floating Box. Desktop: Relative block. -->
          <div
            class="p-3 flex flex-col gap-3 transition-all duration-500 ease-in-out"
            :class="
              isMobile
                ? 'fixed bottom-24 left-2 w-56 max-h-[35vh] bg-[#fdfbf7]/95 backdrop-blur-xl shadow-2xl z-[60] border border-[#3e2723]/10 flex flex-col overflow-hidden rounded-2xl' +
                  (showMobileStats
                    ? ' translate-x-0 opacity-100 scale-100'
                    : ' -translate-x-10 opacity-0 scale-95 pointer-events-none')
                : 'relative w-full glass rounded-xl opacity-100 scale-100'
            "
          >
            <h3
              class="text-[9px] font-bold uppercase tracking-widest text-[#8d6e63] border-b border-[#3e2723]/10 pb-1 flex justify-between"
            >
              <span>即時分析 (Analysis)</span>
              <span
                v-if="isMobile"
                @click="showMobileStats = false"
                class="text-lg leading-none cursor-pointer"
              >
                ×
              </span>
            </h3>

            <!-- Content Wrapper for Scroll -->
            <div :class="isMobile ? 'flex-1 overflow-y-auto min-h-0 pr-1' : ''">
              <!-- Extraction Bar -->
              <div class="flex flex-col gap-1 mb-3">
                <div class="flex justify-between items-baseline text-[10px]">
                  <span class="text-[#3e2723]">萃取狀態 (Extraction)</span>
                  <span
                    class="font-bold text-[9px]"
                    :class="
                      extractionVisual.valNum > 0.25
                        ? 'text-red-600'
                        : extractionVisual.valNum < -0.25
                          ? 'text-blue-600'
                          : 'text-emerald-700'
                    "
                  >
                    {{ extractionVisual.label }}
                  </span>
                </div>
                <div
                  class="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-white/40"
                >
                  <div
                    class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#3e2723]/20 z-10 transform -translate-x-1/2"
                  ></div>
                  <div
                    class="h-full transition-all duration-300 ease-out"
                    :class="extractionVisual.colorClass"
                    :style="{ width: extractionVisual.pct + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Uniformity Bar -->
              <div class="flex flex-col gap-1 mb-3">
                <div class="flex justify-between items-baseline text-[10px]">
                  <span class="text-[#3e2723]">均勻度 (Uniformity)</span>
                  <span class="font-bold text-[9px] text-[#3e2723]">
                    {{ uniformityVisual.label }}
                  </span>
                </div>
                <div
                  class="w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-white/40"
                >
                  <div
                    class="h-full transition-all duration-300 ease-out"
                    :class="uniformityVisual.colorClass"
                    :style="{ width: uniformityVisual.pct + '%' }"
                  ></div>
                </div>
              </div>

              <!-- 2. Flavor Radar (Inside Stats Panel on Mobile) -->
              <div
                class="w-full h-40 p-1 rounded-lg flex items-center justify-center relative bg-white/20 mb-3"
              >
                <canvas id="radarChart"></canvas>
              </div>

              <!-- 3. Extraction Graph (Inside Stats Panel on Mobile) -->
              <div class="w-full h-32 p-1 rounded-lg relative flex flex-col bg-white/20">
                <div class="flex justify-between items-center mb-1">
                  <h3 class="text-[9px] uppercase tracking-widest text-[#8d6e63]">總水量 / 時間</h3>
                  <span class="text-[9px] text-blue-700">Target: {{ predictedYield }}%</span>
                </div>
                <div class="relative flex-1 w-full h-full overflow-hidden">
                  <canvas id="lineChart"></canvas>
                </div>
              </div>
            </div>

            <!-- Mobile Back Button (Sticky Bottom) -->
            <div v-if="isMobile" class="mt-auto pt-2 border-t border-[#3e2723]/10">
              <button
                @click="showMobileStats = false"
                class="w-full flex justify-center items-center gap-2 text-[#3e2723] hover:bg-[#3e2723]/10 px-3 py-2 rounded-lg transition-colors font-bold"
              >
                <span class="text-xl">&lt;</span>
                <span class="text-xs">返回 (Back)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dedicated Pour Button (Independent of UI Overlay Layout) -->
    <div
      v-show="!showResultModal"
      class="absolute right-2 top-[71%] -translate-y-1/2 z-[60] pointer-events-auto flex flex-col items-center gap-2"
    >
      <button
        class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600/80 backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.5)] border-4 border-white/30 flex flex-col items-center justify-center text-white transition-all duration-200 active:scale-95 active:bg-blue-700 select-none touch-none hover:bg-blue-500/90"
        @mousedown="startPour"
        @mouseup="stopPour"
        @mouseleave="stopPour"
        @touchstart.prevent="startPour"
        @touchend.prevent="stopPour"
      >
        <span class="text-3xl filter drop-shadow-md">💧</span>
        <span class="text-xs font-bold font-mono tracking-widest mt-1">POUR</span>
      </button>
    </div>
  </div>
</template>
