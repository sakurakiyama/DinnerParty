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

import getToken from './middleware/getToken.js';
import verifyToken from './middleware/verifyToken.js';
import generateTempCode from './middleware/generateTempCode.js';
import sendTempCode from './middleware/sendTempCode.js';
import verifyTempCode from './middleware/verifyTempCode.js';
import generateToken from './middleware/generateToken.js';

export default {
  verifyToken,
  getToken,
  generateTempCode,
  sendTempCode,
  verifyTempCode,
  generateToken,
};
