
const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const addUserScore = asyncHandler(async (req, res) => {
    const { score, userId, fullmark } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    user.scores.push({ score, fullmark });
    const today = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

    if (lastActive) {
        const diffTime = Math.abs(today - lastActive);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            user.streakCount += 1;
        } else if (diffDays > 1) {
            user.streakCount = 1;
        }
    } else {
        user.streakCount = 1;
    }
    
    user.lastActiveDate = today;
    await user.save();
    return res.status(201).json(new ApiResponse(200, 'Score and streak saved successfully'));
});

const getUserScores = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(new ApiResponse(200, user.scores, 'Scores received successfully'));
});

module.exports = { addUserScore, getUserScores };
