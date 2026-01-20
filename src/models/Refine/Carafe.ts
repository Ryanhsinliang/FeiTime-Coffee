/**
 * 咖啡壺模型 (Carafe)
 * 從 App.vue 第 618-667 行抽取
 */

import * as THREE from 'three';
import type { Materials } from './materials';

export interface CarafeResult {
    group: THREE.Group;
    liquidMesh: THREE.Mesh;
}

/**
 * 建立咖啡壺模型
 */
export function createCarafe(materials: Materials): CarafeResult {
    const carafeGroup = new THREE.Group();
    carafeGroup.position.set(0.5, 0.1, 0);

    // 壺身
    const cBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 1.2, 1.2, 32, 1, true),
        materials.glass
    );
    cBody.position.set(0, 0.6, 0);
    cBody.castShadow = true;
    carafeGroup.add(cBody);

    // 壺底
    const cBottom = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32),
        materials.glass
    );
    carafeGroup.add(cBottom);

    // 壺頸
    const cNeck = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.7, 0.3, 32, 1, true),
        materials.glass
    );
    cNeck.position.set(0, 1.35, 0);
    carafeGroup.add(cNeck);

    // 壺嘴
    const cSpout = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.05, 0.2, 16, 1, true),
        materials.glass
    );
    cSpout.rotation.set(0, 0, -Math.PI / 4);
    cSpout.position.set(0.7, 1.5, 0);
    carafeGroup.add(cSpout);

    // 把手
    const cHandle = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.06, 16, 32, 4),
        materials.glass
    );
    cHandle.rotation.set(0, 0, Math.PI / 1.2);
    cHandle.position.set(-0.8, 0.8, 0);
    carafeGroup.add(cHandle);

    // 咖啡液（初始狀態）
    const initFill = 0.01;
    const initHeight = 1.2 * initFill;
    const initTopR = THREE.MathUtils.lerp(1.15, 0.68, initFill);
    const liquidMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(initTopR, 1.15, initHeight, 32),
        materials.coffeeLiquid
    );
    liquidMesh.position.set(0, 0.05 + initHeight / 2, 0);
    carafeGroup.add(liquidMesh);

    // 刻度標記
    const markingsGroup = new THREE.Group();
    markingsGroup.position.set(0, 0.6, 0.9);
    carafeGroup.add(markingsGroup);

    const mBack = new THREE.Mesh(
        new THREE.PlaneGeometry(0.4, 0.8),
        new THREE.MeshBasicMaterial({
            color: 'white',
            opacity: 0.2,
            transparent: true,
            side: THREE.DoubleSide
        })
    );
    markingsGroup.add(mBack);

    [0.1, 0.3, 0.5].forEach(y => {
        const mark = new THREE.Mesh(
            new THREE.PlaneGeometry(0.2, 0.015),
            new THREE.MeshBasicMaterial({ color: 'white', opacity: 0.9, transparent: true })
        );
        mark.position.set(0, y - 0.3, 0.01);
        markingsGroup.add(mark);
    });

    return {
        group: carafeGroup,
        liquidMesh
    };
}
