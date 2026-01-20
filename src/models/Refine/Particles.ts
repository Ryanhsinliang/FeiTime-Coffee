/**
 * 粒子系統 (Particles)
 * 從 App.vue 第 736-745 行抽取
 */

import * as THREE from 'three';

export interface DropsData {
    position: THREE.Vector3;
    velocity: number;
    active: boolean;
}

export interface SteamData {
    x: number;
    y: number;
    z: number;
    scale: number;
    speed: number;
}

/**
 * 建立水滴粒子系統
 */
export function createDropsSystem(
    material: THREE.Material,
    count: number
): {
    mesh: THREE.InstancedMesh;
    data: DropsData[];
} {
    const geometry = new THREE.SphereGeometry(0.035, 8, 8);
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.frustumCulled = false;

    const data: DropsData[] = new Array(count).fill(0).map(() => ({
        position: new THREE.Vector3(0, -100, 0),
        velocity: 0,
        active: false
    }));

    return { mesh, data };
}

/**
 * 建立蒸氣粒子系統
 */
export function createSteamSystem(count: number): {
    mesh: THREE.InstancedMesh;
    data: SteamData[];
} {
    const geometry = new THREE.SphereGeometry(0.2, 8, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        depthWrite: false
    });
    const mesh = new THREE.InstancedMesh(geometry, material, count);

    const data: SteamData[] = new Array(count).fill(0).map(() => ({
        x: (Math.random() - 0.5) * 0.5,
        y: Math.random() * 2,
        z: (Math.random() - 0.5) * 0.5,
        scale: Math.random(),
        speed: 0.005 + Math.random() * 0.01
    }));

    return { mesh, data };
}

/**
 * 建立地板
 */
export function createFloor(): THREE.Mesh {
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: '#f0e4d7', roughness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    return floor;
}
