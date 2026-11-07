
 // ========================================
 // NOT OUR STARS
 // main.js - APPLICATION ENTRY POINT
 // ========================================

import {
    initialiseCore,
    initialiseEngine,
    updateEngine
} from './bridge.js';

import {
    initialiseRenderer,
    updateRenderer
} from './renderer.js';

// ========================================
// APPLICATION STATE
// ========================================

let lastFrame = 0;
let running = false;

// ========================================
// INITIALISATION
// ========================================

async function initialiseGame() {

    const loadingStatus =
        document.getElementById('loading-status');

    const loadingScreen =
        document.getElementById('loading-screen');

    const canvasContainer =
        document.getElementById('game-canvas');

    try {

        loadingStatus.textContent = 'Loading C++ core...';

        await initialiseCore();

        loadingStatus.textContent = 'Starting engine...';

        initialiseEngine();

        loadingStatus.textContent = 'Initialising renderer...';

        initialiseRenderer(canvasContainer);

        running = true;
        lastFrame = performance.now();

        loadingScreen.classList.add('hidden');

        console.log('[NOS] Engine running.');

        requestAnimationFrame(gameLoop);

    } catch (error) {

        console.error(
            '[NOS] INITIALISATION FAILED:',
            error
        );

        loadingStatus.textContent =
            'Engine initialisation failed. Check console.';
    }
}

// ========================================
// MAIN GAME LOOP
// ========================================

function gameLoop(now) {

    if (!running) return;

    requestAnimationFrame(gameLoop);

    const deltaTime = Math.min(
        (now - lastFrame) / 1000,
        0.05
    );

    lastFrame = now;

    // Update C++ engine
    updateEngine(deltaTime);

    // Update visual renderer
    updateRenderer(deltaTime, 0);
}

// ========================================
// START
// ========================================

initialiseGame();
