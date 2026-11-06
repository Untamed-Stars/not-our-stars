# Not Our Stars (NOS) — Project Handoff

> **Purpose:** This document is a portable project brief for continuing development of *Not Our Stars* in a new ChatGPT conversation.
>
> **Status:** The project is being restarted completely from scratch. Preserve the game vision and design decisions below, but do not assume old code should be reused.

---

## 1. Project identity

**Title:** Not Our Stars  
**Abbreviation:** NOS  
**Engine / rendering:** Three.js with WebGL fallback  
**Language:** **TypeScript** (confirmed by the user on 2026-11-07)  
**Target platform:** Browser-based game, intended to run on GitHub Pages  
**Perspective:** Switchable first-person and third-person  
**Genre:** Procedural sci-fi exploration / survival / spaceflight  
**Primary inspiration:** *No Man's Sky*, especially its core gameplay systems and loop, while using an original universe, lore, content, and identity.

NOS is a large-scale, first-person/third-person procedural sci-fi exploration game. The player awakens on an alien planet with amnesia, a functional survival suit and multitool, and a crashed, non-functional spacecraft named **Vanguard**.

The early gameplay loop is to explore the planet, gather local resources, and repair Vanguard. Once repaired, the player restores atmospheric flight, reaches space, explores star systems, visits physical space stations, and eventually obtains an interstellar jump drive.

The intended experience is a substantial exploration game with survival, crafting, building, spaceflight, ship ownership, combat, discovery, and a substantial main storyline.

---

## 2. Core design pillars

1. **Exploration and discovery**
   - Explore full spherical planets.
   - Discover varied environments, structures, resources, wildlife, and abandoned locations.
   - Travel between planets and star systems.
   - Explore a huge persistent procedural universe.

2. **Survival and resource management**
   - Oxygen, health, and environmental hazards.
   - Gather minerals and plant-derived resources.
   - Use equipment and upgrades to survive increasingly challenging environments.

3. **Building and crafting**
   - Craft items and upgrades.
   - Build modular player bases.
   - Build and expand infrastructure as progression allows.

4. **Spaceflight and travel**
   - Seamless transition from planetary surface to orbit.
   - Pilot spacecraft.
   - Visit and physically enter space stations.
   - Travel between planets and systems.
   - Unlock interstellar travel through a fuel-consuming jump drive.

5. **Story and atmosphere**
   - A substantial main storyline.
   - Emergent exploration remains important alongside the main story.
   - Atmosphere varies by location: peaceful, mysterious, vast and awe-inspiring, lonely, atmospheric, or dangerous.

---

## 3. Player start and early progression

- The player wakes on an alien planet with amnesia.
- The player has a functional survival suit and multitool.
- The player's ship, **Vanguard**, has crashed and is non-functional.
- The immediate objective is to gather local resources and repair Vanguard.
- Repairing the ship enables atmospheric flight.
- The player can then reach orbit and explore the local star system.
- Interstellar travel is not initially available. It requires obtaining a jump drive and the fuel needed to operate it.

The opening should establish the game's core loop without making the player feel stranded in a purely linear tutorial.

---

## 4. World and planet generation

### Planet model
- Planets are **full spheres**, not flat maps or bounded terrain patches.
- Terrain is procedurally generated.
- Handcrafted points of interest should be placed into the procedural world.

### Planet features
The user wants all of the following:
- Multiple biomes.
- Oceans and lakes.
- Mountains and caves.
- Procedural vegetation.
- Alien wildlife.
- Weather.
- Day/night cycle.
- Environmental hazards.
- Abandoned structures.

### Consistency
- Planet and star-system configurations must be persistent.
- A star system always has the same multiple planets and space stations.
- The universe can be generated procedurally, but a system's planets, stations, and orbital arrangement must not be randomly reshuffled every time the player visits.
- Use deterministic generation, such as persistent seeds and saved system definitions.

### Naming and descriptions
The user answered **No** to a proposed feature involving automatically generated planet descriptions/characteristics. Do not make generated descriptive text a required feature. Planet and system names can still exist as ordinary identifiers if useful, but avoid inventing an elaborate generated planet-description system without asking.

---

## 5. Player, suit, and multitool

### Player
- Switchable first-person and third-person camera modes.
- Player movement and physics must work consistently across planetary terrain.
- Survival suit supports oxygen and environmental protection.
- Health is part of the survival model.

### Multitool
The multitool must support:
- Mining mineral deposits.
- Scanning.
- Combat.
- Resource collection.
- Gathering resources from both minerals and plants.

Do not reduce the multitool to a mining-only tool.

### Survival
The survival model includes:
- Oxygen.
- Environmental hazards.
- Health.

Balance should support exploration rather than turn the game into an overly punishing survival simulator.

---

## 6. Bases, crafting, inventory, and resources

- Modular base building is required.
- Crafting and upgrades are important progression systems.
- The player gathers resources from mineral deposits and plants.
- Resources feed into repairs, crafting, upgrades, and construction.
- The inventory and resource model should be designed to work with future multiplayer, even though multiplayer is not part of the initial implementation.

---

## 7. Spaceflight and star systems

### Planet-to-space transition
- Seamless flight from a planet's surface into orbit.
- Avoid separate loading-screen transitions if practical.
- Planetary gravity, atmosphere, and flight handling should transition coherently.

### Star systems
- One enormous procedurally generated universe.
- Each system has a stable, persistent configuration.
- Systems contain multiple planets and space stations.
- Planets, stations, and orbital arrangements remain consistent between visits.

### Interstellar travel
- Requires a jump drive.
- Jump drive requires fuel.
- The jump-drive system is a progression gate, not an initially available ability.

---

## 8. Spacecraft, stations, and space activities

### Ship ownership
The player can eventually own multiple spacecraft and access:
- Hangars.
- Freighters.
- Capital ships.

### Space activities
The player should be able to:
- Pilot ships.
- Fly to space stations.
- Enter stations physically.
- Trade resources inside stations.
- Purchase ships.
- Purchase ship upgrades.
- Discover abandoned spacecraft.
- Explore asteroid fields.
- Visit other planets.
- Encounter other spacecraft, including pirates, NPCs, and police-like entities.
- Eventually encounter other players when multiplayer is implemented.

### Space stations
Stations are physical places, not just menu interfaces:
- Fly to the station.
- Dock.
- Enter and explore its interior.
- Trade resources.
- Purchase ships and upgrades.
- Support other station activities as the game develops.

### Asteroids and pirate encounters
- Asteroid fields are explorable space environments.
- They can provide places for pirate ambushes or concealment.
- Avoid making every asteroid field automatically hostile.

---

## 9. Space combat, factions, and AI

The user selected a substantial combat model, but not an excessively hardcore one, especially early in the game.

Required combat features:
- Ship weapons.
- Shields.
- Damage systems.
- Ship upgrades.
- Pirate encounters.
- Police interception.
- Faction conflicts.

The world should include NPC spacecraft, pirates, police-like entities, and eventually other players. Combat difficulty and complexity should scale with progression and location.

---

## 10. Story and universe

- The game has a substantial main storyline.
- Exploration and emergent discovery are still major parts of the experience.
- The universe should feel enormous.
- The user selected one enormous procedurally generated universe, not a collection of disconnected small maps.
- The player begins with amnesia, but no further specific plot details have been locked in by the questionnaire.

Do not invent major story canon without collaborating with the user.

---

## 11. Visual direction and performance

### Visual target
- Photorealistic sci-fi ambition.
- Strong graphics and atmosphere.
- Environment detail can range from simple geometry/textures to detailed terrain and objects, depending on performance needs.
- The user explicitly does not want the game to look like a low-quality browser game (for example, a basic CrazyGames/Poki-style visual).
- Atmosphere varies by location.

### Performance target
- Balance visual quality and performance for modest hardware.
- Use level-of-detail, culling, instancing, chunking/streaming, and sensible texture/material budgets.
- Avoid expensive systems running unnecessarily.
- Visual quality should be improved through coherent art direction, lighting, materials, and composition, not merely by adding huge numbers of polygons.

### Rendering
- Three.js is the chosen rendering foundation.
- WebGL fallback is required.
- WebGPU may be considered as a future enhancement, not a hard dependency.

---

## 12. Technical decisions

### Confirmed
- **TypeScript:** User agreed to use TypeScript on 2026-11-07.
- **Three.js:** Browser rendering foundation.
- **WebGL fallback:** Required.
- **Modular architecture:** Separate files by subsystem.
- **Filename convention:** `g1.js`, `g2.js`, `g3.js`, etc. The user specifically wants to retain this naming convention.
- **File comments:** Every file must have a comment at the top explaining its purpose. Example:
  ```ts
  // g5.ts - PLAYER CONTROLLER & PHYSICS
  ```
  The example uses `.ts` because TypeScript is now selected. The user's original convention was expressed as `g1.js`, etc.; use numbered `g1.ts`, `g2.ts`, etc. for TypeScript source unless the user requests otherwise. Compiled output will be JavaScript.
- **Physics:** Hybrid approach using Rapier.js and custom physics where appropriate.
- **Local saves first:** Browser-local save system initially.
- **Cloud saves later:** Cloud persistence can be added after the local system works.
- **Multiplayer-ready architecture:** Yes, but multiplayer itself is a later feature.
- **Performance:** Balanced for modest hardware.
- **Universe:** One enormous procedural universe.
- **Ship ownership:** Multiple ships, hangars, freighters, and capital ships.

### Physics approach
The user selected a hybrid Rapier/custom approach:
- Use Rapier.js for complex rigid-body interactions and physics that benefit from a dedicated physics engine.
- Use custom lightweight movement/planetary locomotion where that is simpler and more controllable.
- Avoid forcing every game object through the physics engine if it creates unnecessary performance costs.
- Ensure the split is deliberate and documented.

### Saving
- Browser-local saving initially.
- IndexedDB is a sensible candidate for larger save data.
- Cloud saving can be added later.
- Save stable procedural seeds and persistent system changes so visited systems remain consistent.

### Multiplayer readiness
- Multiplayer is a future feature, not a requirement for the first playable version.
- Design entity identity, ownership, world state, and system boundaries so networking can be added later.
- Do not prematurely build a full networking backend.
- NPCs, pirates, police, and eventually other players should fit into a coherent entity model.

### Backend
No final backend choice has been confirmed for NOS. Do not assume Supabase is selected. It may be considered later for cloud saves or multiplayer, but the initial game should work without it.

---

## 13. Architecture and code organization

The user wants:
- Separate files by subsystem.
- Numbered `g1`, `g2`, `g3` naming.
- Each file to have a clear responsibility and a top-of-file purpose comment.
- All systems to be integrated and designed to work together.
- No pile of independent scripts that are only glued together at the end.
- A clear explanation of how files communicate.
- One coherent game architecture.

### Important architecture principles

1. **One application entry point**
   - `main.ts` starts the application.
   - Avoid loading every subsystem independently with separate script tags.
   - Use ES module imports/exports and a single dependency graph.

2. **One central game loop**
   - One animation/update loop.
   - Systems register or are called by a central engine in a known order.
   - No competing animation loops scattered across files.

3. **Explicit shared context**
   - Define a clear game context/service interface for shared resources such as scene, renderer, camera, input, world state, player, and event handling.
   - Avoid unstructured globals and hidden dependencies.

4. **Clear subsystem boundaries**
   - Each file owns a defined area.
   - Avoid circular imports.
   - Prefer dependency injection, interfaces, and events where they reduce coupling.

5. **Persistent procedural identity**
   - Use deterministic seeds and stable identifiers.
   - A planet or station should be reproducible when revisited.
   - Save player-made changes and important world changes.

6. **Multiplayer-aware, not multiplayer-first**
   - Separate player state, world state, and entity state.
   - Give entities stable IDs.
   - Keep ownership and authority concepts in mind.
   - Do not add network complexity before the single-player game needs it.

7. **Build in integrated phases**
   - Each phase should leave the project in a working state.
   - New systems should connect to the existing architecture as they are introduced.
   - Explain and test changes incrementally.

### Earlier proposed directory layout (to refine)

This is a starting proposal, not a final locked file list. The architecture document should refine it, avoid unnecessary fragmentation, and account for the full game vision.

```text
not-our-stars/
├── index.html
├── style.css
├── main.ts
├── core/
│   ├── g1.ts   # Core engine and initialization
│   ├── g2.ts   # Rendering and graphics
│   ├── g3.ts   # Lighting and atmosphere
│   ├── g4.ts   # Input and controls
│   └── g5.ts   # Player controller and physics
├── world/
│   ├── g6.ts   # Procedural generation
│   ├── g7.ts   # Planet terrain
│   ├── g8.ts   # Biomes and environment
│   ├── g9.ts   # Resources and mineral deposits
│   └── g10.ts  # Wildlife and NPCs
├── gameplay/
│   ├── g11.ts  # Inventory and resources
│   ├── g12.ts  # Multitool
│   ├── g13.ts  # Survival systems
│   ├── g14.ts  # Building
│   └── g15.ts  # Missions and progression
├── vehicles/
│   ├── g16.ts  # Ships and Vanguard
│   ├── g17.ts  # Flight systems
│   ├── g18.ts  # Space environments
│   └── g19.ts  # Star systems and navigation
├── structures/
│   ├── g20.ts  # Space stations
│   ├── g21.ts  # Interiors and docking
│   └── g22.ts  # Trading and economy
└── systems/
    ├── g23.ts  # Audio
    ├── g24.ts  # Saving and persistence
    ├── g25.ts  # Multiplayer foundation
    └── g26.ts  # UI and HUD
```

The final architecture may add or reorganize modules for:
- Asset loading and management.
- World streaming and LOD.
- Planet atmosphere, water, weather, and day/night.
- Procedural points of interest.
- Galaxy navigation and deterministic system generation.
- Ship combat and damage.
- NPC/faction AI.
- Settings and performance controls.
- Story, missions, and dialogue.
- Audio.
- Save migration/versioning.
- Future networking.

Do not create dozens of empty files immediately. Define the complete architecture, then create the files in a useful order as systems become real.

---

## 14. Development workflow and collaboration preferences

The user prefers an incremental, explanatory workflow:
- Teach while building.
- Explain what each file and system does.
- Explain why a design is being used.
- Implement a coherent step, then test it.
- Diagnose errors from actual console output and code.
- Avoid dumping enormous finished code blocks without explanation.
- Do not rewrite working systems unnecessarily.
- Preserve existing work during normal development. (The NOS project itself is an explicit full restart, so there is no requirement to preserve the old NOS implementation.)
- Make sure all modules integrate as the project grows.
- When providing HTML, give every HTML section an ID.
- The user likes structured, system-oriented interfaces and clear naming.

The user wants a substantial game vision, not a permanently tiny prototype. However, the game should still be developed in staged, testable phases. Do not promise that every feature can be completed immediately or in one code dump. Build toward the full vision without compromising the architecture.

---

## 15. Decisions still open / confirm before implementation

The user has confirmed TypeScript, so do not ask that again.

These details may need decisions during the Technical Architecture Document (TAD) or implementation:
- TypeScript build tooling and GitHub Pages deployment method (for example, Vite).
- Exact folder/file breakdown and responsibility of each numbered file.
- Rapier integration boundaries.
- Planet scale, coordinate strategy, and precision strategy for large worlds.
- World streaming and LOD implementation.
- Asset pipeline and art sources.
- Save format and versioning.
- Exact story details, factions, species, and universe lore.
- Exact economy/trading model.
- Multiplayer provider/backend, to be decided later.
- Detailed controls and UI layout.

Make reasonable recommendations and explain tradeoffs. Ask the user only for decisions that materially affect the architecture; do not turn every minor implementation detail into a questionnaire.

---

## 16. Immediate next step

**Create the complete NOS Technical Architecture Document (TAD).**

The TAD should:
1. Translate the full game vision into a technically coherent architecture.
2. Define the final directory structure and numbered file responsibilities.
3. Explain how TypeScript, Three.js, WebGL, Rapier, and the build tooling fit together.
4. Define the central game context, event flow, update loop, and module communication.
5. Explain deterministic procedural generation and persistent star systems.
6. Plan world streaming, performance, and large spherical planets.
7. Plan local saves and future cloud/multiplayer expansion.
8. Organize development into integrated, testable phases.
9. Identify technical risks and sensible simplifications for modest hardware.
10. Avoid writing the entire game at once.

After the TAD is agreed, begin creating the actual project from scratch, one integrated step at a time. A likely starting point is the project/build setup and then `g1.ts` (core engine), but the TAD should determine the exact order.

---

## 17. Short instruction for the next ChatGPT conversation

You are helping develop **Not Our Stars (NOS)**, a large browser-based procedural sci-fi exploration game in TypeScript and Three.js. The user has supplied this handoff because the previous conversation may run out of context.

**First, read this document carefully. Do not restart the design questionnaire.** The user has already answered 29 design questions, and their decisions are recorded above. TypeScript was explicitly confirmed on 2026-11-07.

The project is restarting from scratch, so do not try to recover or reuse old NOS code. The next task is to produce the complete Technical Architecture Document (TAD), then begin implementation incrementally.

Teach as you build. Explain architecture and code changes, keep files integrated, use numbered `g1.ts`, `g2.ts`, etc. with a clear purpose comment at the top of every file, and ensure every HTML section has an ID. The user's goal is a substantial, polished game with the features described here, developed in manageable and testable phases.
