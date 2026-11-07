
 // ========================================
 // NOT OUR STARS
 // g3.js - PROCEDURAL STARFIELD
 // ========================================

import * as THREE from 'three';

// ========================================
// STARFIELD SETTINGS
// ========================================

const STAR_COUNT = 700;
const STAR_RADIUS = 850;
const MIN_STAR_DISTANCE = 42;
const MAX_ATTEMPTS = 100000;

// ========================================
// RANDOM STAR POSITION
// ========================================

function randomPointOnSphere(radius) {

    const y = Math.random() * 2 - 1;
    const angle = Math.random() * Math.PI * 2;

    const horizontal = Math.sqrt(1 - y * y);

    return new THREE.Vector3(
        Math.cos(angle) * horizontal * radius,
        y * radius,
        Math.sin(angle) * horizontal * radius
    );
}

// ========================================
// STAR GENERATION
// ========================================

function generateStarPositions() {

    const positions = [];
    const minimumDistanceSquared =
        MIN_STAR_DISTANCE * MIN_STAR_DISTANCE;

    let attempts = 0;

    while (
        positions.length < STAR_COUNT &&
        attempts < MAX_ATTEMPTS
    ) {

        attempts++;

        const candidate =
            randomPointOnSphere(STAR_RADIUS);

        let valid = true;

        // Check separation from existing stars.
        for (const existing of positions) {

            if (
                candidate.distanceToSquared(existing) <
                minimumDistanceSquared
            ) {
                valid = false;
                break;
            }
        }

        if (valid) {
            positions.push(candidate);
        }
    }

    console.log(
        `[NOS] Generated ${positions.length} separated stars.`
    );

    return positions;
}

// ========================================
// INITIALISE STARFIELD
// ========================================

export function initialiseStarfield(camera) {

    const positions = generateStarPositions();

    const geometry = new THREE.BufferGeometry();

    const positionArray = new Float32Array(
        positions.length * 3
    );

    const colorArray = new Float32Array(
        positions.length * 3
    );

    for (let i = 0; i < positions.length; i++) {

        const star = positions[i];

        positionArray[i * 3] = star.x;
        positionArray[i * 3 + 1] = star.y;
        positionArray[i * 3 + 2] = star.z;

        // Mostly white, with subtle blue variation.
        const blueTint = Math.random() * 0.18;

        colorArray[i * 3] = 1.0 - blueTint * 0.4;
        colorArray[i * 3 + 1] = 1.0 - blueTint * 0.2;
        colorArray[i * 3 + 2] = 1.0;
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionArray, 3)
    );

    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colorArray, 3)
    );

    const material = new THREE.PointsMaterial({

        size: 1.7,

        sizeAttenuation: false,

        vertexColors: true,

        transparent: true,

        opacity: 0.9,

        depthWrite: false,

        fog: false

    });

    const starfield = new THREE.Points(
        geometry,
        material
    );

    // Keep stars centred around the camera.
    camera.add(starfield);

    console.log('[NOS] Starfield initialised.');

    return starfield;
}
