const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    title: {
        type: String,
        required: true
    },

    platform: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    about: {
        type: String
    },

    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Game', Game)