const organizationModel = require('../models/organizationModel');
const mongoose = require("mongoose");



//============================================= Create Organization =====================================//

const createOrganization = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!data.organizationName) {
            return res.status(400).send({ status: false, message: 'Please enter organizationName' });
        }

        if (!data.headQuarter) {
            return res.status(400).send({ status: false, message: 'Please enter headQuarter' });
        }

        if (!data.otherResource) {
            return res.status(400).send({ status: false, message: 'Please enter otherResource' });
        }

        let saveData = await organizationModel.create(data);
        return res.status(201).send({ status: true, message: "organization creation successfull", data: saveData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}






//============================================= Get Organization =====================================//

const getOrganizations = async (_, res) => {
    try {
        let findOraganization = await organizationModel.find();

        if (findOraganization.length == 0) {
            return res.status(400).send({ status: false, message: 'Organization not Found' });
        }

        return res.status(200).send({ status: true, message: "fetched organization details", data: findOraganization });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




//============================================= Get Organization by id =====================================//

const getOrganizationById = async (req, res) => {
    try {
        let organizationId = req.params.organizationId;

        if (!mongoose.isValidObjectId(organizationId)) {
            return res.status(400).send({ status: false, message: "organizationId is not valid ObjectId" });
        }

        let findOraganization = await organizationModel.findById({ _id: organizationId });

        if (!findOraganization) {
            return res.status(400).send({ status: false, message: 'Organization not Found' });
        }

        return res.status(200).send({ status: true, message: "organization detail", data: findOraganization });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = { createOrganization, getOrganizations, getOrganizationById }