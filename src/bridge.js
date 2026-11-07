
 // ========================================
 // NOT OUR STARS
 // bridge.js - C++ / WEBASSEMBLY BRIDGE
 // ========================================

let core = null;

// ========================================
// INITIALISATION
// ========================================

export async function initialiseCore() {

    const modulePath =
        `${import.meta.env.BASE_URL}wasm/nos_core.js`;

    const { default: createCore } = await import(
        /* @vite-ignore */ modulePath
    );

    core = await createCore({
        locateFile: (path) =>
            `${import.meta.env.BASE_URL}wasm/${path}`
    });

    console.log('[NOS] WebAssembly core initialised.');

    return true;
}

// ========================================
// ENGINE FUNCTIONS
// ========================================

export function initialiseEngine() {

    if (!core) {
        throw new Error('NOS core has not been initialised.');
    }

    return core._initialiseEngine();
}

export function updateEngine(deltaTime) {

    if (!core) {
        throw new Error('NOS core has not been initialised.');
    }

    core._updateEngine(deltaTime);
}

export function shutdownEngine() {

    if (!core) return;

    core._shutdownEngine();
}

export function isEngineRunning() {

    if (!core) return false;

    return core._isEngineRunning();
}

// ========================================
// TEMPORARY LEGACY COMPATIBILITY
// ========================================

export function updateSimulation() {
    // Removed. The application will use updateEngine().
}

export function getSimulationValue() {
    return 0;
}
