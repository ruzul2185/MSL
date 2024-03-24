const mongoose = require('mongoose');

const apophisSchema = new mongoose.Schema({
    Element: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    },
    PassiveSkill: {
        type: String,
        required: true
    },
    PassiveSkillFigure: {
        type: String,
        required: true,
    },
    ActiveSkill: {
        type:String,
        required: true
    },
    ActiveSkillFigure: {
        type: String,
        required: true
    },
    AOESkill: {
        type: String,
        required: true
    },
    AOESkillFigure: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Apophis', apophisSchema);
