
#pragma once

// ========================================
// NOT OUR STARS
// g1.hpp - ENGINE DECLARATIONS
// ========================================

class Engine {

public:

    // Initialise the engine.
    bool initialise();

    // Update the engine.
    void update(float deltaTime);

    // Shut down the engine.
    void shutdown();

    // Check whether the engine is running.
    bool isRunning() const;

private:

    bool running = false;

};
