import { Router } from 'express';
import userController from '../controllers/userController/index.js';

const router = Router();

router.post(
  '/getUser',
  userController.getUser,
  userController.createUser,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

export default router;
