const cropModel = require('../models/cropModel');
const mongoose = require("mongoose");



//============================================= Create Crop =====================================//

const createCrop = async (req, res) => {
    try {
        let data = req.body;
        const { cropFieldId, cropName, categories, nutrition, profit } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' })
        }

        if (!cropFieldId) {
            return res.status(400).send({ status: false, message: 'Please enter cropFieldId' });
        }
        if (!mongoose.isValidObjectId(cropFieldId)) {
            return res.status(400).send({ status: false, message: 'cropFieldId is not valid ObjectId' });
        }

        if (!cropName) {
            return res.status(400).send({ status: false, message: 'Please enter cropName' });
        }

        if (!categories) {
            return res.status(400).send({ status: false, message: 'Please enter categories' });
        }
        
        if (!nutrition) {
            return res.status(400).send({ status: false, message: 'Please enter nutrition' });
        }

        if (!profit) {
            return res.status(400).send({ status: false, message: 'Please enter profit' });
        }

        let saveData = await cropModel.create(data);
        return res.status(201).send({ status: true, message: 'crop creation successfull', data: saveData });
    } 
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}





//============================================= get Crop =====================================//

const getCrop = async (_, res) => {
    try {
        let findData = await cropModel.find().populate({ path: 'cropFieldId', populate: [{ path: 'cropPropertyId', model: 'CropProperty' }] });

        if (findData.length == 0) {
            return res.status(400).send({ status: false, message: `crop data is not Found` });
        }
        return res.status(200).send({ status: true, message: 'crop details', data: findData });
    } 
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = { createCrop, getCrop }