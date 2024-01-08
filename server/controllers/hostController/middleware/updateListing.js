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
    const {
      accessibility,
      accesstype,
      additionalrules,
      amenities,
      apt,
      baseprice,
      bathrooms,
      cancellationpolicy,
      city,
      description,
      diningareas,
      filmingallowed,
      gettingarounddescription,
      guestaccessdescription,
      guestinteraction,
      guests,
      hometype,
      instantbook,
      neighborhooddescription,
      otherdescription,
      petsallowed,
      photos,
      published,
      security,
      size,
      smokingallowed,
      spacedescription,
      state,
      status,
      streetaddress,
      title,
      unavailable,
      wifidetails,
      zipcode,
      listingid,
    } = req.body.currentHostListing;

    const decodedPhotos = photos.map((photo) => {
      const updatedString = photo.split(',')[1];
      // eslint-disable-next-line no-undef
      return Buffer.from(updatedString, 'base64');
    });

    const { hostid } = res.locals.host;

    let updatedStatus;

    if (
      [
        hometype,
        accesstype,
        streetaddress,
        city,
        state,
        zipcode,
        guests,
        diningareas,
        bathrooms,
        amenities,
        photos,
        title,
        description,
        instantbook,
        security,
        baseprice,
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
      'UPDATE listings SET hometype = $1, accesstype = $2, streetaddress = $3, apt = $4, city = $5, state = $6, zipcode = $7, guests = $8, diningareas = $9, bathrooms = $10, photos = $11, amenities = $12, title = $13, description = $14, instantbook = $15, security = $16, baseprice = $17, status = $18, accessibility = $19, additionalrules = $20, cancellationpolicy = $21, filmingallowed = $22, gettingarounddescription = $23, guestaccessdescription = $24, guestinteraction = $25, neighborhooddescription = $26, otherdescription = $27, petsallowed = $28, published = $29, size = $30, smokingallowed = $31, spacedescription = $32, unavailable = $33, wifidetails = $34 WHERE listingid = $35 AND hostid = $36 RETURNING *';

    const { rows } = await query(updateListingQuery, [
      hometype,
      accesstype,
      streetaddress,
      apt,
      city,
      state,
      zipcode,
      guests,
      diningareas,
      bathrooms,
      decodedPhotos,
      amenities,
      title,
      description,
      instantbook,
      security,
      baseprice,
      updatedStatus,
      accessibility,
      additionalrules,
      cancellationpolicy,
      filmingallowed,
      gettingarounddescription,
      guestaccessdescription,
      guestinteraction,
      neighborhooddescription,
      otherdescription,
      petsallowed,
      published,
      size,
      smokingallowed,
      spacedescription,
      unavailable,
      wifidetails,
      listingid,
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
