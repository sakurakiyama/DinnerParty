/*
 * ====================================
 *        MIDDLEWARE FUNCTION
 * This middleware checks the status of
 * a user
 * ====================================
 */

const checkStatus = async (req, res, next) => {
  console.log('in Check Status middleware');
  try {
    const jwtCookie = req.headers.cookie
      ? req.headers.cookie
          .split(';')
          .find((cookie) => cookie.trim().startsWith('jwtToken='))
      : null;

    console.log('jwt cookie is: ', jwtCookie);
    if (jwtCookie) {
      const jwtTokenValue = jwtCookie.split('=')[1].trim();
      console.log('The cookie exists: ', jwtTokenValue);
      // Validate next
      // Get user info from DB
      // Send back user
      res.locals.user = { name: 'David', email: 'david@gmail.com' };
    } else {
      // There's no cookie!
      res.locals.user = null;
    }
    console.log('i finished!');
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
