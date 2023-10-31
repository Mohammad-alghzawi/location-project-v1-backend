//all needeed files
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Location } = require("../../models");
const { arrayOfIds } = require("../../util/queryBuilder");
const {
  createNewLocationApi,
  updateLocationDataApi,
  updateLocationInformationApi,
} = require("../../services/locationIndex");

const createNewLocation = async (req, res) => {
  const { name, notes, lat, long } = req.body;
  try {
    let mapObj = {
      name,
      notes,
      lat,
      long,
    };
    let response = await createNewLocationApi(mapObj);
    res.status(201).json({
      status: "success",
      row: {
        response,
      },
    });
  } catch (error) {
    console.error(error, "error from creating location");
    res.status(402).json({
      status: "failed",
      message: error.message,
      stack: error.stack,
    });
  }
};
const getLocations = async (req, res) => {
  const { arrayId } = req.body;

  try {
    let whereCondition = {
      [Op.and]: [
        arrayId ? arrayOfIds("user_id", "in", arrayId) : null,
        {
          record_status: "LATEST",
        },
      ],
    };

    let locations = await Location.findAll({
      where: whereCondition,
    });
    res.status(200).json({
      status: "success",
      results: locations.length,
      row: {
        locations,
      },
    });
  } catch (error) {
    res.status(402).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateLocationData = async (req, res) => {
  try {
    const { recordId, name, notes, long, lat } = req.body;

    if (typeof recordId === "undefined") {
      return res.status(400).json({
        status: "failed",
        message: "recordId is required in the request body",
      });
    }
    const updateData = {
      name, // You can add more fields as needed
      notes,
      long,
      lat,
    };

    const response = await updateLocationInformationApi(recordId, updateData);

    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    console.error(error, "error from updating");
    res.status(402).json({
      status: "failed",
      message: error.message,
      stack: error.stack,
    });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { recordId } = req.body;
    let response = await updateLocationDataApi(recordId, "DELETED");
    console.log(response, "what is the response");
    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    console.error(error, "errorerror");
    res.status(402).json({
      status: "failed",
      message: error.message,
      stack: error.stack,
    });
  }
};
///export modules
module.exports = {
  createNewLocation,
  getLocations,
  updateLocationData,
  deleteLocation,
};

const findMatchingRecord = (recordId) => {
  try {
    let resp = Location.findOne({
      where: { id: recordId, record_status: "LATEST" },
    });
    return resp;
  } catch (error) {
    throw error;
  }
};

//upload image
