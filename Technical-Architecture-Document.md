# NOT OUR STARS
## Technical Architecture Document (TAD)

**Project:** Not Our Stars (NOS)  
**Document version:** 2.0  
**Status:** Architecture approved, implementation not yet started  
**Platform:** Browser (desktop-first)  
**Hosting:** GitHub Pages  
**Primary language:** C++  
**Compilation target:** WebAssembly (WASM)

---

# 1. Project Overview

Not Our Stars is a browser-based, large-scale sci-fi exploration and survival game.

The player awakens on an unfamiliar alien planet with amnesia. Their survival suit and multitool still function, but their spacecraft, the **Vanguard**, has crashed and is no longer operational.

The player must explore their surroundings, collect resources, and repair the Vanguard. Once repaired, they can explore the planet's atmosphere, reach orbit, visit other planets, explore space stations, and eventually travel between star systems.

The game is designed around exploration, discovery, survival, crafting, construction, spaceflight, and a substantial main storyline.

The universe should feel enormous, persistent, mysterious, and alive.

## 1.1 Design pillars

1. **Exploration and discovery**
   - Full spherical planets.
   - Multiple biomes and environments.
   - Procedural locations, resources, vegetation, and wildlife.
   - Abandoned structures and points of interest.
   - Multiple planets and star systems.

2. **Survival and resources**
   - Oxygen, health, and environmental hazards.
   - Mineral and plant resource collection.
   - Equipment upgrades for harsher environments.
   - Survival should create meaningful decisions without becoming excessively punishing.

3. **Building and crafting**
   - Modular base construction.
   - Crafting and equipment upgrades.
   - Resource processing and infrastructure.
   - Persistent player-built structures.

4. **Spaceflight and travel**
   - Atmospheric flight.
   - Planet-to-orbit transitions.
   - Spacecraft ownership and upgrades.
   - Physical space stations.
   - Interplanetary and interstellar travel.

5. **Story and atmosphere**
   - A substantial main storyline.
   - Optional discoveries and emergent exploration.
   - A mysterious, peaceful, vast, and occasionally dangerous universe.
   - Story canon will be developed collaboratively rather than invented wholesale during technical implementation.

---

# 2. Technology Stack

## 2.1 Core technologies

| Technology | Responsibility |
|---|---|
| C++ | Main game logic and simulation |
| WebAssembly | Runs compiled C++ in the browser |
| Emscripten | Compiles C++ into WebAssembly |
| JavaScript | Browser integration and communication bridge |
| Three.js | 3D rendering |
| HTML | Page structure |
| CSS | Interface styling |
| Vite | Frontend development and bundling |
| CMake | C++ build configuration |
| GitHub Actions | Automated compilation and deployment |
| GitHub Pages | Game hosting |

**No TypeScript requirement.** The project will use ordinary JavaScript for the browser-facing code.

## 2.2 Language responsibilities

### C++: the game itself

C++ will own the majority of game logic:

- Player movement and simulation.
- Planetary gravity and movement.
- Procedural world generation.
- Terrain and biome calculations.
- Resource systems.
- Inventory and crafting.
- Survival systems.
- Building systems.
- Ship systems and flight simulation.
- Star system generation.
- NPC and wildlife behaviour.
- Combat and damage simulation.
- Mission and gameplay progression.
- Game state and simulation updates.

C++ will be compiled into WebAssembly.

### JavaScript: browser integration

JavaScript will handle functionality that belongs to the browser:

- Keyboard and mouse input collection.
- Browser window and viewport events.
- Initialising the WebAssembly module.
- Communicating between C++ and Three.js.
- Loading and managing browser assets.
- Browser storage and IndexedDB.
- HTML interface interactions.
- Browser audio integration where appropriate.

JavaScript is not intended to become a second game-logic implementation.

### Three.js: visual rendering

Three.js will handle:

- Scene management.
- Cameras.
- Meshes and geometry.
- Materials and textures.
- Lighting.
- Atmospheric effects.
- Water rendering.
- Visual effects.
- Model placement.
- Rendering optimisations.

C++ determines the state of the game. Three.js displays that state.

The C++ code will not directly manipulate the browser DOM or Three.js objects.

## 2.3 C++ and JavaScript communication

A dedicated bridge will connect the WebAssembly module to the browser.

The bridge will follow this general flow:

1. JavaScript collects player input.
2. Input is passed to C++.
3. C++ updates the game simulation.
4. C++ produces updated game state.
5. JavaScript retrieves the updated state.
6. Three.js updates the corresponding visual objects.

Communication should be batched where possible.

For example, the game should not require thousands of individual JavaScript-to-C++ calls to update a large terrain region.

Large collections of data should use efficient arrays or shared buffers where appropriate.

---

# 3. Physics Architecture

## 3.1 Planned physics library

**Candidate: Jolt Physics**

Jolt is a C++ physics library with WebAssembly support.

It is a promising fit for:

- Collision detection.
- Rigid bodies.
- Dynamic objects.
- Character movement.
- Vehicle physics.
- General physical interactions.

The initial implementation must validate that Jolt can be compiled and run correctly through our GitHub Actions build.

## 3.2 Custom planetary physics

A conventional physics engine does not automatically solve all the problems associated with spherical planets.

NOS will need custom planetary logic for:

- Gravity directed towards a planet's centre.
- Player orientation relative to the local surface.
- Walking around a spherical planet.
- Atmospheric flight.
- Planetary transitions.
- Gravity changes between celestial bodies.
- Spaceflight outside planetary gravity.

The architecture will separate general physics from planetary movement and gravity calculations.

## 3.3 Initial limitations

- Single-threaded simulation initially.
- Multithreading may be introduced after the basic engine is stable.
- No unnecessary physics simulation for distant objects.
- Distant entities may use simplified simulation.

---

# 4. Project Architecture

The project will use a modular architecture.

There will be:

- One main application entry point.
- One central game context.
- One central simulation loop.
- Separate systems for different gameplay responsibilities.
- Explicit interfaces between systems.
- A dedicated JavaScript/WebAssembly bridge.

Avoid unstructured global variables and circular dependencies.

## 4.1 Proposed directory structure

```text
not-our-stars/
│
├── index.html
├── style.css
├── package.json
├── vite.config.js
├── CMakeLists.txt
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── src/
│   ├── main.js
│   ├── bridge.js
│   ├── renderer.js
│   ├── input.js
│   └── ui/
│       └── interface.js
│
├── cpp/
│   ├── main.cpp
│   ├── CMakeLists.txt
│   │
│   ├── core/
│   │   ├── g1.cpp
│   │   ├── g1.hpp
│   │   ├── g2.cpp
│   │   └── g2.hpp
│   │
│   ├── world/
│   ├── gameplay/
│   ├── vehicles/
│   ├── space/
│   ├── entities/
│   ├── systems/
│   └── shared/
│
├── public/
│   ├── assets/
│   └── wasm/
│
└── README.md
```

This is a proposed structure, not a requirement to create every directory immediately.

Modules will be introduced as they become necessary.

## 4.2 Numbered source files

C++ source modules will use numbered filenames:

- `g1.cpp`
- `g2.cpp`
- `g3.cpp`

Corresponding header files will use matching names:

- `g1.hpp`
- `g2.hpp`
- `g3.hpp`

Every source file will begin with a comment explaining its purpose.

Example:

```cpp
// g1.cpp - CORE GAME INITIALISATION
```

The numbering system will help keep the project organised as it grows.

---

# 5. Core Engine

The core engine is responsible for coordinating the game.

It will include:

- Game initialisation.
- Game context.
- Simulation timing.
- Main update loop.
- System registration.
- State management.
- Event communication.
- Error handling.

## 5.1 Game context

A central game context will provide controlled access to shared systems.

Conceptually:

```text
GameContext
│
├── World
├── Player
├── Physics
├── Inventory
├── Resources
├── Vehicles
├── Space
├── Entities
├── Events
└── SaveSystem
```

This prevents every module from independently creating its own version of shared state.

## 5.2 Main simulation loop

The engine will use a central update loop.

The loop will coordinate:

1. Input processing.
2. Player updates.
3. Physics simulation.
4. World updates.
5. Entity updates.
6. Gameplay systems.
7. State transfer to the renderer.
8. Rendering.

Simulation updates should use controlled timing rather than depending entirely on variable frame duration.

Rendering and simulation should be separable where appropriate.

---

# 6. World Generation

The universe will be procedural, with persistent deterministic generation.

## 6.1 Star systems

Each star system will have a stable identifier and generation seed.

Systems may contain:

- Stars.
- Planets.
- Moons.
- Asteroid fields.
- Space stations.
- Abandoned locations.
- Other points of interest.

Returning to a previously visited system must reproduce its established configuration.

## 6.2 Planets

Planets must be fully spherical.

Generation must support:

- Multiple biomes.
- Mountains and valleys.
- Oceans and lakes.
- Caves.
- Procedural vegetation.
- Alien wildlife.
- Weather.
- Day/night cycles.
- Environmental hazards.
- Abandoned structures.
- Handcrafted points of interest.

Planet terrain will use a scalable spherical generation approach, with cube-sphere terrain as the initial candidate.

## 6.3 Deterministic generation

Generation must be reproducible.

The same seed and generation rules should produce the same initial world.

Player modifications must persist separately from the original generated world.

Planet and system identifiers must remain stable.

Automatically generated descriptive planet profiles are not required. Names and identifiers are sufficient unless a descriptive system is requested later.

## 6.4 World streaming

The game cannot render and simulate an entire planet or universe at full detail simultaneously.

The world system will use:

- Terrain chunks.
- Level of detail (LOD).
- Frustum culling.
- Distance-based entity updates.
- Instancing.
- Asynchronous loading where appropriate.
- Memory management.

Nearby objects receive more detail and simulation. Distant objects receive simplified representations.

---

# 7. Player and Survival Systems

## 7.1 Player controller

The player must support:

- First-person view.
- Third-person view.
- Walking.
- Running.
- Jumping.
- Falling.
- Terrain-relative movement.
- Planet-relative orientation.
- Interaction.
- Equipment use.

The player must be able to move naturally across spherical planetary surfaces.

## 7.2 Survival suit

The survival suit provides:

- Oxygen.
- Environmental protection.
- Hazard resistance.
- Equipment integration.

The player also has a health system.

Survival should be meaningful without becoming excessively punishing.

## 7.3 Multitool

The multitool is a central gameplay device.

It must support:

- Mining mineral deposits.
- Scanning.
- Combat.
- Resource collection from mineral deposits.
- Resource collection from plants.

Additional functionality and upgrades can be introduced later.

## 7.4 Inventory

Inventory will support:

- Resources.
- Materials.
- Equipment.
- Consumables.
- Upgrades.
- Quest-related items.

The data model should support future multiplayer and ownership systems without implementing multiplayer now.

---

# 8. Resources, Crafting and Building

## 8.1 Resources

Resources include both mineral and plant-derived materials.

They will be used for:

- Repairs.
- Crafting.
- Equipment upgrades.
- Ship upgrades.
- Base construction.
- Infrastructure.

## 8.2 Crafting

Crafting will support:

- Equipment.
- Suit upgrades.
- Multitool upgrades.
- Ship components.
- Construction components.

Recipes and crafting requirements should be data-driven where practical.

## 8.3 Base building

The building system will support:

- Modular structures.
- Construction pieces.
- Placement and rotation.
- Building persistence.
- Resource requirements.
- Future infrastructure systems.

Player-built structures must remain saved when leaving and returning to an area.

---

# 9. Spacecraft and Flight

## 9.1 Vanguard

The Vanguard is the player's initial spacecraft.

The opening progression centres around repairing it.

The ship begins crashed and non-functional.

Repairing it unlocks:

- Atmospheric flight.
- Reaching orbit.
- Exploring the local star system.

## 9.2 Flight simulation

Flight systems must support:

- Atmospheric flight.
- Space flight.
- Planetary gravity.
- Atmospheric effects.
- Ship handling.
- Ship damage.
- Fuel.
- Ship upgrades.

The transition between planetary flight and space should be seamless where technically practical.

## 9.3 Multiple spacecraft

The long-term game will support:

- Multiple player-owned ships.
- Ship purchasing.
- Ship upgrades.
- Ship storage.
- Hangars.
- Larger vessels.
- Freighters.
- Capital ships.

These systems will be introduced progressively.

---

# 10. Star Systems and Interstellar Travel

## 10.1 Planetary systems

The universe will contain many persistent procedural star systems.

Each system may include planets, moons, stations, asteroid fields, and other locations.

Orbits and celestial configurations must remain consistent when revisiting systems.

## 10.2 Interstellar travel

Interstellar travel will require:

- A jump drive.
- Appropriate fuel.
- A valid destination.
- A travel sequence.

The jump drive is a progression gate, not an immediately available ability.

## 10.3 Space stations

Stations must be physical locations.

Players should be able to:

- Approach stations.
- Dock.
- Enter interiors.
- Explore station spaces.
- Trade resources.
- Purchase ships.
- Purchase upgrades.
- Encounter NPCs.
- Discover information and opportunities.

Stations should not simply be menu screens disguised as locations.

## 10.4 Asteroids

Asteroid fields may contain:

- Mineral deposits.
- Resource opportunities.
- Abandoned objects.
- Occasional encounters.

Not every asteroid field should automatically be hostile.

---

# 11. Entities and Artificial Intelligence

The entity system will support:

- Wildlife.
- NPC spacecraft.
- Pirates.
- Police-like organisations.
- Factions.
- Other environmental entities.

NPCs should have appropriate behaviour and levels of simulation depending on their distance and importance.

## 11.1 Combat systems

Combat will be a substantial gameplay system.

It should support:

- Ship weapons.
- Shields.
- Ship damage.
- Equipment upgrades.
- NPC encounters.
- Pirate encounters.
- Police interception.
- Faction conflicts.

Combat difficulty should scale with player progression and location.

Early encounters should not be excessively difficult.

The design should prioritise readable mechanics and interesting decisions rather than punishing difficulty.

---

# 12. Story and Missions

The game will contain a substantial main storyline alongside optional discoveries and emergent exploration.

The opening premise is established:

- The player has amnesia.
- The player awakens on an alien planet.
- The Vanguard has crashed.
- The player must repair the ship.

Further major story details will be developed collaboratively.

The technical architecture must support:

- Main missions.
- Optional missions.
- Discovery records.
- Dialogue.
- Story progression.
- Mission objectives.
- Persistent quest state.

The architecture must not force the story into a rigid linear sequence unless a particular mission requires it.

---

# 13. Rendering and Visual Quality

## 13.1 Rendering technology

Three.js will be the primary rendering library.

WebGL will be the required baseline.

WebGPU may be explored later as an optional enhancement, but the game must not depend on it.

## 13.2 Visual direction

The visual goal is ambitious, atmospheric sci-fi.

The game should prioritise:

- High-quality materials.
- Coherent lighting.
- Detailed environments.
- Atmospheric depth.
- Planetary scale.
- Interesting composition.
- Consistent art direction.

Visual quality must not depend solely on extremely high polygon counts.

## 13.3 Performance

The game should run on modest hardware where practical.

Performance techniques include:

- Level of detail.
- Frustum culling.
- Instancing.
- Terrain chunking.
- Asset streaming.
- Texture budgets.
- Efficient draw calls.
- Distance-based simulation.
- Simplified distant entities.

Performance must be considered during implementation, not added as an afterthought.

---

# 14. Saving and Persistence

The initial game must work without a backend service.

Browser-local saving will be used.

## 14.1 Storage

IndexedDB is the planned browser storage solution.

JavaScript will handle browser storage access, with C++ exposing the game state that needs to be saved.

## 14.2 Saved information

The save system should eventually support:

- Player position.
- Player inventory.
- Player equipment.
- Survival state.
- Planet modifications.
- Built structures.
- Resource collection.
- Discovered locations.
- Ship ownership.
- Ship state.
- Star system discoveries.
- Mission progress.
- Settings.

## 14.3 Persistence design

Generated worlds and player modifications should be stored separately.

The game should avoid saving enormous amounts of redundant procedural data.

Stable identifiers and deterministic generation will allow much of the world to be regenerated when loading a save.

Cloud saving may be considered later. It is not required for the initial implementation.

---

# 15. Future Multiplayer Architecture

Multiplayer is not part of the initial implementation.

However, the architecture should avoid decisions that make future multiplayer unnecessarily difficult.

Considerations include:

- Stable entity identifiers.
- Clear ownership.
- Separated simulation state.
- Explicit events.
- Reproducible world generation.
- Controlled state changes.
- A future networking boundary.

No networking backend or multiplayer server will be built during the initial development phases.

---

# 16. Build and Deployment Pipeline

**The project will use GitHub Actions for all compilation and deployment.**

The user will not need a local terminal, compiler, or Emscripten installation.

## 16.1 Development workflow

The development workflow will be:

1. Create or edit files through GitHub's web interface.
2. Commit changes to the repository.
3. GitHub Actions detects the changes.
4. The workflow installs the required build tools.
5. Emscripten compiles the C++ code into WebAssembly.
6. The frontend is bundled.
7. The final build is deployed to GitHub Pages.
8. The deployed game can be tested in the browser.

## 16.2 Build pipeline

The planned pipeline:

```text
GitHub Repository
       |
       v
GitHub Actions
       |
       v
Install Build Dependencies
       |
       v
Configure CMake + Emscripten
       |
       v
Compile C++ to WebAssembly
       |
       v
Build JavaScript + Three.js
       |
       v
Combine Web Assets
       |
       v
Deploy to GitHub Pages
       |
       v
Browser Game
```

## 16.3 Build requirements

The workflow will need:

- A compatible Emscripten SDK.
- CMake.
- Node.js.
- npm dependencies.
- A frontend build step.
- GitHub Pages deployment configuration.

The exact workflow will be implemented and tested before significant game development begins.

## 16.4 Build outputs

The final deployment will contain:

- HTML.
- CSS.
- JavaScript.
- WebAssembly.
- Required assets.

The browser downloads and runs the compiled WebAssembly module.

GitHub Pages serves the built files. It does not compile the C++ code for each visitor.

---

# 17. Development Phases

Development will be incremental.

Each phase should leave the game in a working state before the next phase begins.

## Phase 1: Build foundation

- Create the repository structure.
- Configure CMake.
- Configure Emscripten.
- Configure Vite.
- Set up GitHub Actions.
- Compile a minimal C++ program into WebAssembly.
- Load the WebAssembly module in the browser.
- Initialise Three.js.
- Confirm C++ and Three.js can communicate.

**Milestone:** a working browser page that runs C++ through WebAssembly and displays a basic Three.js scene.

## Phase 2: Core engine

- Game context.
- Main loop.
- Input bridge.
- Simulation timing.
- Basic player state.
- Renderer integration.
- Initial error handling.

**Milestone:** a controllable player representation in a basic 3D environment.

## Phase 3: Planetary foundation

- Spherical planet generation.
- Terrain chunks.
- Planet-relative gravity.
- Surface movement.
- Camera orientation.
- Basic collision.
- Initial LOD.

**Milestone:** a player can explore a small spherical planet.

## Phase 4: Planet environments

- Biomes.
- Terrain variation.
- Water.
- Vegetation.
- Mineral deposits.
- Day/night cycle.
- Environmental effects.

**Milestone:** a recognisable alien environment with multiple natural features.

## Phase 5: Player gameplay

- Survival suit.
- Oxygen.
- Health.
- Hazards.
- Multitool.
- Mining.
- Plant resource collection.
- Scanning.
- Inventory.

**Milestone:** the player can explore and gather resources.

## Phase 6: Crafting and building

- Crafting recipes.
- Equipment upgrades.
- Construction pieces.
- Placement systems.
- Building persistence.

**Milestone:** the player can use gathered resources to construct and improve equipment.

## Phase 7: Vanguard

- Ship model.
- Ship interaction.
- Repair progression.
- Ship systems.
- Basic flight.
- Atmospheric controls.

**Milestone:** the player can repair and fly the Vanguard.

## Phase 8: Spaceflight

- Planetary atmosphere.
- Orbit.
- Space movement.
- Gravity transitions.
- Ship fuel.
- Ship upgrades.

**Milestone:** the player can travel from the planet surface into space.

## Phase 9: Star systems

- Star generation.
- Planet generation.
- Moons.
- Orbits.
- Asteroid fields.
- System persistence.
- Discovery records.

**Milestone:** the player can explore a persistent star system.

## Phase 10: Stations and spacecraft

- Space stations.
- Docking.
- Station interiors.
- Trading.
- Ship purchasing.
- Additional spacecraft.
- NPC spacecraft.

**Milestone:** the player can interact with a functioning space economy.

## Phase 11: Advanced gameplay

- Factions.
- NPC behaviour.
- Combat.
- Ship damage.
- Police and pirate encounters.
- Advanced upgrades.
- More complex encounters.

**Milestone:** the universe supports a wider range of gameplay activities.

## Phase 12: Story and content

- Main storyline.
- Missions.
- Dialogue.
- Discoveries.
- Points of interest.
- Abandoned locations.
- Additional planets and systems.

**Milestone:** the game has a substantial playable progression.

## Phase 13: Persistence and polish

- Complete save system.
- Performance optimisation.
- Visual improvements.
- Audio.
- Settings.
- Bug fixing.
- Browser compatibility testing.

**Milestone:** a stable, substantially complete game.

## Phase 14: Future expansion

Potential additions:

- More ships.
- Freighters.
- Capital ships.
- Larger stations.
- Additional factions.
- Expanded universe content.
- Multiplayer.

These are future expansions, not requirements for the first playable release.

---

# 18. Development Rules

The following rules apply throughout development.

1. Do not replace existing working systems without a clear reason.
2. Build incrementally and test after each meaningful change.
3. Explain what new code does and why it is needed.
4. Do not introduce large numbers of empty files.
5. Keep modules focused on their responsibilities.
6. Use stable identifiers for persistent objects.
7. Avoid unnecessary global state.
8. Keep C++ as the primary game-logic language.
9. Keep JavaScript focused on browser integration and rendering communication.
10. Preserve the Three.js rendering approach.
11. Every HTML `<section>` must have an ID.
12. Every source file must have a purpose comment at the top.
13. Do not require local terminal commands.
14. Use GitHub Actions for compilation and deployment.
15. Each development phase must leave the project in a testable state.
16. Do not sacrifice the overall game vision just to make early prototypes easier.

---

# 19. Initial Implementation Target

The first implementation must be deliberately small.

It should prove that the architecture works before the game becomes complicated.

The first build must demonstrate:

- GitHub Actions successfully runs.
- C++ compiles through Emscripten.
- WebAssembly loads in the browser.
- JavaScript can call a C++ function.
- C++ can return data to JavaScript.
- Three.js can display a scene.
- The page works through GitHub Pages.

No procedural planets, inventory, ships, or survival systems are required for this milestone.

Once this foundation is working, the project can grow into the full Not Our Stars architecture.

---

**End of Technical Architecture Document**  
**Version 2.0 | 7 November 2026**
