/**
 * **************************************************
 *
 * @module hostController
 *
 * @description
 * This is a collection of Express middleware functions
 * used for interacting with host information
 *
 * **************************************************
 */

import createOrGetHost from './middleware/createOrGetHost.js';
import createListing from './middleware/createListing.js';
import getHostListings from './middleware/getHostListings.js';

export default { createOrGetHost, createListing, getHostListings };
