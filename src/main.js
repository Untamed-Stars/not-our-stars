
// main.js - NOT OUR STARS APPLICATION ENTRY POINT

import {
    initialiseCore,
    updateSimulation,
    getSimulationValue
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

    const loadingStatus = document.getElementById('loading-status');
    const loadingScreen = document.getElementById('loading-screen');
    const canvasContainer = document.getElementById('game-canvas');

    try {

        loadingStatus.textContent = 'Loading C++ core...';

        await initialiseCore();

        loadingStatus.textContent = 'Initialising renderer...';

        initialiseRenderer(canvasContainer);

        loadingStatus.textContent = 'Starting simulation...';

        // Initial C++ simulation update
        updateSimulation(5);

        running = true;
        lastFrame = performance.now();

        // Hide loading screen
        loadingScreen.classList.add('hidden');

        console.log('[NOS] Architecture test running.');

        requestAnimationFrame(gameLoop);

    } catch (error) {

        console.error('[NOS] INITIALISATION FAILED:', error);

        loadingStatus.textContent = 'Engine initialisation failed. Check console.';
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

    // Read simulation state from C++
    const simulationValue = getSimulationValue();

    // Update visual representation
    updateRenderer(deltaTime, simulationValue);
}

// ========================================
// START
// ========================================

initialiseGame();
