const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAverageScore = asyncHandler(async (req, res) => {
    const { averageScore, userId } = req.body;
    console.log(averageScore)

    const user = await User.findById(userId)

    if (!user) {
        throw new ApiError(404, 'User not found')
    }
    // user.push({ averageScore })
    user.AverageScore = averageScore;
    await user.save()
    return res.status(201).json(new ApiResponse(200, user, 'Average SCore saved successfully'))

})

module.exports = getAverageScore