const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = model('User', userSchema);

module.exports = User