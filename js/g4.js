
// ========================================
// G4 - PLANET SYSTEM
// ========================================

const { THREE, scene } = window.NOS;

const geometry = new THREE.SphereGeometry(
    45,
    96,
    96
);

const material = new THREE.MeshStandardMaterial({
    color: 0x718c9c,
    roughness: 0.95,
    metalness: 0
});

const planet = new THREE.Mesh(
    geometry,
    material
);

planet.position.set(0, 0, -120);

scene.add(planet);

window.NOS.planet = planet;

console.log('NOT OUR STARS: G4 ONLINE');
