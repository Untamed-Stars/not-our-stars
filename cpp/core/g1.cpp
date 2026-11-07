
// ========================================
// NOT OUR STARS
// g1.cpp - ENGINE IMPLEMENTATION
// ========================================

#include "g1.hpp"

// ========================================
// INITIALISATION
// ========================================

bool Engine::initialise() {

    if (running) {
        return true;
    }

    running = true;

    return true;
}

// ========================================
// UPDATE
// ========================================

void Engine::update(float deltaTime) {

    if (!running) {
        return;
    }

    // Game systems will be updated here.
    // World, player, physics, simulation, etc.

}

// ========================================
// SHUTDOWN
// ========================================

void Engine::shutdown() {

    if (!running) {
        return;
    }

    running = false;

}

// ========================================
// STATE
// ========================================

bool Engine::isRunning() const {

    return running;

}
