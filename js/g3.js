
// ========================================
// G3 - STARFIELD
// ========================================

const { THREE, scene } = window.NOS;

const starCount = 4000;

const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {

    const i3 = i * 3;

    positions[i3] =
        (Math.random() - 0.5) * 4000;

    positions[i3 + 1] =
        (Math.random() - 0.5) * 4000;

    positions[i3 + 2] =
        (Math.random() - 0.5) * 4000;

}

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    sizeAttenuation: true
});

const stars = new THREE.Points(geometry, material);

scene.add(stars);

window.NOS.stars = stars;

console.log('NOT OUR STARS: G3 ONLINE');
