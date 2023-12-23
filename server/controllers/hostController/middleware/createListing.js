/**
 * **************************************************
 *
 * @module hostController.createListing
 *
 * @description
 * This controller middleware is used to create a
 * listing
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const createListing = async (req, res, next) => {
  try {
    const { hostid } = res.locals.host;
    const createListingQuery = `INSERT INTO listings (hostid) VALUES ($1) RETURNING *`;
    const { rows } = await query(createListingQuery, [hostid]);
    res.locals.listing = rows[0];
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in hostController.createListing middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to create a listing.' },
    });
  }
};

export default createListing;
