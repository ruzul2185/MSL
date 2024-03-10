const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        default: "User"
    },
    active: {
        type: Boolean,
        default: true
    },
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
