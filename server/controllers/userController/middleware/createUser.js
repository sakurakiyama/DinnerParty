/**
 * **************************************************
 *
 * @module userController.createUser
 *
 * @description
 * This controller middleware is used to create a
 * user
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!res.locals.userExists) {
      const createUserQuery = `INSERT INTO users (email) VALUES ($1) RETURNING *  `;
      await query(createUserQuery, [email]);
    }
    return next();
  } catch (error) {
    return next({
      log: `Error occured in userController.createUser middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to create user.' },
    });
  }
};

export default createUser;
