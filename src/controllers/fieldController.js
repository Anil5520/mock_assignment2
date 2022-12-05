const fieldModel = require('../models/fieldModel');
const mongoose = require("mongoose");




//============================================= Create Field =====================================//

const createField = async (req, res) => {
    try {
        let data = req.body;
        let { regionId, propertyId, agricultureFeild, farmSize, longitude, latitude, cropRecords } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!regionId) {
            return res.status(400).send({ status: false, message: 'Please enter regionId' });
        }
        if (!mongoose.isValidObjectId(regionId)) {
            return res.status(400).send({ status: false, message: 'regionId is not valid ObjectId' })
        }

        if (!propertyId) {
            return res.status(400).send({ status: false, message: 'Please enter propertyId' });
        }
        if (!mongoose.isValidObjectId(propertyId)) {
            return res.status(400).send({ status: false, message: 'propertyId is not valid ObjectId' });
        }

        if (!agricultureFeild) {
            return res.status(400).send({ status: false, message: 'Please enter agricultureFeild' });
        }

        if (!farmSize) {
            return res.status(400).send({ status: false, message: 'Please enter farmSize' });
        }

        if (!longitude) {
            return res.status(400).send({ status: false, message: 'Please enter longitude' });
        }

        if (!latitude) {
            return res.status(400).send({ status: false, message: 'Please enter latitude' });
        }

        if (!cropRecords) {
            return res.status(400).send({ status: false, message: 'Please enter cropRecords' });
        }

        let saveData = await fieldModel.create(data);
        return res.status(201).send({ status: true, message: 'field creation successfull', data: saveData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}





//============================================= Get Field =====================================//

const getField = async (req, res) => {
    try {
        let regionId = req.params.regionId;

        if (!mongoose.isValidObjectId(regionId)) {
            return res.status(400).send({ status: false, message: 'regionId is not valid ObjectId' });
        }
        
        let findData = await fieldModel.find({ regionId }).populate({ path: 'propertyId', populate: [{ path: 'organizationId', model: 'Organization' }] }).populate('regionId');

        if (findData.length == 0) {
            return res.status(400).send({ status: false, message: 'Field not Found' });
        }
        return res.status(200).send({ status: true, message: 'field details', data: findData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




//============================================= Get Field by id =====================================//

const getFieldById = async (req, res) => {
    try {
        let regionId = req.params.regionId;
        let fieldId = req.params.fieldId;

        if (!mongoose.isValidObjectId(regionId) || !mongoose.isValidObjectId(fieldId)) {
            return res.status(400).send({ status: false, message: 'regionId or fieldId is not valid ObjectId' });
        }
        let findData = await fieldModel.findOne({ regionId, fieldId }).populate({ path: 'propertyId', populate: [{ path: 'organizationId', model: 'Organization' }] }).populate('regionId');

        if (!findData) {
            return res.status(400).send({ status: false, message: 'Field not Found' });
        }
        return res.status(200).send({ status: true, message: 'field detail', data: findData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = { createField, getField, getFieldById }