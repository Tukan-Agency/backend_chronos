const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
    clientId: {
        type: String,
        require: true
    },
    operationActions: [{
        name: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        benefit: {
            type: Number,
            require: true,
        }
    }],
    operationStatus: {
        type: String,
        require: true,
    },
    operationNumber: {
        type: Number,
        require: true,
    },
    operationDate: {
        type: Date,
        require: true,
    },
    operationValue: {
        type: Number,
        require: true
    },
	isCapital:{
		type: Boolean,
		require: true
	},
	isWithdrawl:{
		type: Boolean,
		require: true
	}
});

module.exports = model('Order', OrderSchema);
