/**
 * **************************************************
 *
 * @module authController.verifyToken
 *
 * @description
 * This controller middleware is used to verify a
 * token
 *
 * **************************************************
 */

import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const verifyToken = async (req, res, next) => {
  try {
    if (res.locals.token) {
      const verification = await jwt.verify(
        res.locals.token,
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET
      );
      if (verification) res.locals.verification = verification;
    }
    return next();
  } catch (error) {
    return next({
      log: `Error occured in authController.verifyToken middleware: ${error}`,
      status: 401,
      message: { error: 'Unable to verify token.' },
    });
  }
};

export default verifyToken;
