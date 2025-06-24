
const Word = require("../models/Word");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const addDifficulty = asyncHandler(async (req, res) => {
    const { wordId } = req.body;
    const { difficulty } = req.body; // Assuming `difficulty` is a number or string
    const userId = req.user._id;

    // Attempt to update difficulty for the existing user
    const word = await Word.findOneAndUpdate(
        { _id: wordId, "userDifficulty.userId": userId },
        { $set: { "userDifficulty.$.difficulty": difficulty } }, // Update matching element
        { new: true }
    );

    if (!word) {

        const updatedWord = await Word.findByIdAndUpdate(
            wordId,
            { $push: { userDifficulty: { userId, difficulty } } },
            { new: true }
        );
        return res.status(201).json(new ApiResponse(201, updatedWord, 'Difficulty added successfully'));
    }
    res.status(200).json(new ApiResponse(200, word, 'Difficulty updated successfully'));
});



const getDifficulty = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const words = await Word.find({})
    const filteredWords = words.map((word) => {
        const userEntry = word.userDifficulty.find((entry) => entry.userId.toString() === userId.toString())
        if (userEntry) {
            return {
                word: word.word,
                meaning: word.meaning,
                sentence: word.sentence,
                difficulty: userEntry.difficulty,
            }
        }
        return null;
    }).filter((entry) => entry !== null);
    // console.log(filteredWords)

    res.status(200).json(new ApiResponse(200, filteredWords, 'Words fetched successfully'));
})


module.exports = { addDifficulty, getDifficulty };
