import { Router } from 'express';
import authController from '../controllers/authController/index.js';

const router = Router();

router.get('/status', authController.checkStatus, (req, res) => {
  if (res.locals.user) return res.status(200).json(res.locals.user);
  return res.status(401).json(res.locals.user);
});

router.post(
  '/code',
  authController.generateTempCode,
  authController.sendTempCode,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

export default router;
