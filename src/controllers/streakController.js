const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getUserStreak = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    return res.status(201).json(new ApiResponse(200, user.streakCount))
})

module.exports = getUserStreak