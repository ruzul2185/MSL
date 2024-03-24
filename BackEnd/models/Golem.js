const mongoose = require('mongoose');

const golemSchema = new mongoose.Schema({
    Element: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true,
    },
    SkillOne: {
        type: String,
        required: true
    },
    SkillOneUrl: {
        type: String,
        required: true
    },
    SkillOneDesc: {
        type: String,
        required: true
    },
    SkillSecond: {
        type: String,
        required: true
    },
    SkillSecondUrl: {
        type: String,
        required: true
    },
    SkillSecondDesc: {
        type: String,
        required: true
    },
    SkillThird: {
        type: String,
        required: true
    },
    SkillThirdUrl: {
        type: String,
        required: true
    },
    SkillThirdDesc: {
        type: String,
        required: true
    },
    PassiveSkillOne: {
        type: String,
        required: true
    },
    PassiveSkillOneFigure: {
        type: String,
        required: true
    },
    PassiveSkillSecond: {
        type: String,
        required: true
    },
    PassiveSkillSecondFigure: {
        type: String,
        required: true
    },
    PassiveSkillThird: {
        type: String,
        required: true
    },
    PassiveSkillThirdFigure: {
        type: String,
        required: true
    },
    PassiveBuffOne: {
        type: String,
        required: true
    },
    PassiveBuffOneUrl: {
        type: String,
        required: true
    },
    PassiveBuffOneFigure: {
        type: String,
        required: true
    },
    PassiveBuffOneDesc: {
        type: String,
        required: true
    },
    PassiveBuffSecond: {
        type: String,
        required: true
    },
    PassiveBuffSecondUrl: {
        type: String,
        required: true
    },
    PassiveBuffSecondFigure: {
        type: String,
        required: true
    },
    PassiveBuffSecondDesc: {
        type: String,
        required: true
    },
    PassiveBuffThird: {
        type: String,
        required: true
    },
    PassiveBuffThirdUrl: {
        type: String,
        required: true
    },
    PassiveBuffThirdFigure: {
        type: String,
        required: true
    },
    PassiveBuffThirdDesc: {
        type: String,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model('Golem', golemSchema);