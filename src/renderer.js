
// renderer.js - THREE.JS RENDERING SYSTEM

import * as THREE from 'three';
import { initialiseEnvironment } from './g2.js';
import { initialiseStarfield } from './g3.js';

// ========================================
// RENDERER STATE
// ========================================

let scene;
let camera;
let renderer;
let cube;

// ========================================
// INITIALISE SCENE
// ========================================

export function initialiseRenderer(container) {

    // Scene
    scene = new THREE.Scene();
    initialiseEnvironment(scene);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(renderer.domElement);

    initialiseStarfield(camera);

    // ========================================
    // LIGHTING
    // ========================================

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        1.5
    );

    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    directionalLight.position.set(4, 5, 3);
    scene.add(directionalLight);

    // ========================================
    // TEST OBJECT
    // ========================================

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    const material = new THREE.MeshStandardMaterial({
        color: 0x9a5835,
        roughness: 0.55,
        metalness: 0.25
    });

    cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    // Resize handling
    window.addEventListener('resize', resizeRenderer);

    console.log('[NOS] Three.js renderer initialised.');
}

// ========================================
// UPDATE
// ========================================

export function updateRenderer(deltaTime, simulationValue) {

    if (!renderer) return;

    // Rotate the cube
    cube.rotation.x += deltaTime * 0.5;
    cube.rotation.y += deltaTime * 0.8;

    // Use the C++ simulation value to influence its scale
    const scale = 1 + Math.min(simulationValue * 0.02, 0.5);

    cube.scale.setScalar(scale);

    renderer.render(scene, camera);
}

// ========================================
// RESIZE
// ========================================

function resizeRenderer() {

    if (!renderer || !camera) return;

    const container = renderer.domElement.parentElement;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );
}
