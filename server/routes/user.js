import { Router } from 'express';
import userController from '../controllers/userController/index.js';
import authController from '../controllers/authController/index.js';

const router = Router();

router.post(
  '/sendCode',
  userController.getUser,
  userController.createUser,
  authController.generateTempCode,
  authController.sendTempCode,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

router.patch(
  '/requiredProfile',
  userController.addRequiredProfile,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.patch(
  '/updateUser',
  authController.getToken,
  authController.verifyToken,
  userController.getUser,
  userController.updateUser,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);
export default router;
