const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    unknownWords:
        [
            {

                type: mongoose.Schema.Types.ObjectId,
                ref: "Word"
            }
        ],

    scores: [
        {
            score: {

                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            fullmark: {
                type: Number,
                required: true
            },
        }],
    AverageScore: {
        type: Number,
        // required: true

    },

    lastActiveDate: {
        type: Date,
        default: null

    },
    streakCount: {
        type: Number,
        default: 0
    }

})
module.exports = mongoose.model('User', UserSchema)