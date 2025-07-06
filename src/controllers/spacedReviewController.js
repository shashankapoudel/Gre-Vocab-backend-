const UserWord = require("../models/userWord");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { mapDifficultyToQuality, updateSpacedRepetition } = require("../utils/spacedAlgo");


const getDueWords = asyncHandler(async (req, res) => {
    const today = new Date();
    const userId = req.params.userId;

    const deuWords = await UserWord.find({
        userId,
        nextReviewDate: { $lte: today },
        status: { $ne: 'mastered' }

    }).populate('wordId')

    return re.status(201).json(new ApiResponse(201, deuWords, 'deuWords sent successfully'))

})

const submitReview = asyncHandler(async (req, res) => {
    const { userWordId, difficulty } = req.body;

    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        res.status(404);
        throw new Error('UserWord not found');
    }

    const quality = mapDifficultyToQuality(difficulty);
    updateSpacedRepetition(userWord, quality);
    await userWord.save();

    return res.status(201).json(new ApiResponse(201, userWord))
});


const addUserWord = asyncHandler(async (req, res) => {
    const { userId, wordId } = req.body;

    const existing = await UserWord.findOne({ userId, wordId });
    if (existing) {
        res.status(400);
        throw new Error('UserWord already exists');
    }

    const userWord = new UserWord({ userId, wordId });
    await userWord.save();

    res.status(201).json(new ApiResponse(201, userWord))
});

module.exports = { getDueWords, submitReview, addUserWord }