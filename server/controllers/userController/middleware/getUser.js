/**
 * **************************************************
 *
 * @module userController.getUser
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

const getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const getUserQuery = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await query(getUserQuery, [email]);
    let user = rows[0];

    user ? (res.locals.userExists = true) : (res.locals.userExists = false);
    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: `Error occured in userController.getUser middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to get user.' },
    });
  }
};

export default getUser;
