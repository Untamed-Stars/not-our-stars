
// ========================================
// NOT OUR STARS
// g2.js - SCENE ENVIRONMENT
// ========================================

import * as THREE from 'three';

// ========================================
// ENVIRONMENT INITIALISATION
// ========================================

export function initialiseEnvironment(scene) {

    // Background colour
    scene.background = new THREE.Color(0x080d18);

    // Atmospheric fog
    scene.fog = new THREE.FogExp2(
        0x101b2b,
        0.0008
    );

    // Ambient illumination
    const ambientLight = new THREE.AmbientLight(
        0xb8c9e8,
        0.65
    );

    scene.add(ambientLight);

    // Main sunlight
    const sunlight = new THREE.DirectionalLight(
        0xffe8c4,
        2.0
    );

    sunlight.position.set(100, 150, 80);

    scene.add(sunlight);

    console.log('[NOS] Environment initialised.');

    return {
        ambientLight,
        sunlight
    };
}
