/**
 * **************************************************
 *
 * @module authController.getToken
 *
 * @description
 * This controller middleware is used to check if a
 * a token exists
 *
 * **************************************************
 */

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getToken = async (req, res, next) => {
  try {
    const jwtCookie = req.headers.cookie
      ? req.headers.cookie
          .split(';')
          .find((cookie) => cookie.trim().startsWith('jwtToken='))
      : null;

    if (jwtCookie) {
      const jwtTokenValue = jwtCookie.split('=')[1].trim();
      res.locals.token = jwtTokenValue;
    } else {
      res.locals.token = null;
    }
    return next();
  } catch (error) {
    return next({
      log: `Error occured in authController.getToken middleware: ${error}`,
      status: 401,
      message: { error: 'Unable to get a token.' },
    });
  }
};

export default getToken;
