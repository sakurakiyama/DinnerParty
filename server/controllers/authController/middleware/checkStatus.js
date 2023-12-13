/**
 * **************************************************
 *
 * @module authController.checkStatus
 *
 * @description
 * This controller middleware is used to check if a
 * user has already logged in.
 *
 * **************************************************
 */

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const checkStatus = async (req, res, next) => {
  try {
    const jwtCookie = req.headers.cookie
      ? req.headers.cookie
          .split(';')
          .find((cookie) => cookie.trim().startsWith('jwtToken='))
      : null;

    if (jwtCookie) {
      const jwtTokenValue = jwtCookie.split('=')[1].trim();
      console.log('The cookie exists: ', jwtTokenValue);
      // TODO: Validate next
      // TODO: Get user info from DB
      // TODO: Send back user
      res.locals.user = { name: 'David', email: 'david@gmail.com' };
    } else {
      // There's no cookie!
      res.locals.user = null;
    }
    return next();
  } catch (error) {
    return next({
      log: `Error occured in authController.getStatus middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to get users status.' },
    });
  }
};

export default checkStatus;
