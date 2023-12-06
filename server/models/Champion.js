const { Schema, model } = require('mongoose');

const ChampionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
});

const Champion = model('Champion', ChampionSchema);

module.exports = Champion;