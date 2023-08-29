const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Purchase = new Schema({
    gamesId: [
        {
            gameId: {
                type: Schema.Types.ObjectId,
                ref:'Game',
                required:true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },
    
    date: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('Purchase', Purchase)