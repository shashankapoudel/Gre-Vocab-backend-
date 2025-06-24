const express = require('express')
const { addDifficulty, getDifficulty } = require('../controllers/difficultyController')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/word/difficulty', protect, addDifficulty)
router.get('/word/difficult-word', protect, getDifficulty)

module.exports = router;