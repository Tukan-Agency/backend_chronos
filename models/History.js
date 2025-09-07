const { Schema, model } = require("mongoose");

const HistorySchema = Schema({
    clientId: {
        type: String,
        require: true
    },
	requestId: {
		type: String,
		require: true
	},
    clientName: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    requestDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    value: {
        type: String,
        require: true
    }
});

module.exports = model('History', HistorySchema);
