const express = require('express');
const router = express.Router();


const { signUp, login } = require('../controllers/userController');
const { authentication, authorization } = require('../middlewares/auth');

const { createOrganization, getOrganizations, getOrganizationById } = require('../controllers/organizationController');
const { createProperty, getProperty, getPropertyById } = require('../controllers/propertyController');
const { createRegion, getRegion, getRegionById } = require('../controllers/regionController');
const { createField, getField, getFieldById } = require('../controllers/fieldController');

const { createCrop, getCrop } = require('../controllers/cropController');
const { createCropField } = require('../controllers/cropFieldController');
const { createCropProperty } = require('../controllers/cropPropertyController');



//----------------------------- User's API -----------------------------//
router.post('/signup', signUp);
router.post('/login', login);


// POST API
router.post('/:userId/createOrganization', authentication, authorization, createOrganization);
router.post('/:userId/createProperty', authentication, authorization, createProperty);
router.post('/:userId/createRegion', authentication, authorization, createRegion);
router.post('/:userId/createField', authentication, authorization, createField);

router.post('/:userId/createCropProperty', authentication, authorization, createCropProperty);
router.post('/:userId/createCropField', authentication, authorization, createCropField);
router.post('/:userId/createCrop', authentication, authorization, createCrop);


// GET API
router.get('/getOrganization', authentication, getOrganizations);
router.get('/:organizationId/getOrganization', authentication, getOrganizationById);

router.get('/:organizationId/getProperty', authentication, getProperty);
router.get('/:organizationId/getProperty/:propertyId', authentication, getPropertyById);

router.get('/:propertyId/getRegion', authentication, getRegion);
router.get('/:propertyId/getRegion/:regionId', authentication, getRegionById);

router.get('/:regionId/getField', authentication, getField);
router.get('/:regionId/getField/:fieldId', authentication, getFieldById);

router.get('/getCrop', authentication, getCrop);



//----------------------------- For invalid end URL -----------------------------//
router.all('/**', function (_, res) {
    return res.status(400).send({ status: false, message: "Invalid http request" });
})


module.exports = router;