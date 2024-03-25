const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Element: {
        type: String,
        required: true
    },
    TeamURL: {
        type: String,
        required: true
    },
    TeamDamage: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Team', teamSchema);