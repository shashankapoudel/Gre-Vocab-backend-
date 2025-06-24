
const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,

    },
    meaning: {
        type: String,
        required: true,
    },
    sentence: {
        type: String,
        required: true,
    },
    isUnknown: {
        type: Boolean,
        default: false,
    },
    userDifficulty: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            difficulty: {
                type: String,
                enum: ['easy', 'medium', 'hard'],
                default: ''
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    }
});
WordSchema.index({ word: 1, user: 1 }, { unique: true });
module.exports = mongoose.model('Word', WordSchema);

