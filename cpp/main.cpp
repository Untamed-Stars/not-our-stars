
// main.cpp - NOT OUR STARS C++ ENTRY POINT

#include <emscripten.h>

// ========================================
// ARCHITECTURE TEST SIMULATION
// ========================================

static float simulationValue = 0.0f;

// Increase the simulation value.
extern "C" {

EMSCRIPTEN_KEEPALIVE
void updateSimulation(float amount) {
    simulationValue += amount;
}

// Return the current simulation value.
EMSCRIPTEN_KEEPALIVE
float getSimulationValue() {
    return simulationValue;
}

}

// ========================================
// MAIN
// ========================================

int main() {
    simulationValue = 0.0f;
    return 0;
}
