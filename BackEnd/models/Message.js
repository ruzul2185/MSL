const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    SubTitle: {
        type: String,
        required: false,
        default:''
    },
    Body: {
        type: String,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model('Message', messageSchema);
