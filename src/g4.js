
// ========================================
// NOT OUR STARS
// g4.js - PLANET GENERATION SYSTEM
// ========================================

import * as THREE from 'three';

// ========================================
// PLANET CONFIGURATION
// ========================================

const PLANET_RADIUS = 20;
const TERRAIN_STRENGTH = 1.8;
const TERRAIN_RESOLUTION = 128;

// ========================================
// SEEDED RANDOM GENERATOR
// ========================================

function createRandom(seed) {
    let value = seed >>> 0;

    return function () {
        value += 0x6D2B79F5;

        let t = value;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ========================================
// PLANET GENERATION
// ========================================

export function generatePlanet(scene, seed = 12345) {

    const random = createRandom(seed);

    const geometry = new THREE.SphereGeometry(
        PLANET_RADIUS,
        TERRAIN_RESOLUTION,
        TERRAIN_RESOLUTION
    );

    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {

        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        const direction = new THREE.Vector3(x, y, z).normalize();

        const variation = (
            random() - 0.5
        ) * TERRAIN_STRENGTH;

        const displacement = PLANET_RADIUS + variation;

        positions.setXYZ(
            i,
            direction.x * displacement,
            direction.y * displacement,
            direction.z * displacement
        );
    }

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
        color: 0x98704e,
        roughness: 0.95,
        metalness: 0.02
    });

    const planet = new THREE.Mesh(geometry, material);

    planet.name = 'StartingPlanet';

    scene.add(planet);

    console.log(`[NOS] Planet generated. Seed: ${seed}`);

    return planet;
}
