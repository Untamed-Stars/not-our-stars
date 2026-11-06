
// ========================================
// G2 - LIGHTING
// ========================================

const { THREE, scene } = window.NOS;

const ambientLight = new THREE.HemisphereLight(
    0xaac9e8,
    0x10121c,
    0.65
);

scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

sunLight.position.set(-100, 60, 80);

scene.add(sunLight);

console.log('NOT OUR STARS: G2 ONLINE');
