
import * as THREE from 'three';

// ========================================
// G5 - PLAYER CONTROLLER
// ========================================

const { scene, camera, renderer } = window.NOS;
const world = window.NOS.world;

// ----------------------------------------
// PLAYER CONFIGURATION
// ----------------------------------------

const PLAYER = {

    height: 1.7,

    walkSpeed: 6,
    sprintSpeed: 10,

    jumpForce: 8,
    gravity: 22,

    jetpackForce: 12,
    jetpackMaxFuel: 100,
    jetpackDrain: 8,
    jetpackRecharge: 12,

    mouseSensitivity: 0.002

};

// ----------------------------------------
// PLAYER STATE
// ----------------------------------------

const player = {

    velocity: new THREE.Vector3(),

    grounded: true,

    jumping: false,

    jetpacking: false,

    jetpackFuel: PLAYER.jetpackMaxFuel,

    yaw: 0,
    pitch: 0,

    keys: {}

};

window.NOS.player = player;

// ----------------------------------------
// INITIAL POSITION
// ----------------------------------------

camera.position.set(
    0,
    PLAYER.height + world.terrainHeight(0, 0),
    0
);

camera.rotation.order = 'YXZ';

// ----------------------------------------
// KEYBOARD INPUT
// ----------------------------------------

window.addEventListener('keydown', (event) => {

    player.keys[event.code] = true;

    // Prevent Space from scrolling the page.

    if (event.code === 'Space') {
        event.preventDefault();
    }

});

window.addEventListener('keyup', (event) => {

    player.keys[event.code] = false;

});

// Prevent stuck keys when the window loses focus.

window.addEventListener('blur', () => {

    player.keys = {};

});

// ----------------------------------------
// MOUSE LOOK
// ----------------------------------------

renderer.domElement.addEventListener('click', () => {

    if (document.pointerLockElement !== renderer.domElement) {
        renderer.domElement.requestPointerLock();
    }

});

window.addEventListener('mousemove', (event) => {

    if (document.pointerLockElement !== renderer.domElement) {
        return;
    }

    player.yaw -= event.movementX * PLAYER.mouseSensitivity;

    player.pitch -= event.movementY * PLAYER.mouseSensitivity;

    // Prevent camera from flipping upside down.

    player.pitch = THREE.MathUtils.clamp(
        player.pitch,
        -Math.PI / 2 + 0.01,
        Math.PI / 2 - 0.01
    );

    camera.rotation.set(
        player.pitch,
        player.yaw,
        0,
        'YXZ'
    );

});

// ----------------------------------------
// MOVEMENT
// ----------------------------------------

function updateMovement(dt) {

    const forward =
        Number(player.keys['KeyW']) -
        Number(player.keys['KeyS']);

    const sideways =
        Number(player.keys['KeyD']) -
        Number(player.keys['KeyA']);

    const direction = new THREE.Vector3(
        sideways,
        0,
        -forward
    );

    if (direction.lengthSq() > 0) {

        direction.normalize();

        direction.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            player.yaw
        );

    }

    const sprinting =
        player.keys['ShiftLeft'] ||
        player.keys['ShiftRight'];

    const speed = sprinting
        ? PLAYER.sprintSpeed
        : PLAYER.walkSpeed;

    camera.position.x += direction.x * speed * dt;
    camera.position.z += direction.z * speed * dt;

}

// ----------------------------------------
// JUMPING
// ----------------------------------------


function updateJumping() {

    // Jump only when jetpack isn't being activated.

    if (
        player.keys['Space'] &&
        player.grounded &&
        !player.keys['KeyX']
    ) {

        player.velocity.y = PLAYER.jumpForce;

        player.grounded = false;

    }

}

// ----------------------------------------
// JETPACK
// ----------------------------------------

function updateJetpack(dt) {

    const activating =
        player.keys['KeyX'] &&
        player.jetpackFuel > 0;

    player.jetpacking = activating;

    if (activating) {

        // Powered takeoff, even from the ground.

        player.grounded = false;

        player.velocity.y = Math.min(
            player.velocity.y + PLAYER.jetpackForce * dt,
            12
        );

        player.jetpackFuel = Math.max(
            0,
            player.jetpackFuel - PLAYER.jetpackDrain * dt
        );

    } else if (player.grounded) {

        player.jetpackFuel = Math.min(
            PLAYER.jetpackMaxFuel,
            player.jetpackFuel + PLAYER.jetpackRecharge * dt
        );

    }

}


// ----------------------------------------
// GRAVITY AND GROUND COLLISION
// ----------------------------------------

function updatePhysics(dt) {

    const groundHeight =
        world.terrainHeight(
            camera.position.x,
            camera.position.z
        );

    const groundY = groundHeight + PLAYER.height;

    if (!player.grounded || player.velocity.y > 0) {

        player.velocity.y -= PLAYER.gravity * dt;

    }

    camera.position.y += player.velocity.y * dt;

    // Ground collision.

    if (camera.position.y <= groundY) {

        camera.position.y = groundY;

        player.velocity.y = 0;

        player.grounded = true;

    } else {

        player.grounded = false;

    }

}

// ----------------------------------------
// PLAYER UPDATE
// ----------------------------------------

function updatePlayer(dt) {

    if (document.pointerLockElement !== renderer.domElement) {
        return;
    }

    updateMovement(dt);

    updateJumping();

    updateJetpack(dt);

    updatePhysics(dt);

    // Update status display.

    const status = document.getElementById('status');

    status.textContent =
        `UNKNOWN PLANET // JETPACK ${Math.round(player.jetpackFuel)}%`;

}

// ----------------------------------------
// REGISTER PLAYER UPDATE
// ----------------------------------------

window.NOS.updateSystems.push(updatePlayer);

console.log('NOT OUR STARS: G5 PLAYER ONLINE');
