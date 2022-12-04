const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const propertySchema = new mongoose.Schema({
    organizationId: {
        type: ObjectId,
        ref: 'Organization',
        required: true
    },
    ownerShip: {
        type: String,
        enum: ["owned", "lease"],
        trim: true
    },
    purchaseDate: {
        type: String,
        trim: true
    },
    leasePeriod: {
        type: String,
        trim: true
    },
    fieldArea: {
        type: String,
        required: true,
        trim: true
    },
    propertyLocation: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);