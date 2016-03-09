/* config.js contains constants.
 */

CONFIG = {};

CONFIG.MEELEE_ATTACK = 0;
CONFIG.FIRST_SPELL = 1;

if (location.origin === "http://localhost:5000"){
    CONFIG.SHOW_HITBOXES = false;
} else {
    CONFIG.SHOW_HITBOXES = false;
}

/* Array of cooldowns that have been called
 * On update loop performs the visual behavior necessary for cooldown
 */
CONFIG.COOLDOWNS = [];
CONFIG.SCREEN_HEIGHT = 520;
CONFIG.ACTION = {};
CONFIG.ACTION.MOVING_LEFT = 0;
CONFIG.ACTION.MOVING_RIGHT = 1;
CONFIG.ACTION.ATTACK_LEFT = 2;
CONFIG.ACTION.ATTACK_RIGHT = 3;
CONFIG.ACTION.IDLE = 4;
CONFIG.SCREEN_WIDTH = 768;
