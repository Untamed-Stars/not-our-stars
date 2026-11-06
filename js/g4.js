
import * as THREE from 'three';

// ========================================
// G4 - STARTING PLANET ENVIRONMENT
// ========================================

const { scene, camera } = window.NOS;

// ----------------------------------------
// ENVIRONMENT
// ----------------------------------------

scene.background = new THREE.Color(0x91b8ca);

scene.fog = new THREE.Fog(
    0x91b8ca,
    100,
    650
);

if (window.NOS.stars) {
    window.NOS.stars.visible = false;
}

// ----------------------------------------
// TERRAIN
// ----------------------------------------

const terrainSize = 1200;
const terrainSegments = 180;

function terrainHeight(x, z) {

    const hills =
        Math.sin(x * 0.018) * 3 +
        Math.cos(z * 0.022) * 3 +
        Math.sin((x + z) * 0.012) * 2;

    const distance = Math.sqrt(x * x + z * z);

    const flatten = Math.min(distance / 40, 1);

    return hills * flatten;
}

const geometry = new THREE.PlaneGeometry(
    terrainSize,
    terrainSize,
    terrainSegments,
    terrainSegments
);

const positions = geometry.attributes.position;

for (let i = 0; i < positions.count; i++) {

    const x = positions.getX(i);
    const z = -positions.getY(i);

    positions.setZ(
        i,
        terrainHeight(x, z)
    );

}

geometry.rotateX(-Math.PI / 2);

geometry.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
    color: 0x778d70,
    roughness: 1,
    metalness: 0
});

const terrain = new THREE.Mesh(
    geometry,
    material
);

terrain.position.set(0, 0, 0);

scene.add(terrain);


// ========================================
// RESOURCE DEPOSITS
// ========================================

const resources = [];

const RESOURCE_TYPES = {

    ferrite: {
        color: 0x929ba4,
        name: "Ferrite"
    },

    copper: {
        color: 0xb97848,
        name: "Copper"
    },

    silica: {
        color: 0x62c5cf,
        name: "Silica"
    }

};

function createResource(type, x, z) {

    const config = RESOURCE_TYPES[type];

    const group = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({
        color: config.color,
        roughness: 0.65,
        metalness: 0.25,
        flatShading: true
    });

    const main = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.5, 1),
        material
    );

    main.position.y = 1.2;
    main.scale.set(1, 1.3, 0.9);

    group.add(main);

    for (let i = 0; i < 3; i++) {

        const crystal = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.8, 0),
            material
        );

        crystal.position.set(
            Math.cos(i * 2.1) * 1.2,
            0.7,
            Math.sin(i * 2.1) * 1.2
        );

        group.add(crystal);
    }

    group.position.set(
        x,
        worldHeight(x, z),
        z
    );

    group.userData = {
        resourceType: type,
        resourceName: config.name,
        amount: 10,
        mined: false
    };

    scene.add(group);

    resources.push(group);

    return group;
}

function worldHeight(x, z) {
    return terrainHeight(x, z);
}

// ----------------------------------------
// GENERATE DEPOSITS
// ----------------------------------------

createResource("ferrite", -12, -8);
createResource("ferrite", 22, -30);
createResource("ferrite", -25, -38);
createResource("ferrite", 35, 30);

createResource("copper", 32, 12);
createResource("copper", -35, 18);
createResource("copper", 42, -45);

createResource("silica", 5, -45);
createResource("silica", -45, -12);
createResource("silica", 48, 40);


// ----------------------------------------
// CAMERA START POSITION
// ----------------------------------------

camera.position.set(0, 1.7, 0);

camera.rotation.set(0, 0, 0);

// ----------------------------------------
// WORLD DATA
// ----------------------------------------

window.NOS.world = {
    name: "UNKNOWN",
    terrain: terrain,
    terrainHeight: terrainHeight,
    resources: resources,
    environment: "planetary"
};

document.getElementById('status').textContent =
    'UNKNOWN PLANET // EXPLORATION READY';

console.log('G4: STARTING PLANET ONLINE');
