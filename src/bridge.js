
// bridge.js - C++ / WEBASSEMBLY COMMUNICATION BRIDGE

let core = null;

// ========================================
// INITIALISATION
// ========================================

export async function initialiseCore() {

    // Load the compiled WebAssembly JavaScript module.
    const modulePath = `${import.meta.env.BASE_URL}wasm/nos_core.js`;

    const { default: createCore } = await import(
        /* @vite-ignore */ modulePath
    );

    // Initialise the C++ module.
    core = await createCore({
        locateFile: (path) =>
            `${import.meta.env.BASE_URL}wasm/${path}`
    });

    console.log('[NOS] WebAssembly core initialised.');

    return true;
}

// ========================================
// SIMULATION COMMUNICATION
// ========================================

export function updateSimulation(amount) {

    if (!core) {
        throw new Error('NOS core has not been initialised.');
    }

    core._updateSimulation(amount);
}

export function getSimulationValue() {

    if (!core) {
        throw new Error('NOS core has not been initialised.');
    }

    return core._getSimulationValue();
}
