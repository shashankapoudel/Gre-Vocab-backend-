const mongoose = require('mongoose');

const userWordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },

    easinessFactor: { type: Number, default: 2.5 },
    interval: {
        type: Number,
        default: 0
    },

    repetitionCount: {
        type: Number,
        default: 0
    },

    nextReviewDate: {
        type: Date,
        default: Date.now
    },

    lastReviewedDate: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: ['new', 'learning', 'mastered'],
        default: 'new'
    }
});

userWordSchema.index({ userId: 1, wordId: 1 }, { unique: true });

module.exports = mongoose.model('UserWord', userWordSchema);
