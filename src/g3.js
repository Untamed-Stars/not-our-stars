
 // ========================================
 // NOT OUR STARS
 // g3.js - PROCEDURAL STARFIELD
 // ========================================

import * as THREE from 'three';

// ========================================
// STARFIELD SETTINGS
// ========================================

const STAR_COUNT = 1500;
const STAR_RADIUS = 850;
const MIN_STAR_DISTANCE = 30;
const MAX_ATTEMPTS = 150000;

// Star size categories, in pixels.
const STAR_SIZES = {
    small: 1.3,
    medium: 1.8,
    large: 2.4
};

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
// STARFIELD CREATION
// ========================================

function createStarGroup(stars, size, opacity) {

    if (stars.length === 0) return null;

    const geometry = new THREE.BufferGeometry();

    const positionArray = new Float32Array(
        stars.length * 3
    );

    const colorArray = new Float32Array(
        stars.length * 3
    );

    for (let i = 0; i < stars.length; i++) {

        const star = stars[i];

        positionArray[i * 3] = star.position.x;
        positionArray[i * 3 + 1] = star.position.y;
        positionArray[i * 3 + 2] = star.position.z;

        colorArray[i * 3] = star.brightness;
        colorArray[i * 3 + 1] = star.brightness;
        colorArray[i * 3 + 2] = star.brightness;
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

        size,

        sizeAttenuation: false,

        vertexColors: true,

        transparent: true,

        opacity,

        depthWrite: false,

        fog: false

    });

    return new THREE.Points(geometry, material);
}

// ========================================
// INITIALISE STARFIELD
// ========================================

export function initialiseStarfield(camera) {

    const positions = generateStarPositions();

    const groups = {
        small: [],
        medium: [],
        large: []
    };

    // Assign each star a size and brightness.
    for (const position of positions) {

        const roll = Math.random();

        let category;

        if (roll < 0.72) {
            category = 'small';
        } else if (roll < 0.95) {
            category = 'medium';
        } else {
            category = 'large';
        }

        let brightness;

        if (category === 'small') {
            brightness = 0.45 + Math.random() * 0.3;
        } else if (category === 'medium') {
            brightness = 0.7 + Math.random() * 0.25;
        } else {
            brightness = 0.9 + Math.random() * 0.1;
        }

        groups[category].push({
            position,
            brightness
        });
    }

    // Create the three star layers.
    for (const category of Object.keys(groups)) {

        const starGroup = createStarGroup(
            groups[category],
            STAR_SIZES[category],
            1.0
        );

        if (starGroup) {
            camera.add(starGroup);
        }
    }

    console.log('[NOS] Starfield initialised.');
}
