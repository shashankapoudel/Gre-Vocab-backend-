const express = require('express');
const { addUserScore, getUserScores } = require('../controllers/scoreController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/save-score', protect, addUserScore)
router.get('/get-score', protect, getUserScores)

module.exports = router;