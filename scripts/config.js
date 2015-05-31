/* config.js contains constants.
 */

CONFIG = {};

/* Contains the width of the screen 
 */
CONFIG.SCREEN_WIDTH = 768;

/* 
 */
CONFIG.MEELEE_ATTACK = 0;
CONFIG.FIRST_SPELL = 1;

/* Array of cooldowns that have been called
 * On update loop performs the visual behavior necessary for cooldown
 */
CONFIG.COOLDOWNS = []; 

CONFIG.ACTION = {};

CONFIG.ACTION.MOVING_LEFT = 0;
CONFIG.ACTION.MOVING_RIGHT = 1;

CONFIG.ACTION.ATTACK_LEFT = 2;
CONFIG.ACTION.ATTACK_RIGHT = 3;

CONFIG.ACTION.IDLE = 4;
