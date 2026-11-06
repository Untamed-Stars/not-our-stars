
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// ========================================
// G1 - CORE ENGINE
// ========================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x02040a);

// CAMERA

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

// RENDERER

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.5)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.0;

renderer.domElement.id = 'game-canvas';

document.getElementById('game-root')
    .appendChild(renderer.domElement);

// MAKE GLOBAL SYSTEM AVAILABLE TO OTHER FILES

window.NOS = {
    THREE,
    scene,
    camera,
    renderer
};

// RESIZE

window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// MAIN LOOP

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();

document.getElementById('status').textContent =
    'SYSTEM ONLINE // EXPLORATION READY';

console.log('NOT OUR STARS: G1 ONLINE');
