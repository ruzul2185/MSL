const mongoose = require('mongoose');

const astromonSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    },
    // Dropdown
    Evolution_Level: {
        type: String,
        required:true
    },
    Star: {
        type: Number,
        required: true
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
        type: String,
        required: true
    },
    Critical_Rate: {
        type: String,
        required: true
    },
    Resist: {
        type: String,
        required: true
    },
    Critical_Resist: {
        type: String,
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
    // Dropdown
    Leader_Skill: {
        type: String,
        required: true
    },
    // Dropdown
    Ultimate_Skill: {
        type: String,
        default: '',
        required: false
    },
    Active_Skill_Figure: {
        type: String,
        required: true
    },
    Passive_Skill_Figure: {
        type: String,
        required: true
    },
    Leader_Skill_Figure: {
        type: String,
        required: true
    },
    Ultimate_Skill_Figure: {
        type: String,
        default: '',
        required: false
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
