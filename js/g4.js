
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
    environment: "planetary"
};

document.getElementById('status').textContent =
    'UNKNOWN PLANET // EXPLORATION READY';

console.log('G4: STARTING PLANET ONLINE');
