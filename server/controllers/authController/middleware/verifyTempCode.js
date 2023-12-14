/**
 * **************************************************
 *
 * @module authController.verifyTempCode
 *
 * @description
 * This controller middleware is used to verify a
 * temp code
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const verifyTempCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    res.locals.verified = false;
    const getTempQuery = `SELECT tempcode, CURRENT_TIMESTAMP - tempcodedate AS timedifference FROM users where email = $1 `;
    const { rows } = await query(getTempQuery, [email]);
    const { tempcode, timedifference } = rows[0];

    let minutes = timedifference.minutes || 0;
    let totalSeconds = minutes * 60 + timedifference.seconds;

    if (tempcode === code && totalSeconds < 600) res.locals.verified = true;

    const removeTempQuery = `UPDATE users SET tempcode = $1, tempcodedate = $2 WHERE email = $3 RETURNING *`;

    const { rows: userData } = await query(removeTempQuery, [
      null,
      null,
      email,
    ]);

    res.locals.user = userData[0];

    return next();
  } catch (error) {
    return next({
      log: `Error occured in authController.verifyTempCode middleware: ${error}`,
      status: 401,
      message: { error: 'Unable to verify the code.' },
    });
  }
};

export default verifyTempCode;
