const { Schema, model } = require("mongoose");

const NewsSchema = Schema({
    new: {
        type: String,
        require: true
    },
});

module.exports = model('News', NewsSchema);