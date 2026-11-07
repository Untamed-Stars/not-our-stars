
// bridge.js - C++ / WEBASSEMBLY COMMUNICATION BRIDGE

import createCore from '../public/wasm/nos_core.js';

let core = null;

// ========================================
// INITIALISATION
// ========================================

export async function initialiseCore() {
    core = await createCore();

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
