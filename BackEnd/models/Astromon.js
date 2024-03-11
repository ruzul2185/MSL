const mongoose = require('mongoose');

const astromonSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    // Dropdown
    Type: {
        type: String,
        required: true
    },
    // Dropdown
    Evolution_Level: {
        type: String,
        required:true
    },
    HP: {
        type: Number,
        required: true
    },
    Attack: {
        type: Number,
        required: true
    },
    Defence: {
        type: Number,
        required: true
    },
    Recovery: {
        type: Number,
        required: true
    },
    Critical_Dmg: {
        type: Number,
        required: true
    },
    Critical_Rate: {
        type: Number,
        required: true
    },
    Resist: {
        type: Number,
        required: true
    },
    Critical_Resist: {
        type: Number,
        required: true
    },
    // Dropdown
    Element: {
        type: String,
        required: true
    },
    // Dropdown
    Active_Skill: {
        type: String,
        required: true
    },
    // Dropdown
    Passive_Skill: {
        type: String,
        required: true
    },
    Active_Book: {
        type: String,
        required: true
    },
    Passive_Book: {
        type: String,
        required: true
    },
    Astromon_Info: {
        type:String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Astromon', astromonSchema);
