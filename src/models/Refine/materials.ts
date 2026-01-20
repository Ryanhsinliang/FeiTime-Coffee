/**
 * 3D 模型共用材質定義
 * 從 App.vue 第 270-281 行抽取
 */

import * as THREE from 'three';

// 木紋材質 - 用於手沖架底座
export const woodMaterial = new THREE.MeshStandardMaterial({
    color: '#4a3728',
    roughness: 0.7,
    metalness: 0.1
});

// 黃銅材質 - 用於金屬零件
export const brassMaterial = new THREE.MeshStandardMaterial({
    color: '#eebb44',
    metalness: 1.0,
    roughness: 0.15
});

// 皮革材質 - 用於手沖架握把
export const leatherMaterial = new THREE.MeshStandardMaterial({
    color: '#8B4513',
    roughness: 0.9
});

// 陶瓷材質 - 用於濾杯
export const ceramicMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.1,
    metalness: 0.1,
    flatShading: true
});

// 濾紙材質
export const paperMaterial = new THREE.MeshStandardMaterial({
    color: '#fdfbf7',
    roughness: 1,
    side: THREE.DoubleSide
});

// 咖啡粉材質
export const groundCoffeeMaterial = new THREE.MeshStandardMaterial({
    color: '#3b2f2f',
    roughness: 0.9
});

// 玻璃材質 - 用於咖啡壺
export const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    thickness: 0.3,
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
    ior: 1.5,
    color: '#ffffff'
});

// 咖啡液材質
export const coffeeLiquidMaterial = new THREE.MeshStandardMaterial({
    color: '#2a1810',
    roughness: 0.3,
    metalness: 0.1
});

// 手沖壺本體材質
export const kettleBodyMat = new THREE.MeshStandardMaterial({
    color: '#2b2b2b',
    metalness: 0.7,
    roughness: 0.3
});

// 銀色材質 - 用於溫度計等
export const silverMat = new THREE.MeshStandardMaterial({
    color: '#f0f0f0',
    metalness: 0.9,
    roughness: 0.2
});

// 水滴材質
export const waterDropMat = new THREE.MeshBasicMaterial({
    color: '#aaddff',
    transparent: true,
    opacity: 0.8
});

/**
 * 材質集合類型
 */
export interface Materials {
    wood: THREE.MeshStandardMaterial;
    brass: THREE.MeshStandardMaterial;
    leather: THREE.MeshStandardMaterial;
    ceramic: THREE.MeshStandardMaterial;
    paper: THREE.MeshStandardMaterial;
    groundCoffee: THREE.MeshStandardMaterial;
    glass: THREE.MeshPhysicalMaterial;
    coffeeLiquid: THREE.MeshStandardMaterial;
    kettleBody: THREE.MeshStandardMaterial;
    silver: THREE.MeshStandardMaterial;
    waterDrop: THREE.MeshBasicMaterial;
}

/**
 * 取得所有材質的集合
 */
export function getMaterials(): Materials {
    return {
        wood: woodMaterial,
        brass: brassMaterial,
        leather: leatherMaterial,
        ceramic: ceramicMaterial,
        paper: paperMaterial,
        groundCoffee: groundCoffeeMaterial,
        glass: glassMaterial,
        coffeeLiquid: coffeeLiquidMaterial,
        kettleBody: kettleBodyMat,
        silver: silverMat,
        waterDrop: waterDropMat
    };
}
