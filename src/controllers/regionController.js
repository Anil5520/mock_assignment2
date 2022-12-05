const regionModel = require('../models/regionModel');
const mongoose = require("mongoose");



//============================================= Create Region  =====================================//

const createRegion = async (req, res) => {
    try {
        let data = req.body;
        const { propertyId, state, agriculturalRegion, cropType } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!propertyId) {
            return res.status(400).send({ status: false, message: 'Please enter propertyId' });
        }
        if (!mongoose.isValidObjectId(propertyId)) {
            return res.status(400).send({ status: false, message: 'propertyId is not valid ObjectId' });
        }

        if (!state) {
            return res.status(400).send({ status: false, message: 'Please enter state' });
        }

        if (!agriculturalRegion) {
            return res.status(400).send({ status: false, message: 'Please enter agriculturalRegion' });
        }

        if (!cropType) {
            return res.status(400).send({ status: false, message: 'Please enter cropType' });
        }

        let saveData = await regionModel.create(data)
        return res.status(201).send({ status: true, message: "region creation successFull", data: saveData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




//============================================= Get Region  =====================================//

const getRegion = async (req, res) => {
    try {
        let propertyId = req.params.propertyId;

        if (!mongoose.isValidObjectId(propertyId)) {
            return res.status(400).send({ status: false, message: 'propertyId is not valid ObjectId' });
        }

        let findData = await regionModel.find({ propertyId }).populate({ path: 'propertyId', populate: [{ path: 'organizationId', model: 'Organization' }] });

        if (!findData) {
            return res.status(400).send({ status: false, message: 'Region not Found' });
        }
        return res.status(200).send({ status: true, message: "region details", data: findData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




//============================================= Get Region by id =====================================//

const getRegionById = async (req, res) => {
    try {
        let propertyId = req.params.propertyId;
        let regionId = req.params.regionId;

        if (!mongoose.isValidObjectId(propertyId) || !mongoose.isValidObjectId(regionId)) {
            return res.status(400).send({ status: false, message: 'propertyId or regionId is not valid ObjectId' });
        }

        let findData = await regionModel.findOne({ propertyId, _id: regionId }).populate({ path: 'propertyId', populate: [{ path: 'organizationId', model: 'Organization' }] });

        if (!findData) {
            return res.status(400).send({ status: false, message: 'Region not Found' });
        }
        return res.status(200).send({ status: true, message: "region detail", data: findData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = { createRegion, getRegion, getRegionById }