<template>
  <div v-if="!isTouchDevice" class="fixed inset-0 pointer-events-none z-[9999]">
    <canvas ref="canvasRef" class="block w-full h-full"></canvas>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  const canvasRef = ref(null);
  let ctx = null;
  let animationId = null;
  const isTouchDevice = ref(false);

  const mouse = { x: -100, y: -100 };
  const particles = [];
  const snowPile = [];
  const isPouring = ref(false);

  const cupState = {
    rotation: 0,
    targetRotation: 0,
  };

  const CONFIG = {
    gravity: 0.1,
    latteSize: 20,
    starColor: '255, 255, 255',
    glowColor: '255, 235, 150',
    pourAngle: -Math.PI / 4,
    accumulationY: 22,
  };

  // 檢測是否為觸控設備
  const checkTouchDevice = () => {
    // 方法1: 檢測是否支援觸控
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 方法2: 使用媒體查詢檢測 pointer 類型
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // 方法3: 檢測螢幕寬度 (作為備用判斷)
    const isMobileWidth = window.innerWidth <= 1024;

    // 如果是觸控設備或小螢幕設備,就不顯示游標
    return hasTouchSupport || hasCoarsePointer || isMobileWidth;
  };

  class StarDust {
    constructor(x, y, isPouringMode = false, isBurst = false) {
      this.x = x;
      this.y = y;
      this.relX = this.x - mouse.x;
      this.relY = this.y - mouse.y;
      this.size = Math.random() * 2 + 0.5;
      this.life = 1;
      this.opacity = Math.random() * 0.6 + 0.4;

      if (isBurst) {
        this.vx = (Math.random() - 0.8) * 5;
        this.vy = (Math.random() - 0.5) * 4;
      } else {
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = isPouringMode ? Math.random() * 0.7 + 0.3 : Math.random() * 0.4;
      }

      this.isPouringMode = isPouringMode;
      this.isBurst = isBurst;
    }

    update() {
      if (this.isPouringMode || this.isBurst) {
        this.relX += this.vx;
        this.relY += this.vy + CONFIG.gravity;
        this.x = mouse.x + this.relX;
        this.y = mouse.y + this.relY;

        if (this.isPouringMode && this.relY >= CONFIG.accumulationY) {
          this.relY = CONFIG.accumulationY - Math.random() * 5;
          return true;
        }
        this.life -= this.isBurst ? 0.02 : 0.015;
      } else {
        this.x += this.vx;
        this.y += this.vy + CONFIG.gravity;
        this.life -= 0.009;
      }
      return false;
    }

    draw() {
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${CONFIG.glowColor}, 0.8)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.starColor}, ${this.life * this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  const drawGoldenCup = (x, y, angle) => {
    const s = CONFIG.latteSize;
    ctx.save();
    ctx.translate(x, y);

    // 1. 環境遮蔽影 (微調為更自然的環境光遮蔽)
    const darkHalo = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 6);
    darkHalo.addColorStop(0, 'rgba(40, 30, 20, 0.08)');
    darkHalo.addColorStop(0.4, 'rgba(40, 30, 20, 0.03)');
    darkHalo.addColorStop(1, 'rgba(40, 30, 20, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, s * 6, 0, Math.PI * 2);
    ctx.fillStyle = darkHalo;
    ctx.fill();

    // 2. 核心輕金光
    const glowGrd = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 4.5);
    glowGrd.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
    glowGrd.addColorStop(0.3, 'rgba(255, 248, 220, 0.15)');
    glowGrd.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, s * 4.5, 0, Math.PI * 2);
    ctx.fillStyle = glowGrd;
    ctx.fill();

    // --- 繪製杯子 ---
    ctx.rotate(angle);

    const goldGrd = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
    goldGrd.addColorStop(0, '#D4AF37');
    goldGrd.addColorStop(0.35, '#FAF3A0');
    goldGrd.addColorStop(0.75, '#B08D26');
    goldGrd.addColorStop(1, '#8B6508');

    // --- [關鍵優化：杯身立體描邊] ---
    // 先畫一層稍大的深色金屬邊框，這在白底會提供極佳的辨識度
    ctx.lineJoin = 'round';

    // 杯把描邊
    ctx.beginPath();
    ctx.moveTo(s / 2.5, -s / 5);
    ctx.bezierCurveTo(s / 1.15, -s / 2.2, s / 1.15, s / 2.2, s / 2.5, s / 5);
    ctx.lineWidth = 4.2; // 比原本粗一點點作為「墊底」
    ctx.strokeStyle = '#8B6508'; // 深金棕色
    ctx.stroke();

    // 杯身描邊
    ctx.beginPath();
    ctx.moveTo(-s / 2, -s / 3.5);
    ctx.bezierCurveTo(-s / 2, s / 2.2, s / 2, s / 2.2, s / 2, -s / 3.5);
    ctx.closePath();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = '#8B6508';
    ctx.stroke();

    // --- 填滿原本的金屬色 ---
    // 杯把主體
    ctx.lineWidth = 3.0;
    ctx.strokeStyle = goldGrd;
    ctx.stroke();

    // 杯身主體
    ctx.fillStyle = goldGrd;
    ctx.fill();

    // 最後加一層極細的高光邊線 (應對黑底)
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.stroke();

    // 液面與咖啡
    ctx.beginPath();
    ctx.ellipse(0, -s / 3.5, s / 2, s / 6.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#F2E2B5';
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(0, -s / 3.5, s / 2.4, s / 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#3E2723';
    ctx.fill();

    ctx.restore();
  };

  const animate = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

    if (isPouring.value) {
      if (Math.random() > 0.4) {
        particles.push(new StarDust(mouse.x - 10, mouse.y - 5, true));
      }
    } else {
      if (Math.random() > 0.96) {
        particles.push(new StarDust(mouse.x, mouse.y, false));
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const reachedFloor = particles[i].update();
      if (reachedFloor && isPouring.value && particles[i].isPouringMode) {
        snowPile.push(particles.splice(i, 1)[0]);
      } else if (particles[i].life <= 0) {
        particles.splice(i, 1);
      } else {
        particles[i].draw();
      }
    }

    snowPile.forEach((p) => {
      ctx.save();
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${CONFIG.glowColor}, 0.8)`;
      ctx.beginPath();
      ctx.arc(mouse.x + p.relX, mouse.y + p.relY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`;
      ctx.fill();
      ctx.restore();
    });

    cupState.rotation += (cupState.targetRotation - cupState.rotation) * 0.15;
    drawGoldenCup(mouse.x, mouse.y, cupState.rotation);

    animationId = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const handleMouseDown = () => {
    isPouring.value = true;
    cupState.targetRotation = CONFIG.pourAngle;
  };

  const handleMouseUp = () => {
    if (isPouring.value) {
      const burstCount = 12;
      for (let i = 0; i < burstCount; i++) {
        particles.push(new StarDust(mouse.x - 12, mouse.y - 8, false, true));
      }
    }
    isPouring.value = false;
    cupState.targetRotation = 0;
    snowPile.length = 0;
    particles.forEach((p) => {
      if (p.isPouringMode) {
        p.isPouringMode = false;
        p.life = Math.min(p.life, 0.3);
      }
    });
  };

  const resize = () => {
    if (canvasRef.value) {
      canvasRef.value.width = window.innerWidth;
      canvasRef.value.height = window.innerHeight;
    }
  };

  onMounted(() => {
    // 檢測是否為觸控設備
    isTouchDevice.value = checkTouchDevice();

    // 如果是觸控設備,就不初始化游標效果
    if (isTouchDevice.value) {
      return;
    }

    ctx = canvasRef.value.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'none';
    animate();
  });

  onUnmounted(() => {
    // 只有在非觸控設備時才移除事件監聽
    if (!isTouchDevice.value) {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      cancelAnimationFrame(animationId);
    }
  });
</script>
