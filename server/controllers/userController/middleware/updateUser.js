/**
 * **************************************************
 *
 * @module userController.updateUser
 *
 * @description
 * This controller middleware is used to update a
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

const updateUser = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      city,
      phonenumber,
      email,
      profilepicture,
      bio,
      ishost,
      tempcode,
      tempcodedate,
      datecreated,
      communitycommitmentagreed,
      state,
    } = req.body;

    const { userid } = res.locals.user;

    const updateUserQuery = `UPDATE users SET firstname = $1, lastname = $2, city = $3, phonenumber = $4, email = $5, profilepicture = $6, bio = $7, ishost = $8, tempcode = $9, tempcodedate = $10, datecreated = $11, communitycommitmentagreed = $12, state = $13 WHERE userid = $14 RETURNING *`;
    const { rows } = await query(updateUserQuery, [
      firstname,
      lastname,
      city,
      phonenumber,
      email,
      profilepicture,
      bio,
      ishost,
      tempcode,
      tempcodedate,
      datecreated,
      communitycommitmentagreed,
      state,
      userid,
    ]);

    let user = rows[0];

    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: `Error occured in userController.updateUser middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to get user.' },
    });
  }
};

export default updateUser;
