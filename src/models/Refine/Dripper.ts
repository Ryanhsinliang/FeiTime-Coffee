/**
 * 濾杯模型 (Dripper)
 * 從 App.vue 第 571-616 行抽取
 */

import * as THREE from 'three';
import type { Materials } from './materials';

export interface DripperResult {
    group: THREE.Group;
    coffeeBedMesh: THREE.Mesh;
    wetTexture: THREE.CanvasTexture;
    wetContext: CanvasRenderingContext2D;
}

/**
 * 建立濾杯模型
 */
export function createDripper(materials: Materials): DripperResult {
    const dripperGroup = new THREE.Group();
    dripperGroup.position.set(0.5, 2.8, 0);

    // 濾杯外殼
    const shell = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 0.15, 1.6, 20, 1, true),
        materials.ceramic
    );
    shell.castShadow = true;
    dripperGroup.add(shell);

    // 濾杯邊緣
    const rim = new THREE.Mesh(
        new THREE.TorusGeometry(1.1, 0.04, 8, 20),
        materials.ceramic
    );
    rim.rotation.set(Math.PI / 2, 0, 0);
    rim.position.set(0, 0.8, 0);
    dripperGroup.add(rim);

    // 濾紙
    const filter = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 0.1, 1.55, 32, 1, true),
        materials.paper
    );
    filter.position.set(0, 0.05, 0);
    dripperGroup.add(filter);

    // 咖啡粉組
    const groundsGroup = new THREE.Group();
    groundsGroup.position.set(0, -0.2, 0);
    dripperGroup.add(groundsGroup);

    // 咖啡粉潮濕紋理
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const wetContext = canvas.getContext('2d')!;
    wetContext.fillStyle = '#3b2f2f';
    wetContext.fillRect(0, 0, 256, 256);
    const wetTexture = new THREE.CanvasTexture(canvas);

    const wetGroundsMat = new THREE.MeshStandardMaterial({
        color: '#3b2f2f',
        roughness: 0.9,
        map: wetTexture
    });

    // 咖啡粉錐體
    const groundsCone = new THREE.Mesh(
        new THREE.ConeGeometry(0.7, 0.6, 32),
        materials.groundCoffee
    );
    groundsCone.rotation.set(Math.PI, 0, 0);
    groundsGroup.add(groundsCone);

    // 咖啡粉表面（帶潮濕紋理）
    const coffeeBedMesh = new THREE.Mesh(
        new THREE.CircleGeometry(0.7, 32),
        wetGroundsMat
    );
    coffeeBedMesh.rotation.set(-Math.PI / 2, 0, 0);
    coffeeBedMesh.position.set(0, 0.3, 0);
    groundsGroup.add(coffeeBedMesh);

    return {
        group: dripperGroup,
        coffeeBedMesh,
        wetTexture,
        wetContext
    };
}
