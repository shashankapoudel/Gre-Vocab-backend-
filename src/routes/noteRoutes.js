const express = require('express');
const { addNote, getNote } = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/note', protect, addNote)
router.get('/note/:wordId', protect, getNote)

module.exports = router;