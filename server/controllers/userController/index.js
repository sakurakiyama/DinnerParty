/**
 * **************************************************
 *
 * @module userController
 *
 * @description
 * This is a collection of Express middleware functions
 * used for interacting with user information
 *
 * **************************************************
 */

import getUser from './middleware/getUser.js';
import createUser from './middleware/createUser.js';

export default { getUser, createUser };
