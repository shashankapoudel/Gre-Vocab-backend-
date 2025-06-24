const User = require("../models/User");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const LeaderBoard = asyncHandler(async (req, res) => {
    const leaderBoard = await User.find({}).sort({ AverageScore: -1 })//SortUserByScoreInDescendingOrder
        .limit(10)//upto 10 users

    return res.status(201).json(new ApiResponse(200, leaderBoard, 'LeaderBoard created successfully'))
})
module.exports = LeaderBoard;