# 🌌 NOT OUR STARS (NOS) — PROJECT REFERENCE SHEET

**Not Our Stars** is a first-person, procedural sci-fi exploration game built in **Three.js (WebGL)**, designed to closely mirror the core mechanics of *No Man's Sky*. The player wakes up on an alien planet with amnesia, a functional survival suit/multitool, and a crashed, non-functional ship named *Vanguard*. The immediate loop requires gathering local resources to fix the ship, breaking atmosphere, navigating star systems, and docking at massive physical space stations.

---

### 🗂️ ARCHITECTURE & FILE STRUCTURE

*   **`g1.js` — Core Engine & Animation Loop**
    *   Initialises the global namespace (`window.NOS = { THREE, scene, camera, renderer, updateSystems: [] }`).
    *   Runs the master delta-time (`dt`) loop via `requestAnimationFrame` ensuring all modular sub-systems update smoothly.
*   **`g2.js` — Lighting**
    *   Manages planetary ambient light, directional stars/suns, and atmospheric lighting profiles.
*   **`g3.js` — Starfield**
    *   Generates deep-space celestial backdrops, constellations, and distant systemic visual grids.
*   **`g4.js` — Basic Planet Environment & Mineral Deposits**
    *   Handles heightmap/noise-based terrain generation via `world.terrainHeight(x, z)`.
    *   Spawns collectible resource nodes (**Ferrite** 🔘, **Copper** 🟠, **Silica** 🔵) using emissive materials registered to `window.NOS.world.resources`.
*   **`g5.js` — Player Movement & Physics**
    *   Lightweight custom collision loop tracking gravity, ground snapping, and flight states.
    *   Exposes player properties directly to `window.NOS.player`.

---

### 🕹️ CONTROL SCHEMA (FIRST-PERSON APEX)

| Input | Action | Technical Sub-system |
| :--- | :--- | :--- |
| **`W` / `S`** | Move Forward / Backward | `g5.js` (Vector translation along horizontal forward vector) |
| **`A` / `D`** | Move Left / Right | `g5.js` (Vector translation along camera strafe vector) |
| **`Mouse`** | Look Around | `g5.js` (PointerLock API; clamped pitch to prevent camera flips) |
| **`Shift`** | Sprint | `g5.js` (Toggles acceleration multiplier from 6 to 10) |
| **`Space`** | Jump | `g5.js` (Applies upward vertical force; checks `player.grounded`) |
| **`X`** | Jetpack | `g5.js` (Direct ground takeoff, flight velocity ceiling capped at 12) |
| **`Escape`** | Release Mouse | Native Browser PointerLock breaking mechanism |

---

### 🚀 EARLY PROGRESSION: THE "VANGUARD" REPAIR MATRIX

To achieve the primary gameplay loop of reaching orbit and visiting the massive localized space station, specific ship sub-systems must be restored on the starting planet using gathered resources.

┌─────────────────────────────────┐
│   [PLAYER WAKES UP ON PLANET]   │
└────────────────┬────────────────┘
│
▼
Gather: Ferrite 🔘 | Copper 🟠 | Silica 🔵
│
▼
┌───────────────────────────────────────────────────┐
│ REPAIR VANGUARD:                                  │
│ 🛠️ Basic Propulsion     🛠️ Launch Systems          │
│ 🛠️ Flight Stabilisation 🛠️ Power Distribution     │
└─────────────────────────┬─────────────────────────┘
│
▼
┌─────────────────────────────────┐
│      RESTORE ATMOSPHERIC FLIGHT │
└────────────────┬────────────────┘
│
▼
┌─────────────────────────────────┐
│   LAUNCH INTO SPACE ENVIRONMENT │
└────────────────┬────────────────┘
│
▼
┌───────────────────────────────────────────────────┐
│ SPACE SYSTEM ACTIVITIES:                           │
│ 🛰️ Dock at Space Station                           │
│ 💳 Purchase Interplanetary Engine Upgrades         │
│ 🌌 Blueprint Interstellar Jump Drive (Late Game)  │
└───────────────────────────────────────────────────┘

---

### ⚙️ TECHNICAL SPECIFICATIONS & SCALING BLUEPRINTS

*   **Graphics & Pipeline:** Balanced WebGL performance target. Custom GLSL Shaders handle procedurally calculated atmosphere scattering, volumetric fog, and terrain blends.
*   **Coordination Strategy (Floating Origin):** To avoid floating-point accuracy glitches over astronomical scales, the engine uses structural origin rebasing. The physical engine tracking splits spaces into:
    1. *Galaxy Space* (Macro coordinates)
    2. *System Space* (Orbital coordinates)
    3. *Local Space* (Centered dynamically at `(0,0,0)` relative to the active player anchor point)
*   **Physics Engine Transitions:** Custom lightweight calculations handle simple ground navigation in `g5.js`. Complex structural frame interactions (ship collisions, entering massive docking bays, terrain chunks) utilize compiled **Rapier.js** modules.

