const router = require('express').Router();
const {
  createNewLocation,
  getLocations,
  updateLocationData,
  deleteLocation,
} = require('../controllers/location');
///create new location route
router.post('/createNewLocation', createNewLocation);
//get locations
router.post('/getLocations', getLocations);
//update location
router.post('/updateLocation', updateLocationData);
//delete locations
router.post('/deleteLocation', deleteLocation);

module.exports = router;
