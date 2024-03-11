const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Desc: {
        type: String,
        required: true
    },
    AI_Desc: {
        type: String,
        required: false,
        default: ''
    },
    Url: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Skill', skillSchema);
