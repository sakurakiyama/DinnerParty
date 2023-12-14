/**
 * **************************************************
 *
 * @module authController.generateTempCode
 *
 * @description
 * This controller middleware is used to generate a
 * temporary code
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const generateTempCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const randomCode = (Math.floor(Math.random() * 900000) + 100000).toString();
    const saveCodeQuery = `UPDATE users
    SET tempcode = $1, tempcodedate = $2
    WHERE email = $3
    RETURNING *`;

    await query(saveCodeQuery, [randomCode, new Date().toUTCString(), email]);

    res.locals.randomCode = randomCode;
    return next();
  } catch (error) {
    return next({
      log: `Error occured in authController.generateTempCode middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to generate or add a temporary code.' },
    });
  }
};

export default generateTempCode;
