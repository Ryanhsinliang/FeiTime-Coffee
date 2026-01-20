/**
 * 3D 場景管理 Composable
 * 整合所有 3D 模型和動畫邏輯
 */

import { ref, onMounted, onUnmounted, watch, type Ref, type ComputedRef } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import {
    getMaterials,
    createCoffeeStand,
    createDripperRing,
    createDripper,
    createCarafe,
    createKettle,
    createDropsSystem,
    createSteamSystem,
    createFloor,
    type DropsData,
    type SteamData
} from '@/models/Refine';

import {
    startBloomIfNeeded,
    updateBloomWetting,
    updateBloomDegassing
} from '@/utils/Refine/brewMath';

import type { BloomState, BrewConfig } from '@/types/RefineTypes';

export interface UseThreeSceneOptions {
    container: Ref<HTMLElement | null>;
    // 狀態
    isPouring: Ref<boolean>;
    totalWater: Ref<number>;
    accumulatedCoffee: Ref<number>;
    hasStarted: Ref<boolean>;
    showResultModal: Ref<boolean>;
    bloomState: BloomState;
    configObject: ComputedRef<BrewConfig>;
    // 物理參數
    deltaSecRef: Ref<number>;
    waterDeltaMlRef: Ref<number>;
    flowRateMlPerSecRef: Ref<number>;
    pourRateMlPerSec: number;
}

export function useThreeScene(options: UseThreeSceneOptions) {
    const {
        container,
        isPouring,
        totalWater,
        accumulatedCoffee,
        hasStarted,
        showResultModal,
        bloomState,
        configObject,
        deltaSecRef,
        waterDeltaMlRef,
        flowRateMlPerSecRef,
        pourRateMlPerSec
    } = options;

    // 場景變數
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;

    // 模型參考
    let kettleGroup: THREE.Group;
    let spoutTip: THREE.Object3D;
    let coffeeBedMesh: THREE.Mesh;
    let liquidMesh: THREE.Mesh;
    let dropsMesh: THREE.InstancedMesh;
    let steamMesh: THREE.InstancedMesh;
    let wetTexture: THREE.CanvasTexture;
    let wetContext: CanvasRenderingContext2D;

    // 粒子數據
    const MAX_DROPS = 60;
    const steamCount = 50;
    let dropsData: DropsData[] = [];
    let steamData: SteamData[] = [];

    // 動畫變數
    let animationId: number;
    let lastDropEmitTime = 0;
    const dummy = new THREE.Object3D();
    const clock = new THREE.Clock();
    const kettleInitialPos = new THREE.Vector3(2.7, 4.5, 0);

    /**
     * 初始化 3D 場景
     */
    const init = () => {
        if (!container.value) return;

        // 場景
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0e4d7); // ⚠️ 關鍵：背景顏色

        // 相機
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 4, 8);

        // 渲染器
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.value.appendChild(renderer.domElement);

        // 控制器
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 3;
        controls.maxDistance = 12;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(0, 0.5, 0);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // 環境
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

        // 燈光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xffeebb, 0.8);
        fillLight.position.set(-5, 5, -5);
        scene.add(fillLight);

        // 主群組
        const mainGroup = new THREE.Group();
        mainGroup.position.set(0, -1.5, 0);
        scene.add(mainGroup);

        // 取得材質
        const materials = getMaterials();

        // 建立模型
        const stand = createCoffeeStand(materials);
        mainGroup.add(stand);

        const ring = createDripperRing(materials);
        mainGroup.add(ring);

        const dripper = createDripper(materials);
        mainGroup.add(dripper.group);
        coffeeBedMesh = dripper.coffeeBedMesh;
        wetTexture = dripper.wetTexture;
        wetContext = dripper.wetContext;

        const carafe = createCarafe(materials);
        mainGroup.add(carafe.group);
        liquidMesh = carafe.liquidMesh;

        const kettle = createKettle(materials, kettleInitialPos);
        mainGroup.add(kettle.group);
        kettleGroup = kettle.group;
        spoutTip = kettle.spoutTip;

        // 粒子系統
        const drops = createDropsSystem(materials.waterDrop, MAX_DROPS);
        mainGroup.add(drops.mesh);
        dropsMesh = drops.mesh;
        dropsData = drops.data;

        const steam = createSteamSystem(steamCount);
        mainGroup.add(steam.mesh);
        steamMesh = steam.mesh;
        steamData = steam.data;

        // 地板
        const floor = createFloor();
        mainGroup.add(floor);

        // 開始動畫
        animate();

        // 監聽視窗大小
        window.addEventListener('resize', onResize);
    };

    /**
     * 視窗大小調整
     */
    const onResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    /**
     * 更新物理
     */
    const updatePhysics = () => {
        const delta = clock.getDelta();
        const now = Date.now();

        deltaSecRef.value = delta;
        waterDeltaMlRef.value = 0;
        flowRateMlPerSecRef.value = 0;

        if (isPouring.value) {
            const waterThisFrame = pourRateMlPerSec * delta;
            totalWater.value += waterThisFrame;
            waterDeltaMlRef.value = waterThisFrame;
            flowRateMlPerSecRef.value = pourRateMlPerSec;

            // 悶蒸更新
            if (bloomState.phase === 'wetting') {
                updateBloomWetting(bloomState, waterThisFrame, configObject.value);
            }

            // 手沖壺動畫
            const centerX = 0.5;
            const centerZ = 0;
            const wobble = Math.sin(now * 0.002) * 0.15;
            kettleGroup.position.x = THREE.MathUtils.lerp(kettleGroup.position.x, centerX + wobble, 0.1);
            kettleGroup.position.z = THREE.MathUtils.lerp(kettleGroup.position.z, centerZ, 0.1);
            kettleGroup.position.y = THREE.MathUtils.lerp(kettleGroup.position.y, 4.0, 0.1);
            kettleGroup.rotation.z = THREE.MathUtils.lerp(kettleGroup.rotation.z, -0.15, 0.08);

            // 發射水滴
            if (now - lastDropEmitTime > 25) {
                lastDropEmitTime = now;
                for (let i = 0; i < MAX_DROPS; i++) {
                    if (!dropsData[i].active) {
                        const worldPos = new THREE.Vector3();
                        spoutTip.getWorldPosition(worldPos);
                        worldPos.y += 1.5;
                        dropsData[i].position.copy(worldPos);
                        dropsData[i].position.x += (Math.random() - 0.5) * 0.08;
                        dropsData[i].position.z += (Math.random() - 0.5) * 0.08;
                        dropsData[i].velocity = 0;
                        dropsData[i].active = true;
                        break;
                    }
                }
            }

            // 更新潮濕紋理
            if (wetContext) {
                const cx = 128 + (Math.random() - 0.5) * 100;
                const cy = 128 + (Math.random() - 0.5) * 100;
                wetContext.fillStyle = 'rgba(50, 35, 30, 0.15)';
                wetContext.beginPath();
                wetContext.arc(cx, cy, 15 + Math.random() * 10, 0, Math.PI * 2);
                wetContext.fill();
                wetTexture.needsUpdate = true;
            }
        } else {
            // 排氣更新
            if (bloomState.phase === 'degassing') {
                updateBloomDegassing(bloomState, delta, configObject.value);
            }

            // 壺回到初始位置
            kettleGroup.position.lerp(kettleInitialPos, 0.05);
            kettleGroup.rotation.z = THREE.MathUtils.lerp(kettleGroup.rotation.z, 0, 0.05);
        }

        // 更新水滴物理
        const gravity = 9.8;
        const coffeeY = 1.3;

        for (let i = 0; i < MAX_DROPS; i++) {
            if (dropsData[i].active) {
                dropsData[i].velocity += gravity * delta * 2;
                dropsData[i].position.y -= dropsData[i].velocity * delta;

                if (dropsData[i].position.y < coffeeY) {
                    dropsData[i].active = false;
                    dropsData[i].position.set(0, -100, 0);
                }

                dummy.position.copy(dropsData[i].position);
                dummy.scale.setScalar(dropsData[i].active ? 1 : 0);
                dummy.updateMatrix();
                dropsMesh.setMatrixAt(i, dummy.matrix);
            }
        }
        dropsMesh.instanceMatrix.needsUpdate = true;

        // 更新蒸氣
        for (let i = 0; i < steamCount; i++) {
            steamData[i].y += steamData[i].speed;
            if (steamData[i].y > 2.5) {
                steamData[i].y = 0;
                steamData[i].x = (Math.random() - 0.5) * 0.5;
                steamData[i].z = (Math.random() - 0.5) * 0.5;
            }
            dummy.position.set(steamData[i].x, steamData[i].y, steamData[i].z);
            const visibilityScale = accumulatedCoffee.value > 10 ? 1 : 0.3;
            dummy.scale.setScalar(steamData[i].scale * visibilityScale);
            dummy.updateMatrix();
            steamMesh.setMatrixAt(i, dummy.matrix);
        }
        steamMesh.instanceMatrix.needsUpdate = true;

        // 更新咖啡液面
        const targetCoffeeMl = totalWater.value * 0.9;
        accumulatedCoffee.value = THREE.MathUtils.lerp(accumulatedCoffee.value, targetCoffeeMl, 0.1);

        const fillRatio = Math.min(accumulatedCoffee.value / 250, 1);
        const liquidHeight = 1.8 * fillRatio;
        const topRadius = THREE.MathUtils.lerp(1.15, 0.68, fillRatio);

        if (liquidMesh && liquidHeight > 0.01) {
            liquidMesh.geometry.dispose();
            liquidMesh.geometry = new THREE.CylinderGeometry(topRadius, 1.15, liquidHeight, 32);
            liquidMesh.position.y = 0.05 + liquidHeight / 2;
        }
    };

    /**
     * 動畫循環
     */
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        updatePhysics();
        controls.update();
        renderer.render(scene, camera);
    };

    /**
     * 重置 3D 狀態
     */
    const reset3DState = () => {
        // 重置咖啡液
        if (liquidMesh) {
            const rFill = 0.01;
            const rHeight = 1.2 * rFill;
            const rTop = THREE.MathUtils.lerp(1.15, 0.68, rFill);
            liquidMesh.geometry.dispose();
            liquidMesh.geometry = new THREE.CylinderGeometry(rTop, 1.15, rHeight, 32);
            liquidMesh.position.y = 0.05 + rHeight / 2;
        }

        // 重置咖啡粉
        if (coffeeBedMesh) coffeeBedMesh.scale.setScalar(1);

        // 重置潮濕紋理
        if (wetContext && wetTexture) {
            wetContext.fillStyle = '#3b2f2f';
            wetContext.fillRect(0, 0, 256, 256);
            for (let i = 0; i < 3000; i++) {
                wetContext.fillStyle = Math.random() > 0.5 ? '#2f2525' : '#4a3a3a';
                wetContext.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
            }
            wetTexture.needsUpdate = true;
        }
    };

    /**
     * 清理資源
     */
    const dispose = () => {
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('resize', onResize);
        renderer?.dispose();
    };

    return {
        init,
        dispose,
        reset3DState
    };
}
