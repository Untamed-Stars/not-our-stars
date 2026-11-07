
 // ========================================
 // NOT OUR STARS
 // g3.js - PROCEDURAL CELESTIAL STARFIELD
 // ========================================

import * as THREE from 'three';

// ========================================
// STARFIELD SETTINGS
// ========================================

const STAR_COUNT = 6000;
const STAR_RADIUS = 900;

const MIN_ANGULAR_DISTANCE = 0.018;

const MAX_ATTEMPTS = 100000;

const STAR_SEED = 734921;

const STAR_SIZES = {
    small: 1.3,
    medium: 1.9,
    large: 2.5
};

// ========================================
// SEEDED RANDOM GENERATOR
// ========================================

function createRandom(seed) {

    let state = seed >>> 0;

    return function () {

        state += 0x6D2B79F5;

        let value = state;

        value = Math.imul(
            value ^ (value >>> 15),
            value | 1
        );

        value ^= value + Math.imul(
            value ^ (value >>> 7),
            value | 61
        );

        return (
            (value ^ (value >>> 14)) >>> 0
        ) / 4294967296;
    };
}

// ========================================
// RANDOM UNIT VECTOR
// ========================================

function randomDirection(random) {

    const y = random() * 2 - 1;
    const angle = random() * Math.PI * 2;

    const horizontal = Math.sqrt(1 - y * y);

    return new THREE.Vector3(
        Math.cos(angle) * horizontal,
        y,
        Math.sin(angle) * horizontal
    );
}

// ========================================
// STAR DISTRIBUTION
// ========================================

function generateStars() {

    const random = createRandom(STAR_SEED);

    const stars = [];

    const cellSize =
        MIN_ANGULAR_DISTANCE / Math.sqrt(3);

    const minDistanceSquared =
        MIN_ANGULAR_DISTANCE *
        MIN_ANGULAR_DISTANCE;

    const spatialGrid = new Map();

    function getCell(direction) {

        return [
            Math.floor(direction.x / cellSize),
            Math.floor(direction.y / cellSize),
            Math.floor(direction.z / cellSize)
        ];
    }

    function cellKey(x, y, z) {
        return `${x},${y},${z}`;
    }

    let attempts = 0;

    while (
        stars.length < STAR_COUNT &&
        attempts < MAX_ATTEMPTS
    ) {

        attempts++;

        const direction = randomDirection(random);

        const [cx, cy, cz] = getCell(direction);

        let valid = true;

        // Check neighbouring spatial cells.
        for (
            let x = cx - 2;
            x <= cx + 2 && valid;
            x++
        ) {

            for (
                let y = cy - 2;
                y <= cy + 2 && valid;
                y++
            ) {

                for (
                    let z = cz - 2;
                    z <= cz + 2;
                    z++
                ) {

                    const nearby = spatialGrid.get(
                        cellKey(x, y, z)
                    );

                    if (!nearby) continue;

                    for (const existing of nearby) {

                        if (
                            direction.distanceToSquared(existing) <
                            minDistanceSquared
                        ) {

                            valid = false;
                            break;
                        }
                    }

                    if (!valid) break;
                }
            }
        }

        if (!valid) continue;

        // Accept this star.
        stars.push({
            direction,
            brightness: 0,
            size: 'small'
        });

        const key = cellKey(cx, cy, cz);

        if (!spatialGrid.has(key)) {
            spatialGrid.set(key, []);
        }

        spatialGrid.get(key).push(direction);
    }

    // Assign size and brightness.
    for (const star of stars) {

        const roll = random();

        if (roll < 0.72) {

            star.size = 'small';

            star.brightness =
                0.45 + random() * 0.3;

        } else if (roll < 0.95) {

            star.size = 'medium';

            star.brightness =
                0.7 + random() * 0.25;

        } else {

            star.size = 'large';

            star.brightness =
                0.9 + random() * 0.1;
        }
    }

    console.log(
        `[NOS] Generated ${stars.length} persistent stars.`
    );

    return stars;
}

// ========================================
// CREATE STAR GROUP
// ========================================

function createStarGroup(stars, size) {

    if (stars.length === 0) return null;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(
        stars.length * 3
    );

    const colors = new Float32Array(
        stars.length * 3
    );

    for (let i = 0; i < stars.length; i++) {

        const star = stars[i];

        const position = star.direction
            .clone()
            .multiplyScalar(STAR_RADIUS);

        positions[i * 3] = position.x;
        positions[i * 3 + 1] = position.y;
        positions[i * 3 + 2] = position.z;

        // Subtle white and blue variation.
        const blueTint = star.brightness * 0.04;

        colors[i * 3] =
            star.brightness;

        colors[i * 3 + 1] =
            star.brightness - blueTint;

        colors[i * 3 + 2] =
            star.brightness;
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    );

    const material = new THREE.PointsMaterial({

        size,

        sizeAttenuation: false,

        vertexColors: true,

        transparent: true,

        opacity: 1,

        depthWrite: false,

        fog: false

    });

    return new THREE.Points(geometry, material);
}

// ========================================
// INITIALISE STARFIELD
// ========================================

export function initialiseStarfield(scene, camera) {

    const stars = generateStars();

    const groups = {
        small: [],
        medium: [],
        large: []
    };

    for (const star of stars) {
        groups[star.size].push(star);
    }

    const starfield = new THREE.Group();

    // Create the three star-size layers.
    for (const category of Object.keys(groups)) {

        const points = createStarGroup(
            groups[category],
            STAR_SIZES[category]
        );

        if (points) {
            starfield.add(points);
        }
    }

    // Start at the camera's world position.
    camera.getWorldPosition(starfield.position);

    // Add to the scene, NOT the camera.
    scene.add(starfield);

    console.log('[NOS] Persistent starfield initialised.');

    return starfield;
}

// ========================================
// UPDATE STARFIELD POSITION
// ========================================

export function updateStarfield(starfield, camera) {

    if (!starfield) return;

    // Follow camera position without following rotation.
    camera.getWorldPosition(starfield.position);
}
