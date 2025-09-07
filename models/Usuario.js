const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true,
    },
    birthday: {
        type: Date,
        require: true,
    },
    email: {
        type: String,
        required: true,
        require: true
    },
    address: {
        type: String,
        require: true,
    },
    company: {
        type: String,
        require: true,
    },
    contactNumber: {
        type: Number,
        require: true,
    },
    whatsapp: {
        type: Number,
        require: true,
    },
    country: {
        name: {
            type: String,
            require: true,
        },
        code: {
            type: String,
            require: true,
        },
        flag: {
            type: String,
            require: true
        }
    },
    currency: {
        name: {
            type: String,
            require: true,
        },
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        require: true,
    },
    package: {
        packageId: {
            type: String,
            require: true
        },
        packageName: {
            type: String,
            require: true
        }
    },
	sequenceId: {
		type: Number,
		required: true,
		require: true,
		unique: true
	}
});

module.exports = model('Usuario', UsuarioSchema);
