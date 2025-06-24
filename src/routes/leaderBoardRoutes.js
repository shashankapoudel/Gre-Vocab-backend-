const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const LeaderBoard = require('../controllers/leaderBoardController');
const router = express.Router()

router.get('/leaderboard', protect, LeaderBoard)

module.exports = router