const { Schema, model } = require('mongoose');

const ChampionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Champion = model('Champion', ChampionSchema);

module.exports = Champion;