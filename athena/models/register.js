const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerModel = new Schema({
    email: {
        type: String,
        required: true
    },

    token: {
        type: String,
        required: true
    },

    tokenExpiration: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Register', registerModel);
