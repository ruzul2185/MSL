const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model('Member', memberSchema);
