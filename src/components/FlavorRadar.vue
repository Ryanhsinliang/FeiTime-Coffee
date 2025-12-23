<template>
  <div class="w-full">
    <div class="rounded-xl bg-[rgba(44,74,59,0.04)] p-4">
      <svg
        class="w-full"
        viewBox="0 0 160 160"
        role="img"
        aria-label="Flavor radar chart"
      >
        <!-- rings -->
        <polygon
          v-for="lvl in ringLevels"
          :key="lvl"
          :points="polygonForLevel(lvl)"
          fill="none"
          stroke="rgba(39,60,53,0.22)"
          stroke-width="1"
        />
        <!-- axes -->
        <line
          v-for="(k, idx) in orderedKeys"
          :key="k"
          :x1="cx"
          :y1="cy"
          :x2="axisPoint(idx).x"
          :y2="axisPoint(idx).y"
          stroke="rgba(39,60,53,0.22)"
          stroke-width="1"
        />

        <!-- data polygon -->
        <polygon
          :points="dataPolygon"
          fill="rgba(44,74,59,0.18)"
          stroke="rgba(39,60,53,0.72)"
          stroke-width="1.6"
        />

        <!-- data vertices -->
        <circle
          v-for="(k, idx) in orderedKeys"
          :key="k"
          :cx="dataPoint(idx).x"
          :cy="dataPoint(idx).y"
          r="2.2"
          fill="rgba(39,60,53,0.9)"
        />

        <!-- labels -->
        <text
          v-for="(k, idx) in orderedKeys"
          :key="k + '-label'"
          :x="labelPoint(idx).x"
          :y="labelPoint(idx).y"
          :text-anchor="labelAnchor(idx)"
          dominant-baseline="middle"
          class="fill-[#273c35] text-[10px]"
        >
          {{ displayLabel(k) }}
        </text>
      </svg>

      <div class="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        <div
          v-for="k in orderedKeys"
          :key="k + '-mini'"
          class="rounded-lg bg-[rgba(252,249,243,0.85)] px-2 py-1 text-center"
        >
          <div class="text-[12px] font-semibold text-[#273c35]">
            {{ safeScore(k).toFixed(1) }}
          </div>
          <div class="text-[11px] text-[#8a847a]">
            {{ displayLabel(k) }}
          </div>
        </div>
      </div>
    </div>

    <p class="mt-2 text-[12px] text-[#8a847a]">
      讀法：越靠近外圈（5 分）代表該指標越明顯；越靠近中心（1 分）代表該指標越弱。
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type FlavorKey = 'Sweetness' | 'Acidity' | 'Clarity' | 'Body' | 'Aftertaste';

const props = defineProps<{
  scores: Record<string, number>;
  labelMap?: Record<string, string>;
}>();

const orderedKeys = computed<FlavorKey[]>(() => {
  const fallback: FlavorKey[] = ['Sweetness', 'Acidity', 'Clarity', 'Body', 'Aftertaste'];
  // 若外部傳入 scores 有缺 key，就依 fallback 補齊（避免雷達圖軸數錯亂）
  const keys = fallback.filter((k) => Object.prototype.hasOwnProperty.call(props.scores, k));
  return keys.length === 5 ? keys : fallback;
});

const ringLevels = [1, 2, 3, 4, 5];

const cx = 80;
const cy = 80;
const radius = 45;
const labelRadius = 64;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function angleRad(idx: number) {
  // 0: top, clockwise
  return (Math.PI * 2 * idx) / orderedKeys.value.length - Math.PI / 2;
}

function pointAt(r: number, idx: number) {
  const a = angleRad(idx);
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function axisPoint(idx: number) {
  return pointAt(radius, idx);
}

function safeScore(key: string) {
  const v = Number(props.scores?.[key]);
  if (Number.isFinite(v)) return clamp(v, 1, 5);
  return 1;
}

function dataPoint(idx: number) {
  const key = orderedKeys.value[idx] ?? '';
  const t = safeScore(key) / 5; // 1..5 映射到 0.2..1
  return pointAt(radius * t, idx);
}

function polygonPoints(points: { x: number; y: number }[]) {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
}

function polygonForLevel(level: number) {
  const t = clamp(level, 1, 5) / 5;
  const pts = orderedKeys.value.map((_, idx) => pointAt(radius * t, idx));
  return polygonPoints(pts);
}

const dataPolygon = computed(() => {
  const pts = orderedKeys.value.map((_, idx) => dataPoint(idx));
  return polygonPoints(pts);
});

function labelPoint(idx: number) {
  return pointAt(labelRadius, idx);
}

function labelAnchor(idx: number) {
  const a = angleRad(idx);
  const c = Math.cos(a);
  if (c > 0.35) return 'start';
  if (c < -0.35) return 'end';
  return 'middle';
}

function displayLabel(key: string) {
  return props.labelMap?.[key] ?? key;
}
</script>
