const express = require('express');
const { getWordData } = require('../controllers/worddictionary');
const router = express.Router();

// Route for looking up a word
router.get('/wordic', getWordData);

module.exports = router;
