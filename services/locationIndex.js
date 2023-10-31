const { Location } = require('../models');

const createNewLocationApi = async (locationObj) => {
  try {
    return await Location.create(locationObj);
  } catch (error) {
    throw error;
  }
};
const updateLocationDataApi = async (recordId, recordStatus) => {
  //update on locations table
  try {
    return await Location.update(
      {
        recordStatus: recordStatus,
      },
      { where: { id: recordId } }
    );
  } catch (error) {
    throw error;
  }
};
const updateLocationInformationApi = async (recordId, updateData) => {
  try {
    // Create an object to hold the fields you want to update
    const fieldsToUpdate = {};

    if (updateData.name) {
      fieldsToUpdate.name = updateData.name;
    }
    if (updateData.notes) {
      fieldsToUpdate.notes = updateData.notes;
    }
    if (updateData.long) {
      fieldsToUpdate.long = updateData.long;
    }
    if (updateData.lat) {
      fieldsToUpdate.lat = updateData.lat;
    }

    // Check if there are fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error('No fields to update provided.');
    }

    // Add the condition to update records where recordStatus is "LATEST"
    fieldsToUpdate.recordStatus = 'LATEST';

    // Perform the update
    const [rowsUpdated] = await Location.update(fieldsToUpdate, {
      where: { id: recordId, recordStatus: 'LATEST' },
    });

    if (rowsUpdated === 0) {
      throw new Error(
        `No records with recordStatus "LATEST" were updated for ID ${recordId}`
      );
    }

    return `Record with ID ${recordId} and recordStatus "LATEST" updated successfully. Rows updated: ${rowsUpdated}`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewLocationApi,
  updateLocationDataApi,
  updateLocationInformationApi,
};
