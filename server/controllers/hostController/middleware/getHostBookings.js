/**
 * **************************************************
 *
 * @module hostController.getHostBookings
 *
 * @description
 * This controller middleware is used to get a user
 * from the db
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getHostBookings = async (req, res, next) => {
  try {
    const { hostid } = res.locals.host;

    const getHostBookingsQuery = `SELECT * FROM bookings WHERE hostid = $1`;

    const { rows } = await query(getHostBookingsQuery, [hostid]);
    res.locals.bookings = rows;

    return next();
  } catch (error) {
    return next({
      log: `Error occured in hostController.getHostBookings middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to get user.' },
    });
  }
};

export default getHostBookings;
