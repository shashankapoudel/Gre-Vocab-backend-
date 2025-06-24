const express = require('express')
const { getQuizQuestions, calculateScore } = require('../controllers/quizController')

const router = express.Router()

router.get('/quizq', getQuizQuestions)
router.post('/submit', calculateScore);

module.exports = router;