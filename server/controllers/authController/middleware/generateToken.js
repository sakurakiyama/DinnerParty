/**
 * **************************************************
 *
 * @module authController.generateToken
 *
 * @description
 * This controller middleware is used to generate a
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

const generateToken = async (req, res, next) => {
  try {
    const { email } = req.body;

    // eslint-disable-next-line no-undef
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwtToken', token, { maxAge: 2678400000, httpOnly: true });

    return next();
  } catch (error) {
    return next({
      log: `Error occured in authController.generateToken middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to generate a token.' },
    });
  }
};

export default generateToken;
