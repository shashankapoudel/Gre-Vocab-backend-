const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
        required: true
    },
    note: {
        type: String,
        // required: true,
    },
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
    }
})
module.exports = mongoose.model('Notes', noteSchema)