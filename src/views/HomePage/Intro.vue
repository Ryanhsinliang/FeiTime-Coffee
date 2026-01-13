<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
    <!-- Firefly Canvas Background -->
    <canvas ref="canvasRef" class="absolute left-0 top-0 h-full w-full pointer-events-none" />

    <!-- Logo Container -->
    <div class="relative z-10 flex flex-col items-center justify-center logo-fade-in">
      <div class="relative flex items-center justify-center">
        <img
          alt="FeiTime Logo"
          class="h-auto w-auto max-w-md max-h-96 object-contain logo-shadow"
          src="@/views/HomePage/assets/feitime-logo.webp"
        />
        <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-24 glow-effect"></div>
      </div>

      <!-- Title Section -->
      <div class="mt-8 flex flex-col items-center space-y-3 text-center text-fade-in">
        <p class="text-white/20 text-[9px] font-normal tracking-[0.5em] uppercase">
          Artisanal Roastery
        </p>
      </div>
    </div>

    <!-- Skip Button -->
    <div class="absolute bottom-12 right-12 z-20">
      <button
        @click="goToHome"
        class="group flex items-center gap-3 px-4 py-2 bg-transparent transition-all duration-700 cursor-pointer"
      >
        <span
          class="text-[10px] font-light tracking-[0.3em] text-white/30 group-hover:text-white/70 uppercase transition-colors"
        >
          Skip
        </span>
        <span
          class="material-symbols-outlined text-white/10 group-hover:text-white/40 text-[14px] transition-all transform group-hover:translate-x-1"
        >
          arrow_forward
        </span>
      </button>
    </div>

    <!-- Radial Gradient Overlay -->
    <div class="absolute inset-0 pointer-events-none vignette z-5"></div>
  </div>
</template>

<script setup lang="ts">
  import {
    ArcRotateCamera,
    Color3,
    Color4,
    DefaultRenderingPipeline,
    DepthOfFieldEffectBlurLevel,
    Engine,
    HemisphericLight,
    NoiseProceduralTexture,
    ParticleSystem,
    Scene,
    Texture,
    Vector3,
  } from '@babylonjs/core';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const canvasRef = ref<HTMLCanvasElement>();

  let engine: Engine | null = null;
  let scene: Scene | null = null;

  onMounted(() => {
    initBabylonScene();
  });

  onUnmounted(() => {
    engine?.dispose();
    scene?.dispose();
  });

  // Navigate to home page
  const goToHome = () => {
    router.push('/home'); // 修改成你的首頁路由
  };

  function initBabylonScene() {
    if (!canvasRef.value) return;

    const canvas = canvasRef.value;
    engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0.01); // 背景透明

    // 創建相機
    const camera = new ArcRotateCamera('camera', 0, 0, 0, Vector3.Zero(), scene);
    const rect = canvas.getBoundingClientRect();
    camera.radius = Math.min(rect.width, rect.height);

    // 創建光源
    const light = new HemisphericLight('light', new Vector3(0.5, 1, 0), scene);
    light.intensity = 1;
    light.diffuse = new Color3(1, 1, 1);
    light.groundColor = new Color3(1, 1, 1);

    // 初始化渲染管線（景深效果）
    initRenderingPipeline(scene, camera, canvas);

    // 初始化粒子系統（螢火蟲）
    initParticleSystem(scene, canvas);

    // 渲染循環
    engine.runRenderLoop(() => {
      scene?.render();
    });

    // 響應視窗大小變化
    window.addEventListener('resize', () => {
      engine?.resize();
    });
  }

  function initRenderingPipeline(scene: Scene, camera: ArcRotateCamera, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const pipeline = new DefaultRenderingPipeline('defaultPipeline', true, scene, [camera]);

    const focusDistance = Math.min(rect.width, rect.height) * 1000;

    pipeline.depthOfFieldEnabled = true;
    pipeline.depthOfField.focusDistance = focusDistance;
    pipeline.depthOfField.focalLength = 800;
    pipeline.depthOfField.fStop = 0.5;
    pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Low;
  }

  function initParticleSystem(scene: Scene, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const { width, height } = rect;

    const particleSystem = new ParticleSystem('fireflies', 5000, scene);

    // 使用程式生成材質（不需要外部文件）
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 256;
    textureCanvas.height = 256;
    const ctx = textureCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    particleSystem.particleTexture = new Texture(textureCanvas.toDataURL(), scene);

    particleSystem.emitter = new Vector3(0, -height / 2, 0); // 發射器位置

    particleSystem.emitRate = 100;

    // 粒子尺寸
    particleSystem.minSize = 4;
    particleSystem.maxSize = 10;

    particleSystem.maxLifeTime = 20;
    particleSystem.minLifeTime = 10;

    // 設定粒子向上飄的速度
    particleSystem.minEmitPower = height / 15;
    particleSystem.maxEmitPower = height / 10;
    particleSystem.updateSpeed = 0.01;

    // 設定重力（向上的力，讓螢火蟲持續上升）
    particleSystem.gravity = new Vector3(0, height / 30, 0);

    // 從底部整個寬度向上發散
    particleSystem.createBoxEmitter(
      new Vector3(-0.8, 1, -0.8), // 最小方向（X和Z擴散更快）
      new Vector3(0.8, 1.5, 0.8), // 最大方向（X和Z擴散更快）
      new Vector3(-width / 2, -height / 2, -100), // 發射區域左下角
      new Vector3(width / 2, -height / 2, 100) // 發射區域右下角
    );

    // 隨機移動（加強橫向擴散）
    const noiseTexture = new NoiseProceduralTexture('noise', 256, scene);
    noiseTexture.octaves = 6;
    noiseTexture.persistence = 2;
    noiseTexture.animationSpeedFactor = 2;
    noiseTexture.brightness = 0.5;

    particleSystem.noiseTexture = noiseTexture;
    particleSystem.noiseStrength = new Vector3(100, 20, 100); // X和Z方向加強

    // 金色螢火蟲（單一色系）
    const goldColor1 = Color3.FromHexString('#d4af37').toColor4(); // 標準金色
    const goldColor2 = Color3.FromHexString('#f4d03f').toColor4(); // 亮金色

    // 閃爍效果
    const blinkMaxStep = 50;
    const hideColor = new Color4(0, 0, 0, 0);

    for (let i = 0; i <= blinkMaxStep; i++) {
      const gradient = i / blinkMaxStep;
      if (i % 4) {
        particleSystem.addColorGradient(gradient, goldColor1, goldColor2);
      } else {
        particleSystem.addColorGradient(gradient, hideColor);
      }
    }
    particleSystem.addColorGradient(1, hideColor);

    particleSystem.start();
  }
</script>

<style scoped>
  /* Logo fade in - 簡單淡入，正常速度 2 秒 */
  .logo-fade-in {
    animation: logoFadeIn 2s ease-out forwards;
  }

  @keyframes logoFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Logo shadow - 淡金色光暈 + 超淡白色煙霧 */
  .logo-shadow {
    filter: 
      /* 淡金色光暈 */ drop-shadow(0 0 10px rgba(212, 175, 55, 0.25))
      drop-shadow(0 0 20px rgba(212, 175, 55, 0.15)) /* 白色煙霧 - 非常淡 */
      drop-shadow(2px 2px 5px rgba(255, 255, 255, 0.1))
      drop-shadow(-2px -2px 5px rgba(255, 255, 255, 0.1))
      drop-shadow(3px -3px 6px rgba(255, 255, 255, 0.08))
      drop-shadow(-3px 3px 6px rgba(255, 255, 255, 0.08));
    animation: smokeyGlow 4s ease-in-out infinite;
  }

  @keyframes smokeyGlow {
    0%,
    100% {
      filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.25))
        drop-shadow(0 0 20px rgba(212, 175, 55, 0.15))
        drop-shadow(2px 2px 5px rgba(255, 255, 255, 0.1))
        drop-shadow(-2px -2px 5px rgba(255, 255, 255, 0.1))
        drop-shadow(3px -3px 6px rgba(255, 255, 255, 0.08))
        drop-shadow(-3px 3px 6px rgba(255, 255, 255, 0.08));
    }
    50% {
      filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.3))
        drop-shadow(0 0 24px rgba(212, 175, 55, 0.18))
        drop-shadow(3px 1px 6px rgba(255, 255, 255, 0.12))
        drop-shadow(-1px -3px 6px rgba(255, 255, 255, 0.12))
        drop-shadow(4px -2px 7px rgba(255, 255, 255, 0.1))
        drop-shadow(-4px 2px 7px rgba(255, 255, 255, 0.1));
    }
  }

  /* Glow effect - 底部煙霧效果 */
  .glow-effect {
    background: radial-gradient(
      ellipse at center,
      rgba(212, 175, 55, 0.3) 0%,
      rgba(212, 175, 55, 0.15) 40%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    animation: smokeRise 4s ease-in-out infinite;
  }

  @keyframes smokeRise {
    0%,
    100% {
      opacity: 0.3;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 0.5;
      transform: translateX(-50%) scale(1.2);
    }
  }

  /* Text fade in animation */
  .text-fade-in {
    opacity: 0;
    animation: fadeIn 2s ease-out 1s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Text shimmer animation */
  .text-shimmer {
    animation: text-shimmer 8s linear infinite;
  }

  @keyframes text-shimmer {
    0%,
    100% {
      opacity: 0.3;
      letter-spacing: 0.4em;
    }
    50% {
      opacity: 0.8;
      letter-spacing: 0.45em;
    }
  }

  /* Vignette overlay */
  .vignette {
    background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  }
</style>
