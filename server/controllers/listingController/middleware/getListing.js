/**
 * **************************************************
 *
 * @module listingController.getListing
 *
 * @description
 * This controller middleware is used to get a
 * specific listing
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getListing = async (req, res, next) => {
  try {
    const listingID = req.body.currentHostListing
      ? req.body.currentHostListing.listingid
      : req.params.listingid;

    const getListingQuery = 'SELECT * FROM listings WHERE listingid = $1';
    const { rows } = await query(getListingQuery, [listingID]);
    res.locals.listing = rows[0];
    return next();
  } catch (error) {
    return next({
      log: `Error occured in listingController.getListing middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to get listing.' },
    });
  }
};

export default getListing;
