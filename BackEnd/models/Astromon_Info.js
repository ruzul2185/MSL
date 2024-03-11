const mongoose = require('mongoose');

const astromon_infoSchema = new mongoose.Schema({
    Astromon_Associated: {
        type: String,
        required: true
    },
    Passive_Skill_Name: {
        type: String,
        required: true
    },
    // Dropdown
    Passive_Skill_Target: {
        type: String,
        required: true
    },
    Passive_Skill_Desc: {
        type: String,
        required: true
    },
    Passive_Skill_Url: {
        type: String,
        required: true
    },
    Active_Skill_Name: {
        type: String,
        required: true
    },
    // Dropdown
    Active_Skill_Target: {
        type: String,
        required: true
    },
    Active_Skill_Desc: {
        type: String,
        required: true
    },
    Active_Skill_Url: {
        type: String,
        required: true
    },
    Super_Skill_Name: {
        type: String,
        default: '',
        required: false
    },
    // Dropdown
    Super_Skill_Target: {
        type: String,
        default: '',
        required: false
    },
    Super_Skill_Desc: {
        type: String,
        default: '',
        required: false
    },
    Super_Skill_Url: {
        type: String,
        default: '',
        required: false
    },
},{timestamps: true});

module.exports = mongoose.model('Astromon-Info', astromon_infoSchema);
