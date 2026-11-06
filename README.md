# NOT OUR STARS
## Technical Architecture Document (TAD)

**Version:** 1.0  
**Date:** 7 November 2026  
**Engine:** Three.js  
**Language:** TypeScript  
**Build System:** Vite  
**Physics:** Rapier.js + custom physics  
**Platform:** Browser / GitHub Pages  
**Project Status:** Architecture design

---

# 1. Architectural Overview

## 1.1 Project Goal

Not Our Stars (NOS) is a browser-based procedural sci-fi exploration and survival game.

The architecture must support a substantial game with planetary exploration, survival, crafting, construction, spaceflight, interstellar travel, spacecraft ownership, combat, NPCs, factions, and a substantial storyline.

The game must be designed as one interconnected experience rather than a collection of disconnected demonstrations.

## 1.2 Core Technology

| Technology | Responsibility |
|---|---|
| TypeScript | Main programming language |
| Three.js | Rendering and 3D scene management |
| WebGL | Primary supported rendering backend |
| Vite | Development server and production builds |
| Rapier.js | Rigid-body physics |
| IndexedDB | Local save persistence |
| Web Audio API | Audio playback and spatial audio |
| Web Workers | Background procedural generation |
| HTML/CSS | Interface and HUD |

WebGPU may be considered later, but WebGL remains the required rendering path.

## 1.3 Architectural Philosophy

The project follows these principles:

1. Modular systems with explicit responsibilities.
2. One central application entry point.
3. One central game loop.
4. Shared context rather than uncontrolled globals.
5. Deterministic procedural generation.
6. Persistent world identity.
7. Performance-conscious rendering.
8. Multiplayer-aware architecture without premature networking.
9. Incremental development with a working project at every phase.

---

# 2. Project Structure

The project uses numbered TypeScript modules grouped by responsibility.

The numbered naming convention is retained throughout the project.

## 2.1 Root Structure

```text
not-our-stars/
│
├── index.html
├── style.css
├── main.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
│
├── public/
│   ├── assets/
│   │   ├── textures/
│   │   ├── models/
│   │   ├── audio/
│   │   └── fonts/
│   │
│   └── icons/
│
└── src/
    │
    ├── core/
    │   ├── g1.ts
    │   ├── g2.ts
    │   ├── g3.ts
    │   ├── g4.ts
    │   └── g5.ts
    │
    ├── world/
    │   ├── g6.ts
    │   ├── g7.ts
    │   ├── g8.ts
    │   ├── g9.ts
    │   ├── g10.ts
    │   ├── g11.ts
    │   ├── g12.ts
    │   └── g13.ts
    │
    ├── gameplay/
    │   ├── g14.ts
    │   ├── g15.ts
    │   ├── g16.ts
    │   ├── g17.ts
    │   ├── g18.ts
    │   ├── g19.ts
    │   └── g20.ts
    │
    ├── vehicles/
    │   ├── g21.ts
    │   ├── g22.ts
    │   ├── g23.ts
    │   └── g24.ts
    │
    ├── space/
    │   ├── g25.ts
    │   ├── g26.ts
    │   ├── g27.ts
    │   └── g28.ts
    │
    ├── entities/
    │   ├── g29.ts
    │   ├── g30.ts
    │   ├── g31.ts
    │   └── g32.ts
    │
    ├── systems/
    │   ├── g33.ts
    │   ├── g34.ts
    │   ├── g35.ts
    │   ├── g36.ts
    │   ├── g37.ts
    │   ├── g38.ts
    │   └── g39.ts
    │
    ├── ui/
    │   ├── g40.ts
    │   ├── g41.ts
    │   └── g42.ts
    │
    └── shared/
        ├── types.ts
        ├── constants.ts
        ├── interfaces.ts
        └── utilities.ts
```

The directory structure is the planned architecture. Files will be created as their responsibilities become necessary rather than generating dozens of empty modules immediately.

## 2.2 File Responsibilities

### Core

| File | Responsibility |
|---|---|
| g1.ts | Core engine, application initialization and lifecycle |
| g2.ts | Three.js renderer, cameras and scene management |
| g3.ts | Lighting, atmosphere and visual environment |
| g4.ts | Input management and control bindings |
| g5.ts | Player controller, movement and physics |

### World Generation

| File | Responsibility |
|---|---|
| g6.ts | Procedural generation, seeds and deterministic randomization |
| g7.ts | Spherical planetary terrain |
| g8.ts | Biomes, oceans, lakes, weather and environmental conditions |
| g9.ts | Mineral deposits and resource nodes |
| g10.ts | Procedural vegetation |
| g11.ts | Alien wildlife |
| g12.ts | Structures, caves and points of interest |
| g13.ts | World streaming, chunks and level of detail |

### Gameplay

| File | Responsibility |
|---|---|
| g14.ts | Inventory and item management |
| g15.ts | Resource collection and multitool |
| g16.ts | Oxygen, health and survival |
| g17.ts | Crafting and upgrades |
| g18.ts | Modular construction and base building |
| g19.ts | Missions, objectives and progression |
| g20.ts | Story, dialogue and narrative events |

### Vehicles

| File | Responsibility |
|---|---|
| g21.ts | Ship definitions, ownership and Vanguard |
| g22.ts | Flight controls and atmospheric flight |
| g23.ts | Spacecraft weapons, shields and damage |
| g24.ts | Ship upgrades, hangars and larger spacecraft |

### Space

| File | Responsibility |
|---|---|
| g25.ts | Star systems and deterministic system generation |
| g26.ts | Planets, orbital arrangements and celestial bodies |
| g27.ts | Space stations, docking and interiors |
| g28.ts | Interstellar navigation and jump drives |

### Entities

| File | Responsibility |
|---|---|
| g29.ts | Shared entity identity and lifecycle |
| g30.ts | NPC spacecraft and AI |
| g31.ts | Pirates, police and faction behavior |
| g32.ts | Asteroids and other space entities |

### General Systems

| File | Responsibility |
|---|---|
| g33.ts | Save management and persistence |
| g34.ts | Audio and spatial sound |
| g35.ts | Asset loading and caching |
| g36.ts | Performance monitoring and optimization |
| g37.ts | Event management and communication |
| g38.ts | Settings and configuration |
| g39.ts | Future multiplayer foundations |

### Interface

| File | Responsibility |
|---|---|
| g40.ts | HUD and gameplay interface |
| g41.ts | Menus, inventory and interaction interfaces |
| g42.ts | Galaxy map, navigation and star charts |

---

# 3. Core Engine Architecture

## 3.1 Entry Point

`main.ts` is the only application entry point.

It initializes the core engine and starts the application.

Subsystems must not independently initialize competing application loops.

The dependency structure is:

```text
main.ts
   |
   v
g1.ts (Core Engine)
   |
   +---- g2.ts (Rendering)
   |
   +---- g3.ts (Environment)
   |
   +---- g4.ts (Input)
   |
   +---- g5.ts (Player)
   |
   +---- Other Systems
```

The core engine owns the lifecycle of the game.

## 3.2 Shared Game Context

A shared `GameContext` interface provides access to resources needed across systems.

Conceptually:

```ts
interface GameContext {
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;

    input: InputManager;
    player: PlayerController;

    world: WorldManager;
    events: EventManager;
    saves: SaveManager;

    clock: THREE.Clock;
}
```

This is an architectural illustration. The final interface will be introduced incrementally as the systems are implemented.

Systems receive their dependencies explicitly.

Avoid accessing arbitrary global variables to retrieve game state.

## 3.3 Central Update Loop

The game has one animation loop.

The core engine calls the relevant systems in a controlled order.

Proposed update sequence:

1. Process input.
2. Update player movement.
3. Update physics.
4. Update nearby world systems.
5. Update survival.
6. Update wildlife and NPCs.
7. Update vehicles.
8. Process game events.
9. Update interface.
10. Render the scene.

Use delta time to keep movement and simulation consistent across different frame rates.

Physics should use a fixed timestep with an accumulator where appropriate.

Rendering and simulation must be separated.

---

# 4. Rendering Architecture

## 4.1 Three.js

Three.js handles:

- Scene management.
- Cameras.
- Meshes and geometry.
- Materials.
- Lighting.
- Textures.
- Atmospheric effects.
- Planet rendering.
- Space environments.

Use physically based materials where appropriate.

The visual target is polished, atmospheric sci-fi rather than basic low-detail browser graphics.

## 4.2 Camera System

The game supports:

- First-person perspective.
- Third-person perspective.
- Vehicle cameras.
- Optional cinematic cameras.

Camera changes must not reset player state or break movement.

## 4.3 WebGL Compatibility

WebGL is the required rendering backend.

Initialization must check browser support and provide a useful error screen if the renderer cannot initialize.

WebGPU may eventually become an optional rendering enhancement.

## 4.4 Lighting

Lighting responsibilities belong primarily to g3.ts.

The system should support:

- Planetary sunlight.
- Atmospheric scattering.
- Ambient illumination.
- Dynamic local lights.
- Space station lighting.
- Interior lighting.
- Day/night transitions.

Use carefully selected shadow distances and resolutions.

Avoid rendering unnecessary dynamic lights or shadows.

---

# 5. Physics Architecture

## 5.1 Hybrid Physics

The project uses Rapier.js alongside custom physics.

Rapier is responsible for interactions that benefit from a rigid-body physics engine.

Custom physics handles systems that require greater control or are simpler to implement directly.

## 5.2 Rapier Responsibilities

Potential applications:

- Rigid-body interactions.
- Physical objects.
- Collisions.
- Dropped objects.
- Movable structures.
- Ship interactions where appropriate.

## 5.3 Custom Physics Responsibilities

Potential applications:

- Planetary gravity.
- Character locomotion.
- Planet-relative movement.
- Atmospheric flight.
- Spaceflight.
- Camera movement.

## 5.4 Planetary Gravity

Gravity must be calculated relative to the planet.

For a spherical planet:

```text
gravity direction = normalize(planet center - player position)
```

The player must remain oriented relative to the local planetary surface.

Movement must work consistently regardless of where the player is standing on the sphere.

Avoid assuming that world Y is always up.

## 5.5 Physics Boundaries

The two physics approaches must have clearly defined ownership.

Do not simulate the same object independently in Rapier and custom physics.

Conversions between coordinate systems must be explicit.

---

# 6. Procedural World Generation

## 6.1 Deterministic Generation

Procedural generation must be reproducible.

Each star system and planet receives a stable seed.

The same seed and generation configuration must produce the same underlying world.

Use seeded random number generators rather than uncontrolled calls to Math.random() for persistent world generation.

## 6.2 Generation Hierarchy

```text
Universe
  |
  +-- Star System
        |
        +-- Star
        |
        +-- Planet A
        |     |
        |     +-- Terrain
        |     +-- Biomes
        |     +-- Vegetation
        |     +-- Wildlife
        |     +-- Resources
        |     +-- Structures
        |
        +-- Planet B
        |
        +-- Planet C
        |
        +-- Space Stations
        |
        +-- Asteroid Fields
```

A star system must retain its identity between visits.

Its planets, stations and orbital arrangements must not be regenerated randomly each time.

## 6.3 Planetary Terrain

Planets use spherical terrain generation.

The initial implementation should use a cube-sphere approach.

A cube-sphere begins with six cube faces and projects their vertices onto a sphere.

This provides a convenient foundation for:

- Planetary terrain patches.
- Chunk-based rendering.
- LOD.
- Surface coordinates.
- Procedural terrain displacement.

Terrain generation should combine multiple noise scales.

Large-scale noise establishes continents and mountain ranges.

Smaller-scale noise introduces local terrain variation.

Avoid relying on a single noise layer.

## 6.4 Planetary Features

The architecture must support:

- Multiple biomes.
- Mountains.
- Oceans.
- Lakes.
- Caves.
- Procedural vegetation.
- Alien wildlife.
- Weather.
- Day/night cycles.
- Environmental hazards.
- Abandoned structures.

Not all features need to exist during the initial terrain implementation.

## 6.5 Biomes

Biomes are assigned using environmental parameters.

Potential parameters include:

- Elevation.
- Temperature.
- Moisture.
- Latitude.
- Environmental conditions.

Each biome defines its own vegetation, resource distribution, wildlife possibilities and environmental characteristics.

Do not make automatically generated descriptive planet text a required feature.

---

# 7. World Streaming and Performance

## 7.1 Planetary Streaming

Rendering an entire planet at maximum detail is impractical.

The world should load and unload terrain based on player proximity and visibility.

Use:

- Terrain patches.
- Chunk management.
- Frustum culling.
- Distance-based LOD.
- Instanced vegetation.
- Cached generated data.

## 7.2 LOD

Level of detail determines how much geometry is used for a given distance.

Nearby terrain receives more detail.

Distant terrain uses simplified representations.

LOD transitions should minimize visible popping and gaps.

## 7.3 Background Generation

Expensive procedural generation should be moved to Web Workers when practical.

Workers can generate terrain data, placement data and other independent procedural results.

Three.js scene objects remain managed by the main thread unless a specific transferable or offscreen rendering approach is introduced.

## 7.4 Performance Priorities

Prioritize:

1. Stable frame rate.
2. Responsive controls.
3. Predictable memory use.
4. Smooth streaming.
5. Visual fidelity.

Avoid generating large amounts of geometry or running expensive calculations every frame without a reason.

---

# 8. Player and Gameplay Systems

## 8.1 Player

The player system must support:

- First-person and third-person views.
- Planet-relative movement.
- Jumping.
- Environmental interaction.
- Vehicle interaction.
- Health.
- Oxygen.
- Equipment.

## 8.2 Multitool

The multitool is a central gameplay system.

It must support:

- Mining mineral deposits.
- Scanning.
- Combat.
- Collecting mineral resources.
- Collecting plant resources.

Tools and upgrades can improve its capabilities.

## 8.3 Resources

Resources are shared between:

- Ship repairs.
- Crafting.
- Equipment upgrades.
- Base construction.
- Other progression systems.

Resources should have stable identifiers.

Inventory systems should not rely on displayed item names as identifiers.

## 8.4 Survival

Survival systems include:

- Oxygen.
- Health.
- Environmental hazards.

The system should support environmental difficulty without turning exploration into an excessively punishing experience.

## 8.5 Building

Base construction should use modular components.

Building pieces must have stable identities and persistent placement data.

The architecture should support future construction expansion.

---

# 9. Spaceflight and Star Systems

## 9.1 Atmospheric Flight

Atmospheric flight is initially unlocked by repairing Vanguard.

The flight system must account for:

- Planetary gravity.
- Atmospheric drag.
- Ship acceleration.
- Orientation.
- Flight controls.

## 9.2 Space Transition

The transition from planetary surface to orbit should be seamless where practical.

The player should not encounter an arbitrary loading screen simply because the ship crossed an atmospheric boundary.

Planetary rendering and space rendering should cooperate through the world streaming system.

## 9.3 Star Systems

Each system contains a persistent collection of:

- Stars.
- Planets.
- Orbital arrangements.
- Space stations.
- Asteroid fields.

System definitions must be reproducible from stable identifiers and seeds.

## 9.4 Interstellar Travel

Interstellar travel requires a jump drive.

The jump drive consumes fuel.

It is a progression-gated system rather than an ability available immediately.

---

# 10. Ships and Space Activities

## 10.1 Ship Architecture

Ships should use shared interfaces and definitions.

Each ship should have:

- A stable ID.
- A ship type.
- Hull state.
- Shield state.
- Installed equipment.
- Ownership information.
- Flight characteristics.

## 10.2 Ship Types

The architecture should eventually support:

- Small spacecraft.
- Exploration ships.
- Freighters.
- Capital ships.

Vanguard is the initial player spacecraft.

## 10.3 Space Stations

Stations are physical locations.

The player must be able to:

1. Approach a station.
2. Dock.
3. Enter its interior.
4. Explore.
5. Trade resources.
6. Purchase ships.
7. Purchase upgrades.

Station interiors should use the same general entity and interaction architecture as other game locations.

## 10.4 Asteroids

Asteroid fields should support:

- Procedural asteroid placement.
- Resource deposits.
- Mining.
- Navigation.
- Potential pirate encounters.

Not every asteroid field should automatically contain hostile entities.

---

# 11. Combat and AI

## 11.1 Combat

The combat architecture supports:

- Ship weapons.
- Shields.
- Hull damage.
- Damage states.
- Equipment upgrades.
- NPC encounters.

Combat difficulty should scale with progression and location.

Early gameplay should not be excessively combat-heavy.

## 11.2 NPCs and Factions

NPC entities should share a common entity foundation.

Different AI types can implement their own behavior.

Examples include:

- Civilian spacecraft.
- Traders.
- Pirates.
- Police-like entities.
- Faction spacecraft.

## 11.3 AI Architecture

AI should be divided into manageable systems.

Potential components:

- Perception.
- Navigation.
- Decision-making.
- Combat behavior.
- Faction relationships.

Avoid giving every NPC an expensive independent simulation when it is far away.

Use distance-based simulation detail.

---

# 12. Persistence and Saving

## 12.1 Local Saves

The first save system uses browser-local persistence.

IndexedDB is the preferred foundation because the game may eventually store substantial amounts of data.

## 12.2 Save Data

Save data should include:

- Player state.
- Inventory.
- Ship ownership.
- Ship condition.
- Equipment.
- Discovered systems.
- Generated world seeds.
- Persistent world changes.
- Base construction.
- Mission progress.
- Story progress.

## 12.3 Persistent Identity

Every important persistent object requires a stable identifier.

Examples:

- Star systems.
- Planets.
- Stations.
- Ships.
- Structures.
- Entities.

Generated content should not need to be stored in full when it can be reproduced from a seed.

Store modifications and important state changes separately.

## 12.4 Save Versioning

Save files must include a version identifier.

Future changes to data structures may require migration.

Do not assume older saves will always match the newest interfaces.

---

# 13. Multiplayer Readiness

Multiplayer is not part of the initial implementation.

However, the architecture should avoid making future multiplayer unnecessarily difficult.

Consider:

- Stable entity IDs.
- Explicit ownership.
- Separated player and world state.
- Predictable entity lifecycle.
- Serializable game state.
- Clear system boundaries.

Do not build a networking backend prematurely.

The initial game must work entirely without a server.

---

# 14. Interface Architecture

The interface uses HTML and CSS alongside the Three.js rendering canvas.

The interface must support:

- Main menu.
- HUD.
- Inventory.
- Multitool selection.
- Survival indicators.
- Crafting.
- Building.
- Ship interfaces.
- Galaxy map.
- Settings.
- Mission objectives.

The interface should remain separate from world simulation.

HTML sections must have IDs.

Interface elements should communicate with gameplay systems through controlled interfaces and events.

---

# 15. Event Architecture

Use a centralized event system for communication between loosely coupled systems.

Examples:

```text
resource:collected
player:damaged
player:entered-vehicle
ship:repaired
ship:destroyed
planet:discovered
system:entered
station:docked
mission:completed
inventory:changed
```

Events should carry typed payloads.

Avoid using events for every operation.

Direct method calls are appropriate when one system has an explicit dependency on another.

The event system is intended to reduce unnecessary coupling, not replace all communication.

---

# 16. Audio Architecture

The audio system uses Web Audio API capabilities.

Support:

- Environmental ambience.
- Wildlife sounds.
- Player movement.
- Tool effects.
- Ship engines.
- Weapons.
- Station ambience.
- Spatial audio.

Audio should respond to the environment and player position.

Audio assets should be loaded through the shared asset management system.

---

# 17. Development and Build Pipeline

## 17.1 Vite

Vite is recommended for development and production builds.

It provides:

- TypeScript module processing.
- Development server.
- Fast iteration.
- Production bundling.
- Asset handling.

TypeScript will be checked using `tsc --noEmit` alongside Vite builds.

## 17.2 GitHub Pages

The project is intended to be deployed on GitHub Pages.

The build configuration must account for the repository's deployment path.

Production output will be generated into the `dist/` directory.

The `dist/` directory is deployed rather than the raw TypeScript source.

## 17.3 Development Workflow

Every meaningful implementation step should:

1. Introduce a coherent system.
2. Explain the architecture.
3. Explain the code.
4. Integrate it with existing modules.
5. Run a TypeScript check.
6. Run a production build.
7. Test the result in the browser.

Avoid introducing large untested changes across many files.

---

# 18. Integrated Development Phases

The game will be developed in phases.

Each phase should leave a working project.

## Phase 1: Foundation

- Vite and TypeScript setup.
- Three.js initialization.
- WebGL compatibility checks.
- Central engine.
- Rendering loop.
- Input management.
- Basic interface.

**Milestone:** A functioning 3D application running in the browser.

## Phase 2: Player and Planet

- Player controller.
- Planet-relative movement.
- Hybrid physics foundation.
- Spherical planet.
- Basic terrain generation.
- First-person and third-person cameras.

**Milestone:** The player can explore a procedurally generated spherical planet.

## Phase 3: Planetary Environment

- Terrain LOD.
- World streaming.
- Biomes.
- Lighting.
- Atmosphere.
- Water.
- Vegetation.
- Mineral deposits.

**Milestone:** A visually convincing and explorable alien planet.

## Phase 4: Gameplay Foundation

- Multitool.
- Scanning.
- Mining.
- Resource collection.
- Inventory.
- Oxygen.
- Health.
- Environmental hazards.

**Milestone:** The player can explore, gather resources and survive.

## Phase 5: Vanguard

- Ship model.
- Ship interaction.
- Repair requirements.
- Repair progression.
- Atmospheric flight.

**Milestone:** The player can repair Vanguard and fly around the planet.

## Phase 6: Spaceflight

- Planetary ascent.
- Orbital environment.
- Space navigation.
- Spacecraft handling.
- Celestial bodies.

**Milestone:** The player can leave the planet and explore space.

## Phase 7: Star Systems

- Deterministic system generation.
- Multiple planets.
- Orbital arrangements.
- Space stations.
- Asteroid fields.
- Jump drive.
- Fuel.

**Milestone:** Persistent star systems and interstellar travel.

## Phase 8: Stations and Ships

- Physical station interiors.
- Docking.
- Trading.
- Ship purchases.
- Ship upgrades.
- Multiple ship ownership.
- Hangars and freighters.

**Milestone:** A functioning space-based economy and ship ownership system.

## Phase 9: Advanced Gameplay

- Crafting.
- Equipment upgrades.
- Base building.
- Wildlife.
- NPCs.
- Factions.
- Combat.
- Ship damage.

**Milestone:** The major gameplay systems operate together.

## Phase 10: Story and Content

- Main storyline.
- Missions.
- Dialogue.
- Abandoned structures.
- Discoveries.
- Narrative progression.
- World events.

**Milestone:** A substantial playable narrative experience.

## Phase 11: Persistence and Polish

- Full save system.
- Performance optimization.
- Audio.
- Visual improvements.
- Settings.
- UI refinement.
- Testing.

**Milestone:** A polished single-player game.

## Phase 12: Multiplayer Expansion

- Networking architecture.
- Synchronization.
- Multiplayer entity authority.
- Shared world state.
- Multiplayer persistence.

**Milestone:** Multiplayer functionality, subject to a separately designed networking architecture.

---

# 19. Technical Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Browser performance | LOD, culling, instancing and streaming |
| Large planetary coordinates | Planet-relative coordinate systems and floating origins |
| Procedural generation costs | Web Workers and cached generation |
| Memory consumption | Asset budgets and controlled unloading |
| Planetary terrain seams | Consistent cube-sphere patch boundaries |
| Physics complexity | Clearly separated physics responsibilities |
| Persistent world data | Stable seeds, IDs and save versioning |
| Large project complexity | Modular architecture and incremental integration |
| GitHub Pages limitations | Static production build and local persistence |
| Multiplayer expansion | Stable entity identity and serializable state |

## 19.1 Large World Coordinates

Floating-point precision becomes a concern when dealing with enormous distances.

Use local coordinate frames.

Planetary environments should use coordinates relative to their parent planet.

Space environments should use an appropriate hierarchical coordinate system.

A floating-origin approach can be introduced when necessary to keep the active scene near the origin.

Do not attempt to represent the entire universe as one enormous Three.js scene.

## 19.2 Rendering Budget

Not every object should receive maximum detail.

Use:

- Instanced meshes.
- Texture atlases where appropriate.
- Geometry reuse.
- LOD.
- Occlusion and frustum culling.
- Controlled shader complexity.
- Texture resolution budgets.

## 19.3 Scope Management

The full game vision is ambitious.

The solution is not to permanently reduce the game to a tiny prototype.

Instead, develop a coherent foundation that can support the full vision while introducing features in testable stages.

---

# 20. Final Architectural Decisions

The following decisions are established:

| Area | Decision |
|---|---|
| Language | TypeScript |
| Rendering | Three.js |
| Rendering fallback | WebGL |
| Build tooling | Vite |
| Physics | Rapier.js + custom |
| World generation | Deterministic procedural generation |
| Planet model | Full spherical planets |
| Terrain | Cube-sphere foundation |
| Save system | IndexedDB |
| Initial backend | None required |
| Deployment | GitHub Pages |
| Multiplayer | Future expansion |
| Architecture | Modular |
| Engine loop | Centralized |
| File naming | Numbered g1.ts, g2.ts, etc. |
| Development | Incremental and integrated |

---

# 21. Next Implementation Step

Once this architecture is approved, begin Phase 1.

The first implementation should establish:

1. The project directory.
2. Vite configuration.
3. TypeScript configuration.
4. HTML entry point.
5. Main application entry point.
6. Core engine (`g1.ts`).
7. Rendering system (`g2.ts`).

The first milestone is a functioning browser-based 3D application with a clean architectural foundation.

No gameplay systems should be rushed into this initial implementation.

**The objective is to build Not Our Stars on foundations capable of supporting the game we actually intend to create.**
