/**
 * **************************************************
 *
 * @module hostController.getHostListings
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

const getHostListings = async (req, res, next) => {
  try {
    const { hostid } = res.locals.host;

    const getHostListingsQuery = `SELECT * FROM listings WHERE hostid = $1`;
    const { rows } = await query(getHostListingsQuery, [hostid]);
    res.locals.listings = rows;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in hostController.getHostListings middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to get hosts listings.' },
    });
  }
};

export default getHostListings;
