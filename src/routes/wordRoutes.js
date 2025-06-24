const express = require('express');
const router = express.Router();
const { getWords, getWordById, addUnknownWord, getUnknownWords, getUserUnknownWords } = require('../controllers/wordController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/words', protect, getWords);
router.get('/words/:id', protect, getWordById);
router.post('/unknown', protect, addUnknownWord);
router.get('/unknown-words', protect, getUserUnknownWords);

module.exports = router;
