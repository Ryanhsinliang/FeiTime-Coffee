<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
    <!-- Firefly Canvas Background -->
    <canvas ref="canvasRef" class="absolute left-0 top-0 h-full w-full pointer-events-none" />

    <!-- Logo Container -->
    <div class="relative z-10 flex flex-col items-center justify-center logo-fade-in">
      <!-- 科技感框線容器 - 包含所有內容 -->
      <div class="relative px-24 py-16 tech-frame-container">
        <!-- 玻璃背景 -->
        <div class="tech-bg"></div>

        <!-- 四條邊框線（分開以便動畫） -->
        <div class="tech-border tech-border-top"></div>
        <div class="tech-border tech-border-right"></div>
        <div class="tech-border tech-border-bottom"></div>
        <div class="tech-border tech-border-left"></div>

        <!-- 四個角落發光三角形 -->
        <div class="tech-corner-glow tech-corner-glow-tl"></div>
        <div class="tech-corner-glow tech-corner-glow-tr"></div>
        <div class="tech-corner-glow tech-corner-glow-bl"></div>
        <div class="tech-corner-glow tech-corner-glow-br"></div>

        <!-- 內容區 -->
        <div class="relative z-10 flex flex-col items-center gap-8">
          <!-- Logo -->
          <div class="relative flex items-center justify-center">
            <img
              alt="FeiTime Logo"
              class="h-auto w-auto max-w-[160px] max-h-40 object-contain logo-shadow"
              src="@/views/HomePage/assets/feitime-logo.webp"
            />
            <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-24 glow-effect"></div>
          </div>

          <!-- 文字區 -->
          <div class="flex flex-col items-center space-y-3 text-center text-fade-in">
            <!-- FeiTime 文字 -->
            <h1 class="font-notoserif text-5xl font-medium tracking-wide title-glow">FeiTime</h1>

            <!-- 標語 -->
            <p class="text-xs font-light tracking-[0.3em] uppercase subtitle-glow">
              Enjoy your Fei Time
            </p>

            <!-- 進入官網按鈕 -->
            <button
              @click="goToHome"
              class="group mt-8 px-8 py-3 border border-white/30 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 hover:border-white/50 transition-all duration-500 cursor-pointer"
            >
              <span class="flex items-center gap-3">
                <span
                  class="text-sm font-light tracking-[0.2em] text-white/95 group-hover:text-white transition-colors"
                >
                  進入官網
                </span>
                <span
                  class="material-symbols-outlined text-white/80 group-hover:text-white text-base transition-all transform group-hover:translate-x-1"
                >
                  arrow_forward
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
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

  const goToHome = () => {
    router.push('/home');
  };

  function initBabylonScene() {
    if (!canvasRef.value) return;

    const canvas = canvasRef.value;
    engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0.01);

    const camera = new ArcRotateCamera('camera', 0, 0, 0, Vector3.Zero(), scene);
    const rect = canvas.getBoundingClientRect();
    camera.radius = Math.min(rect.width, rect.height);

    const light = new HemisphericLight('light', new Vector3(0.5, 1, 0), scene);
    light.intensity = 1;
    light.diffuse = new Color3(1, 1, 1);
    light.groundColor = new Color3(1, 1, 1);

    initRenderingPipeline(scene, camera, canvas);
    initParticleSystem(scene, canvas);

    engine.runRenderLoop(() => {
      scene?.render();
    });

    window.addEventListener('resize', () => {
      engine?.resize();
    });
  }

  function initRenderingPipeline(scene: Scene, camera: ArcRotateCamera, canvas: HTMLCanvasElement) {
    // 移除景深效果以提升效能
    // 景深效果雖然好看，但在粒子系統中會造成明顯的效能負擔
  }

  function initParticleSystem(scene: Scene, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const { width, height } = rect;

    // 優化：減少粒子數量從 5000 到 2500，減輕效能負擔
    const particleSystem = new ParticleSystem('fireflies', 2500, scene);

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

    particleSystem.emitter = new Vector3(0, -height / 2, 0);
    // 優化：降低發射速率從 100 到 60
    particleSystem.emitRate = 60;
    particleSystem.minSize = 4;
    particleSystem.maxSize = 10;
    particleSystem.maxLifeTime = 20;
    particleSystem.minLifeTime = 10;
    particleSystem.minEmitPower = height / 15;
    particleSystem.maxEmitPower = height / 10;
    particleSystem.updateSpeed = 0.01;
    particleSystem.gravity = new Vector3(0, height / 30, 0);

    particleSystem.createBoxEmitter(
      new Vector3(-0.8, 1, -0.8),
      new Vector3(0.8, 1.5, 0.8),
      new Vector3(-width / 2, -height / 2, -100),
      new Vector3(width / 2, -height / 2, 100)
    );

    const noiseTexture = new NoiseProceduralTexture('noise', 256, scene);
    // 優化：減少 octaves 從 6 到 4，降低計算複雜度
    noiseTexture.octaves = 4;
    noiseTexture.persistence = 2;
    noiseTexture.animationSpeedFactor = 2;
    noiseTexture.brightness = 0.5;

    particleSystem.noiseTexture = noiseTexture;
    particleSystem.noiseStrength = new Vector3(100, 20, 100);

    const goldColor1 = Color3.FromHexString('#d4af37').toColor4();
    const goldColor2 = Color3.FromHexString('#f4d03f').toColor4();
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
  .logo-fade-in {
    animation: logoFadeIn 0.8s ease-out forwards;
  }

  @keyframes logoFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .logo-shadow {
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.25))
      drop-shadow(0 0 20px rgba(212, 175, 55, 0.15))
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

  .text-fade-in {
    opacity: 0;
    animation: fadeIn 0.6s ease-out 0.5s forwards;
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

  .vignette {
    background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  }

  .title-glow {
    color: #f5e6d3;
    text-shadow: 0 0 10px rgba(212, 175, 55, 0.9), 0 0 20px rgba(212, 175, 55, 0.7),
      0 0 40px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.3);
  }

  .subtitle-glow {
    color: #d4af37;
    text-shadow: 0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.6),
      0 0 30px rgba(212, 175, 55, 0.4), 0 0 50px rgba(212, 175, 55, 0.2);
  }

  /* 玻璃背景 */
  .tech-bg {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
    border-radius: 4px;
    box-shadow: inset 0 0 80px rgba(255, 255, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  /* 邊框線 - 四條分開以便動畫，直接連到角落 */
  .tech-border {
    position: absolute;
    background: rgba(212, 175, 55, 0.5);
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    z-index: 1;
    transition: clip-path 0.3s ease-out;
  }

  .tech-border-top {
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    animation: borderGrowOutwardX 1.2s ease-out 0.3s both;
    clip-path: inset(0 0 0 0);
  }

  .tech-border-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    animation: borderGrowOutwardX 1.2s ease-out 0.3s both;
    clip-path: inset(0 0 0 0);
  }

  .tech-border-left {
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    animation: borderGrowOutwardY 1.2s ease-out 0.3s both;
    clip-path: inset(0 0 0 0);
  }

  .tech-border-right {
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    animation: borderGrowOutwardY 1.2s ease-out 0.3s both;
    clip-path: inset(0 0 0 0);
  }

  /* Hover 效果 - 邊框線從兩端縮短 */
  .tech-frame-container:hover .tech-border-top {
    clip-path: inset(0 12px 0 12px);
  }

  .tech-frame-container:hover .tech-border-bottom {
    clip-path: inset(0 12px 0 12px);
  }

  .tech-frame-container:hover .tech-border-left {
    clip-path: inset(12px 0 12px 0);
  }

  .tech-frame-container:hover .tech-border-right {
    clip-path: inset(12px 0 12px 0);
  }

  @keyframes borderGrowOutwardX {
    from {
      transform: scaleX(0);
      opacity: 0;
    }
    to {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  @keyframes borderGrowOutwardY {
    from {
      transform: scaleY(0);
      opacity: 0;
    }
    to {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  /* 角落發光三角形 - 蓋住線條製造切角效果（不透明） */
  .tech-corner-glow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: rgba(212, 175, 55, 1);
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.6);
    z-index: 2;
    opacity: 0;
    animation: cornerFadeIn 0.2s ease-out 1.5s both;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  }

  /* Hover 效果 - 四個角往外擴張 */
  .tech-frame-container:hover .tech-corner-glow-tl {
    transform: translate(-6px, -6px);
    box-shadow: 0 0 16px rgba(212, 175, 55, 0.8);
  }

  .tech-frame-container:hover .tech-corner-glow-tr {
    transform: translate(6px, -6px);
    box-shadow: 0 0 16px rgba(212, 175, 55, 0.8);
  }

  .tech-frame-container:hover .tech-corner-glow-bl {
    transform: translate(-6px, 6px);
    box-shadow: 0 0 16px rgba(212, 175, 55, 0.8);
  }

  .tech-frame-container:hover .tech-corner-glow-br {
    transform: translate(6px, 6px);
    box-shadow: 0 0 16px rgba(212, 175, 55, 0.8);
  }

  @keyframes cornerFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tech-corner-glow-tl {
    top: -1px;
    left: -1px;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }

  .tech-corner-glow-tr {
    top: -1px;
    right: -1px;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }

  .tech-corner-glow-bl {
    bottom: -1px;
    left: -1px;
    clip-path: polygon(0 0, 0 100%, 100% 100%);
  }

  .tech-corner-glow-br {
    bottom: -1px;
    right: -1px;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
</style>
