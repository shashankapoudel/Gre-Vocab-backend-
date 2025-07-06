const User = require('../models/User')

const toggleDailyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.subscribedForDailyEmail = !user.subscribedForDailyEmail;
        await user.save();

        res.json({
            user,
            message: user.subscribedForDailyEmail
                ? 'Subscribed to daily email'
                : 'Unsubscribed from daily email',
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { toggleDailyEmail }