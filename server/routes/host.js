import { Router } from 'express';
import userController from '../controllers/userController/index.js';
import hostController from '../controllers/hostController/index.js';
import authController from '../controllers/authController/index.js';
import listingController from '../controllers/listingController/index.js';

const router = Router();

router.post(
  '/createListing',
  authController.getToken,
  authController.verifyToken,
  userController.getUser,
  hostController.createOrGetHost,
  hostController.createListing,
  (req, res) => {
    return res.status(200).json({
      user: res.locals.user,
      listing: res.locals.listing,
      host: res.locals.host,
    });
  }
);

router.post(
  '/updateListing',
  authController.getToken,
  authController.verifyToken,
  userController.getUser,
  hostController.createOrGetHost,
  listingController.getListing,
  hostController.updateListing,
  hostController.getHostListings,
  (req, res) => {
    return res.status(200).json({
      listings: res.locals.listings,
      host: res.locals.host,
    });
  }
);

router.get(
  '/getHostData',
  authController.getToken,
  authController.verifyToken,
  userController.getUser,
  hostController.createOrGetHost,
  hostController.getHostListings,
  (req, res) => {
    return res.status(200).json({
      listings: res.locals.listings,
      host: res.locals.host,
    });
  }
);

router.get(
  '/getListing/:listingid',
  listingController.getListing,
  (req, res) => {
    return res.status(200).json(res.locals.listing);
  }
);

export default router;
