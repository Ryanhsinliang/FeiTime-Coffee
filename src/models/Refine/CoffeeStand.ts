/**
 * 手沖架模型 (Coffee Stand)
 * 從 App.vue 第 509-569 行抽取
 */

import * as THREE from 'three';
import type { Materials } from './materials';

/**
 * 建立手沖架模型
 */
export function createCoffeeStand(materials: Materials): THREE.Group {
    const standGroup = new THREE.Group();

    // 底座
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 0.3, 2.5),
        materials.wood
    );
    base.position.set(0, 0.15, 0);
    base.receiveShadow = true;
    standGroup.add(base);

    // 主桿
    const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 4, 32),
        materials.brass
    );
    rod.position.set(-1.2, 2, 0);
    rod.castShadow = true;
    standGroup.add(rod);

    // 握把
    const grip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 1.2, 32),
        materials.leather
    );
    grip.position.set(-1.2, 1.0, 0);
    standGroup.add(grip);

    // 頂蓋
    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.05, 32),
        materials.brass
    );
    cap.position.set(-1.2, 4.02, 0);
    standGroup.add(cap);

    // 手臂組
    const armGroup = new THREE.Group();
    armGroup.position.set(-1.2, 3.2, 0);
    standGroup.add(armGroup);

    const sleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.6, 32),
        materials.brass
    );
    armGroup.add(sleeve);

    const knob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16),
        materials.brass
    );
    knob.rotation.set(Math.PI / 2, Math.PI / 4, 0);
    knob.position.set(-0.1, 0, 0.1);
    armGroup.add(knob);

    const mainArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 1.8, 32),
        materials.brass
    );
    mainArm.rotation.set(0, 0, Math.PI / 2);
    mainArm.position.set(0.9, 0.2, 0);
    armGroup.add(mainArm);

    const strut = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.0, 32),
        materials.brass
    );
    strut.rotation.set(0, 0, -Math.PI / 6);
    strut.position.set(0.4, -0.05, 0);
    armGroup.add(strut);

    const joint = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.12, 16),
        materials.brass
    );
    joint.rotation.set(Math.PI / 2, 0, 0);
    joint.position.set(0.8, 0.2, 0);
    armGroup.add(joint);

    return standGroup;
}

/**
 * 建立濾杯支撐環
 */
export function createDripperRing(materials: Materials): THREE.Group {
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0.5, 3.4, 0);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.58, 0.03, 16, 64),
        materials.brass
    );
    ring.rotation.set(Math.PI / 2, 0, 0);
    ringGroup.add(ring);

    const connector = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.2, 16),
        materials.brass
    );
    connector.rotation.set(0, 0, Math.PI / 2);
    connector.position.set(-0.6, 0, 0);
    ringGroup.add(connector);

    return ringGroup;
}
