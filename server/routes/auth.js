import { Router } from 'express';
import authController from '../controllers/authController/index.js';
import userController from '../controllers/userController/index.js';

const router = Router();

router.get(
  '/status',
  authController.getToken,
  authController.verifyToken,
  userController.getUser,
  (req, res) => {
    if (res.locals.user) return res.status(200).json(res.locals.user);
    return res.status(401).json({});
  }
);

router.post(
  '/verifycode',
  authController.verifyTempCode,
  authController.generateToken,
  (req, res) => {
    if (res.locals.verified) return res.status(200).json(res.locals.user);
    else return res.status(401);
  }
);
export default router;
