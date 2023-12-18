/**
 * **************************************************
 *
 * @module userController.addRequiredProfile
 *
 * @description
 * This controller middleware is used to add required
 * profile fields to a users resource
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const addRequiredProfile = async (req, res, next) => {
  try {
    const { communityCommitmentAgreed, firstName, lastName, email } = req.body;

    if (communityCommitmentAgreed && firstName && lastName) {
      const updateRequiredFieldQuery = `UPDATE users SET communitycommitmentagreed = $1, firstname = $2, lastname = $3 WHERE email = $4 RETURNING *`;

      const { rows } = await query(updateRequiredFieldQuery, [
        communityCommitmentAgreed,
        firstName,
        lastName,
        email,
      ]);

      res.locals.user = rows[0];
      return next();
    }
  } catch (error) {
    return next({
      log: `Error occured in userController.addRequiredProfile middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to add required profile values.' },
    });
  }
};

export default addRequiredProfile;
