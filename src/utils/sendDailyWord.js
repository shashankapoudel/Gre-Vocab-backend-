const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/User');
const Word = require('../models/Word');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const scheduleDailyEmail = () => {
    cron.schedule('0 9 * * *', async () => {
        // cron.schedule('* * * * *', async () => {
        // your email sending logic here
        try {
            const randomWord = await Word.aggregate([{ $sample: { size: 1 } }]);
            const wordOfTheDay = randomWord[0];
            if (!wordOfTheDay) return;

            const users = await User.find({ subscribedForDailyEmail: true });

            for (const user of users) {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: `📘 GRE Word of the Day: ${wordOfTheDay.word}`,
                    html: `
            <h2>${wordOfTheDay.word}</h2>
            <p><strong>Meaning:</strong> ${wordOfTheDay.meaning}</p>
            <p><strong>Sentence:</strong> ${wordOfTheDay.sentence}</p>
          `,
                });
            }

            console.log('✅ Daily word email sent.');
        } catch (error) {
            console.error('❌ Error sending daily word:', error.message);
        }
    });
};

module.exports = { scheduleDailyEmail };
