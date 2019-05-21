const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3, trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5, trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3, trim: true
    }
});

module.exports = new mongoose.model('Users', UserSchema);