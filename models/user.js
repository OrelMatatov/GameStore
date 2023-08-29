const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username:{
        type: String,
        required:true
    },

    age: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    city: {
        type: String
    },

    gender: {
        type: String,
        required: true
    },

    permissions: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('User', User)
