/**
 * **************************************************
 *
 * @module hostController.updateListing
 *
 * @description
 * This controller middleware is used to update a
 * listing
 *
 * **************************************************
 */

import query from '../../../models/db.js';

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const updateListing = async (req, res, next) => {
  try {
    const { marketingDetails, spaceDetails, publishingDetails, listingID } =
      req.body;
    const { status } = res.locals.listing;

    const {
      homeType,
      accessType,
      streetAddress,
      apt,
      city,
      state,
      zipCode,
      guests,
      diningAreas,
      bathrooms,
    } = spaceDetails;

    const { amenities, photos, title, description } = marketingDetails;
    const { instantBook, security, basePrice } = publishingDetails;

    const decodedPhotos = photos.map((photo) => {
      const updatedString = photo.split(',')[1];
      // eslint-disable-next-line no-undef
      return Buffer.from(updatedString, 'base64');
    });

    const { hostid } = res.locals.host;

    let updatedStatus;

    if (
      [
        homeType,
        accessType,
        streetAddress,
        city,
        state,
        zipCode,
        guests,
        diningAreas,
        bathrooms,
        amenities,
        photos,
        title,
        description,
        instantBook,
        security,
        basePrice,
      ].every(
        (value) =>
          value !== null &&
          value !== '' &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
      )
    ) {
      if (status === 'In progress') updatedStatus = 'Ready';
    } else {
      updatedStatus = 'In progress';
    }

    const updateListingQuery =
      'UPDATE listings SET hometype = $1, accesstype = $2, streetaddress = $3, apt = $4, city = $5, state = $6, zipcode = $7, guests = $8, diningareas = $9, bathrooms = $10, photos = $11, amenities = $12, title = $13, description = $14, instantbook = $15, security = $16, baseprice = $17, status = $18 WHERE listingid = $19 AND hostid = $20 RETURNING *';

    const { rows } = await query(updateListingQuery, [
      homeType || null,
      accessType || null,
      streetAddress || null,
      apt || null,
      city || null,
      state || null,
      zipCode || null,
      guests || null,
      diningAreas || null,
      bathrooms || null,
      decodedPhotos,
      amenities,
      title,
      description,
      instantBook,
      security,
      basePrice,
      updatedStatus,
      listingID,
      hostid,
    ]);

    res.locals.updatedListing = rows[0];
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in hostController.updateListing middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to update a listing.' },
    });
  }
};

export default updateListing;
