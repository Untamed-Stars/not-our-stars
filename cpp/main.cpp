
#include <emscripten.h>

#include "core/g1.hpp"

// ========================================
// NOT OUR STARS
// main.cpp - APPLICATION ENTRY POINT
// ========================================

static Engine engine;

// ========================================
// JAVASCRIPT INTERFACE
// ========================================

extern "C" {

EMSCRIPTEN_KEEPALIVE
bool initialiseEngine() {

    return engine.initialise();

}

EMSCRIPTEN_KEEPALIVE
void updateEngine(float deltaTime) {

    engine.update(deltaTime);

}

EMSCRIPTEN_KEEPALIVE
void shutdownEngine() {

    engine.shutdown();

}

EMSCRIPTEN_KEEPALIVE
bool isEngineRunning() {

    return engine.isRunning();

}

}

// ========================================
// MAIN
// ========================================

int main() {

    engine.initialise();

    return 0;

}
