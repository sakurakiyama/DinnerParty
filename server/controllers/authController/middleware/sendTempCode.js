/**
 * **************************************************
 *
 * @module authController.sendTempCode
 *
 * @description
 * This controller middleware is used to send a
 * temporary code
 *
 * **************************************************
 */

import axios from 'axios';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const sendTempCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const message = `We need help confirming your identity. When prompted, please use the following verification code: ${res.locals.randomCode}. This code will expire in 10 minutes. If your code expires, request a new code on the verification page.`;

    const messageData = JSON.stringify({
      sender: {
        name: 'Dinner Party',
        email: 'dinnerpartyny@gmail.com',
      },
      to: [{ email: email }],
      subject: 'Confirm Your Identity',
      htmlContent: `<html><head></head><body><p>Hello,</p>${message}</p></body></html>`,
    });

    const { data } = await axios.post(
      'https://api.sendinblue.com/v3/smtp/email',
      messageData,
      {
        headers: {
          accept: 'application/json',
          // eslint-disable-next-line no-undef
          'api-key': process.env.VITE_BREVO_API_KEY,
          'content-type': 'application/json',
        },
      }
    );

    res.locals.message = data;
    return next();
  } catch (error) {
    return next({
      log: `Error occured in authController.sendTempCode middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to send the code.' },
    });
  }
};

export default sendTempCode;
