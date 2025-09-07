const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
    clientId: {
        type: String,
        require: true
    },
    clientName: {
        type: String,
        require: true
    },
    ibanAccount: {
        type: String,
        // require: true
    },
    bankName: {
        type: String,
        require: true
    },
    numberAccount: {
        type: Number,
        // require: true
    },
    requestedValue: {
        type: Number,
        require: true
    },
    requestStatus: {
        type: String,
        require: true
    },
    requestDate:{
        type: Date,
        require: true
    },
    requestType:{
        type: String,
        require: true
    }
});

module.exports = model('Request', OrderSchema);
