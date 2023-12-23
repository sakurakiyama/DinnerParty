/**
 * **************************************************
 *
 * @module hostController.createOrGetHost
 *
 * @description
 * This controller middleware is used to create or
 * get a host
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const createOrGetHost = async (req, res, next) => {
  const { ishost, userid } = res.locals.user;

  try {
    if (!ishost) {
      // Update user to become a host
      const updateUserQuery =
        'UPDATE users SET ishost = $1 WHERE userid = $2 RETURNING *';
      const { rows: updatedUser } = await query(updateUserQuery, [
        true,
        userid,
      ]);
      const user = updatedUser[0];

      // Create a new host
      const createHostQuery = `INSERT INTO hosts (userid) VALUES ($1) RETURNING *`;
      const { rows: newHost } = await query(createHostQuery, [userid]);

      res.locals.host = newHost[0];
      res.locals.user = user;
    } else {
      // Get host information
      const getHostQuery = `SELECT * FROM hosts WHERE userid = $1`;
      const { rows: host } = await query(getHostQuery, [userid]);
      res.locals.host = host[0];
    }

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in hostController.createOrGetHost middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to create or get a host.' },
    });
  }
};

export default createOrGetHost;
