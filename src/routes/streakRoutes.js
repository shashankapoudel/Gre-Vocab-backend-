const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const getUserStreak = require('../controllers/streakController');
const router = express.Router()

router.get('/streak', protect, getUserStreak)

module.exports = router;