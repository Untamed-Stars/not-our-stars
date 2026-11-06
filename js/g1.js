
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

    updateSystems: []
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

// ----------------------------------------
// MAIN GAME LOOP
// ----------------------------------------

window.NOS.updateSystems = [];

let previousTime = performance.now();

function animate(now) {

    requestAnimationFrame(animate);

    const dt = Math.min(
        (now - previousTime) / 1000,
        0.05
    );

    previousTime = now;

    for (const update of window.NOS.updateSystems) {
        update(dt);
    }

    renderer.render(scene, camera);

}

requestAnimationFrame(animate);

document.getElementById('status').textContent =
    'SYSTEM ONLINE // EXPLORATION READY';

console.log('NOT OUR STARS: G1 ONLINE');
