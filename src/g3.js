
// ========================================
// NOT OUR STARS
// g3.js - PERSISTENT PROCEDURAL STARFIELD
// ========================================

import * as THREE from 'three';

// ========================================
// CONFIGURATION
// ========================================

const STAR_COUNT = 7000;
const STAR_RADIUS = 900;

const STAR_SEED = 734921;

const MIN_ANGULAR_DISTANCE = 0.018;
const MAX_ATTEMPTS = 1000000;

const STAR_SIZES = {
    small: 1.3,
    medium: 1.9,
    large: 2.7
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
// RANDOM SPHERICAL DIRECTION
// ========================================

function randomDirection(random) {

    const y = random() * 2 - 1;
    const angle = random() * Math.PI * 2;

    const horizontal = Math.sqrt(
        1 - y * y
    );

    return new THREE.Vector3(
        Math.cos(angle) * horizontal,
        y,
        Math.sin(angle) * horizontal
    );
}

// ========================================
// SPATIAL GRID
// ========================================

function generateStars() {

    const random = createRandom(STAR_SEED);

    const stars = [];
    const spatialGrid = new Map();

    const cellSize =
        MIN_ANGULAR_DISTANCE / Math.sqrt(3);

    const minDistanceSquared =
        MIN_ANGULAR_DISTANCE *
        MIN_ANGULAR_DISTANCE;

    function cellCoordinates(direction) {

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

    // ====================================
    // GENERATE DISTRIBUTION
    // ====================================

    while (
        stars.length < STAR_COUNT &&
        attempts < MAX_ATTEMPTS
    ) {

        attempts++;

        const direction = randomDirection(random);

        const [cx, cy, cz] =
            cellCoordinates(direction);

        let valid = true;

        // Check neighbouring spatial cells.
        // This prevents excessive clustering.

        for (let x = cx - 2; x <= cx + 2 && valid; x++) {

            for (let y = cy - 2; y <= cy + 2 && valid; y++) {

                for (let z = cz - 2; z <= cz + 2; z++) {

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

        stars.push({
            direction,
            brightness: 0,
            size: 'small',
            color: new THREE.Color()
        });

        const key = cellKey(cx, cy, cz);

        if (!spatialGrid.has(key)) {
            spatialGrid.set(key, []);
        }

        spatialGrid.get(key).push(direction);
    }

    // ====================================
    // STAR APPEARANCE
    // ====================================

    for (const star of stars) {

        const roll = random();

        if (roll < 0.74) {

            star.size = 'small';
            star.brightness = 0.45 + random() * 0.35;

        } else if (roll < 0.96) {

            star.size = 'medium';
            star.brightness = 0.65 + random() * 0.3;

        } else {

            star.size = 'large';
            star.brightness = 0.85 + random() * 0.15;
        }

        const temperature = random();

        star.color.setHex(
            temperature < 0.2
                ? 0xc5d9ff
                : temperature > 0.85
                    ? 0xffe2bd
                    : 0xffffff
        );

        star.color.multiplyScalar(star.brightness);
    }

    console.log(
        `[NOS] Generated ${stars.length}/${STAR_COUNT} stars in ${attempts} attempts.`
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

        colors[i * 3] = star.color.r;
        colors[i * 3 + 1] = star.color.g;
        colors[i * 3 + 2] = star.color.b;
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

        fog: false,

        toneMapped: false
    });

    return new THREE.Points(
        geometry,
        material
    );
}

// ========================================
// INITIALISE STARFIELD
// ========================================

export function initialiseStarfield(scene, camera) {

    if (!scene || !camera) {

        throw new Error(
            '[NOS] Starfield requires a scene and camera.'
        );
    }

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

    starfield.name = 'NOS_Celestial_Starfield';

    for (const category of Object.keys(groups)) {

        const points = createStarGroup(
            groups[category],
            STAR_SIZES[category]
        );

        if (points) {
            starfield.add(points);
        }
    }

    // Follow the camera's world position.
    // Do NOT attach the starfield to the camera.

    camera.getWorldPosition(starfield.position);

    starfield.rotation.set(0, 0, 0);

    scene.add(starfield);

    console.log(
        '[NOS] Celestial starfield initialised.'
    );

    return starfield;
}

// ========================================
// UPDATE STARFIELD
// ========================================

export function updateStarfield(starfield, camera) {

    if (!starfield || !camera) return;

    // Follow translation only.
    // Camera rotation never affects star positions.

    camera.getWorldPosition(starfield.position);
}
