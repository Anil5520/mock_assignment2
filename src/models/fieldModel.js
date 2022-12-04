const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const fieldSchema = new mongoose.Schema({
    regionId: {
        type: ObjectId,
        ref: 'Region',
        required: true,
        trim: true
    },
    propertyId: {
        type: ObjectId,
        ref: 'property',
        required: true,
        trim: true
    },
    agricultureFeild: {
        type: String,
        required: true,
        trim: true
    },
    farmSize: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    cropRecords: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Field', fieldSchema);