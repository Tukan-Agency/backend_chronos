const { Schema, model } = require("mongoose");

const PackageSchema = Schema({
    name: {
        type: String,
        require: true
    },
    apalancamiento : {
        type: Number,
        require: true
    },
    deposit: {
        type: Number,
        require: true
    },
    spreadType: {
        type: String,
        require: true
    },
    spredPip: {
        type: Number,
        require: true
    },
    openOrders: {
        type: Number,
        require: true
    }
});

module.exports = model('Package', PackageSchema);