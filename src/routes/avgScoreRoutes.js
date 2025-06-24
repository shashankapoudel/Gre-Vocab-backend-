const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const getAverageScore = require('../controllers/averageScoreController');
const router = express.Router()

router.post('/avgscore', protect, getAverageScore)

module.exports = router;