// renderer.js - THREE.JS RENDERING SYSTEM

import * as THREE from 'three';
import { initialiseEnvironment } from './g2.js';
import {
    initialiseStarfield,
    updateStarfield
} from './g3.js';

// ========================================
// RENDERER STATE
// ========================================

let scene;
let camera;
let renderer;
let starfield;

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

    scene.add(camera);
   
    starfield = initialiseStarfield(scene, camera);

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
// UPDATE
// ========================================

export function updateRenderer(deltaTime, simulationValue) {

    if (!renderer) return;

    updateStarfield(starfield, camera);

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
