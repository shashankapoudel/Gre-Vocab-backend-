const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { toggleDailyEmail } = require('../controllers/notificationController');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/subscribe', protect, toggleDailyEmail)

module.exports = router;