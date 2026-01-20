/**
 * 手沖壺模型 (Kettle)
 * 從 App.vue 第 669-734 行抽取
 */

import * as THREE from 'three';
import type { Materials } from './materials';

export interface KettleResult {
    group: THREE.Group;
    spoutTip: THREE.Object3D;
}

/**
 * 建立手沖壺模型
 */
export function createKettle(
    materials: Materials,
    initialPos: THREE.Vector3
): KettleResult {
    const kettleGroup = new THREE.Group();
    kettleGroup.position.copy(initialPos);
    kettleGroup.rotation.set(0, Math.PI, 0);

    // 壺身
    const kBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.75, 1.4, 32),
        materials.kettleBody
    );
    kBody.position.set(0, -0.2, 0);
    kBody.castShadow = true;
    kettleGroup.add(kBody);

    // 壺頂
    const kTop = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.1, 32),
        materials.kettleBody
    );
    kTop.position.set(0, 0.5, 0);
    kettleGroup.add(kTop);

    // 壺蓋
    const kLid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.05, 32),
        materials.kettleBody
    );
    kLid.position.set(0, 0.55, 0);
    kettleGroup.add(kLid);

    // 蓋鈕
    const knob2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.05, 0.15, 16),
        materials.kettleBody
    );
    knob2.position.set(0, 0.65, 0);
    kettleGroup.add(knob2);

    // 溫度計
    const thermGroup = new THREE.Group();
    thermGroup.rotation.set(0, 0, 0.1);
    thermGroup.position.set(0.25, 0.6, 0);
    kettleGroup.add(thermGroup);

    const tStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.4),
        materials.silver
    );
    thermGroup.add(tStem);

    const tDial = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32),
        materials.silver
    );
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

    // 把手（曲線）
    const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.6, 0.4, 0),
        new THREE.Vector3(-1.2, 0.4, 0),
        new THREE.Vector3(-1.2, -0.6, 0),
        new THREE.Vector3(-0.7, -0.6, 0),
    ]);
    const kHandle = new THREE.Mesh(
        new THREE.TubeGeometry(handleCurve, 32, 0.06, 8, false),
        materials.kettleBody
    );
    kHandle.scale.set(1, 1, 0.3);
    kettleGroup.add(kHandle);

    // 壺嘴（曲線）
    const spoutCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.6, -0.6, 0),
        new THREE.Vector3(1.1, -0.4, 0),
        new THREE.Vector3(1.4, 0.2, 0),
        new THREE.Vector3(1.5, 0.3, 0),
        new THREE.Vector3(1.7, 0.35, 0),
    ], false, 'catmullrom', 0.1);
    const kSpout = new THREE.Mesh(
        new THREE.TubeGeometry(spoutCurve, 64, 0.05, 16, false),
        materials.kettleBody
    );
    kSpout.castShadow = true;
    kettleGroup.add(kSpout);

    // 壺嘴尖端（水滴發射點）
    const spoutTip = new THREE.Group();
    spoutTip.position.set(1.6, 0.33, 0);
    kettleGroup.add(spoutTip);

    return {
        group: kettleGroup,
        spoutTip
    };
}
