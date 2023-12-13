/**
 * **************************************************
 *
 * @module authController
 *
 * @description
 * This is a collection of Express middleware functions
 * used for interacting with auth information
 *
 * **************************************************
 */

import checkStatus from './middleware/checkStatus.js';
import generateTempCode from './middleware/generateTempCode.js';
import sendTempCode from './middleware/sendTempCode.js';

export default { checkStatus, generateTempCode, sendTempCode };
