
// ========================================
// G4 - STARTING PLANET
// ========================================

const { THREE, scene } = window.NOS;

// ----------------------------------------
// PLANET CONFIGURATION
// ----------------------------------------

const PLANET = {
    name: "UNKNOWN",
    terrainSize: 600,
    terrainSegments: 160,
    centerZ: -100
};

// ----------------------------------------
// ATMOSPHERE
// ----------------------------------------

scene.background = new THREE.Color(0x91b8ca);

scene.fog = new THREE.Fog(
    0x91b8ca,
    100,
    480
);

// Hide stars while on the planet.

if (window.NOS.stars) {
    window.NOS.stars.visible = false;
}

// ----------------------------------------
// TERRAIN HEIGHT
// ----------------------------------------

function terrainHeight(x, z) {

    const dx = x;
    const dz = z - 10;

    const distance = Math.sqrt(
        dx * dx + dz * dz
    );

    // Flatten the starting area.

    let blend = Math.min(distance / 38, 1);

    blend = blend * blend * (3 - 2 * blend);

    const hills =
        Math.sin(x * 0.025) * 2.2 +
        Math.cos(z * 0.018) * 2.8 +
        Math.sin((x + z) * 0.012) * 3.0;

    return hills * blend;
}

// ----------------------------------------
// TERRAIN GENERATION
// ----------------------------------------

function createTerrain() {

    const geometry = new THREE.PlaneGeometry(
        PLANET.terrainSize,
        PLANET.terrainSize,
        PLANET.terrainSegments,
        PLANET.terrainSegments
    );

    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {

        const x = positions.getX(i);
        const localY = positions.getY(i);

        const worldZ = PLANET.centerZ - localY;

        const height = terrainHeight(x, worldZ);

        positions.setZ(i, height);
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

    terrain.position.z = PLANET.centerZ;

    scene.add(terrain);

    return terrain;
}

const terrain = createTerrain();

// ----------------------------------------
// RESOURCE DEPOSITS
// ----------------------------------------

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
        emissive: config.color,
        emissiveIntensity: 0.08,
        flatShading: true
    });

    // Main mineral deposit.

    const main = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.5, 1),
        material
    );

    main.position.y = 1.2;

    main.scale.set(1, 1.3, 0.9);

    group.add(main);

    // Smaller mineral formations.

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
        terrainHeight(x, z),
        z
    );

    group.userData = {
        resourceType: type,
        resourceName: config.name,
        amount: 10,
        mined: false
    };

    group.traverse(object => {
        if (object.isMesh) {
            object.userData.resourceNode = group;
        }
    });

    scene.add(group);

    resources.push(group);

    return group;
}

// Ferrite deposits.

createResource("ferrite", -12, -8);
createResource("ferrite", 22, -30);
createResource("ferrite", -25, -38);
createResource("ferrite", 35, 30);

// Copper deposits.

createResource("copper", 32, 12);
createResource("copper", -35, 18);
createResource("copper", 42, -45);

// Silica deposits.

createResource("silica", 5, -45);
createResource("silica", -45, -12);
createResource("silica", 48, 40);

// ----------------------------------------
// WORLD DATA
// ----------------------------------------

window.NOS.world = {

    name: PLANET.name,

    terrain,
    terrainHeight,

    resources,

    environment: "planetary"

};

document.getElementById('status').textContent =
    'UNKNOWN PLANET // SHIP SYSTEMS OFFLINE';

console.log("NOT OUR STARS: STARTING PLANET GENERATED");
