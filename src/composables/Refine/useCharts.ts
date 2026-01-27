/**
 * 圖表功能 Composable
 * 從 App.vue 抽取的 Chart.js 相關功能
 */

import { ref, nextTick } from 'vue';
import type { ComputedRef } from 'vue';
import Chart from 'chart.js/auto';

/**
 * 圖表 Composable
 * 管理風味雷達圖和萃取曲線圖
 */
export function useCharts(
    flavorScores: ComputedRef<number[]>,
    showResultModal: { value: boolean }
) {
    // 圖表實例
    let radarChartInstance: Chart | null = null;
    let lineChartInstance: Chart | null = null;
    let resultRadarInstance: Chart | null = null;

    // 萃取曲線數據
    const waterData = ref<number[]>([0]);
    const timeLabels = ref<string[]>(['0:00']);

    /**
     * 初始化主要圖表 (風味雷達 + 萃取曲線)
     */
    const initCharts = () => {
        // 風味雷達圖
        const radarCtx = document.getElementById('radarChart') as HTMLCanvasElement;
        if (radarCtx) {
            if (radarChartInstance) radarChartInstance.destroy();
            radarChartInstance = new Chart(radarCtx, {
                type: 'radar',
                data: {
                    labels: ['甜感', '酸度', '澄澈度', '醇厚度', '餘韻'],
                    datasets: [{
                        label: 'Flavor Profile',
                        data: [3, 3, 3, 3, 3],
                        backgroundColor: 'rgba(139, 69, 19, 0.2)',
                        borderColor: '#8B4513',
                        pointBackgroundColor: '#8B4513',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 5,
                            ticks: { stepSize: 1, backdropColor: 'transparent', font: { size: 8 } },
                            pointLabels: { font: { size: 9 } },
                            angleLines: { display: true },
                        }
                    },
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false
                }
            });
        }

        // 萃取曲線圖
        const lineCtx = document.getElementById('lineChart') as HTMLCanvasElement;
        if (lineCtx) {
            if (lineChartInstance) lineChartInstance.destroy();
            lineChartInstance = new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: timeLabels.value,
                    datasets: [{
                        label: 'Water (ml)',
                        data: waterData.value,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    scales: {
                        x: { ticks: { maxTicksLimit: 5, font: { size: 8 } } },
                        y: { suggestedMin: 0, suggestedMax: 300, ticks: { maxTicksLimit: 4, font: { size: 8 } } }
                    },
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false
                }
            });
        }
    };

    /**
     * 更新圖表數據
     */
    const updateCharts = (totalWater: number, formattedTime: string) => {
        // 更新風味雷達
        if (radarChartInstance) {
            radarChartInstance.data.datasets[0].data = flavorScores.value;
            radarChartInstance.update('none');
        }

        // 更新萃取曲線
        if (lineChartInstance) {
            waterData.value.push(totalWater);
            timeLabels.value.push(formattedTime);
            lineChartInstance.data.labels = timeLabels.value;
            lineChartInstance.data.datasets[0].data = waterData.value;
            lineChartInstance.update('none');
        }
    };

    /**
     * 渲染結果雷達圖 (用於結果 Modal)
     */
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
                        datasets: [{
                            label: 'Flavor Profile',
                            data: flavorScores.value,
                            backgroundColor: 'rgba(139, 69, 19, 0.2)',
                            borderColor: '#8B4513',
                            pointBackgroundColor: '#8B4513',
                        }]
                    },
                    options: {
                        scales: {
                            r: {
                                suggestedMin: 0,
                                suggestedMax: 5,
                                ticks: { stepSize: 1, backdropColor: 'transparent' },
                                angleLines: { display: true },
                            }
                        },
                        plugins: { legend: { display: false } },
                        maintainAspectRatio: false
                    }
                });
            }
        });
    };

    /**
     * 重置圖表數據
     */
    const resetCharts = () => {
        waterData.value = [0];
        timeLabels.value = ['0:00'];

        if (radarChartInstance) {
            radarChartInstance.data.datasets[0].data = [3, 3, 3, 3, 3];
            radarChartInstance.update('none');
        }

        if (lineChartInstance) {
            lineChartInstance.data.labels = timeLabels.value;
            lineChartInstance.data.datasets[0].data = waterData.value;
            lineChartInstance.update('none');
        }
    };

    /**
     * 銷毀所有圖表實例
     */
    const destroyCharts = () => {
        if (radarChartInstance) {
            radarChartInstance.destroy();
            radarChartInstance = null;
        }
        if (lineChartInstance) {
            lineChartInstance.destroy();
            lineChartInstance = null;
        }
        if (resultRadarInstance) {
            resultRadarInstance.destroy();
            resultRadarInstance = null;
        }
    };

    return {
        waterData,
        timeLabels,
        initCharts,
        updateCharts,
        renderResultChart,
        resetCharts,
        destroyCharts
    };
}
