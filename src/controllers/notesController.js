const Notes = require("../models/Notes");
const Word = require("../models/Word");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const addNote = asyncHandler(async (req, res) => {
    const { wordId, note, wordToAdd } = req.body;
    console.log(wordToAdd)
    console.log(note);
    const userId = req.user._id;

    let existingNote = await Notes.findOne({ wordId, userId })
    if (existingNote) {
        existingNote.note = note;
        await existingNote.save();
        return res.status(201).json(new ApiResponse(200, existingNote, 'Notes added successfully'))
    } else {
        const newNote = Notes.create({ userId, wordId, note })
        return res.status(201).json(new ApiResponse(200, newNote, 'Notes added successfully'))
    }
})


const getNote = asyncHandler(async (req, res) => {
    const { wordId } = req.params;
    const userId = req.user._id;

    const notes = await Notes.findOne({ userId, wordId })
    return res.status(201).json(new ApiResponse(200, notes, 'Notes retrieved successfully'))

})
module.exports = { addNote, getNote }