
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors')


dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5174',
        'http://localhost:5173',
        'https://grevocab-frontend.vercel.app',
        "https://shashankapoudel.com.np"],
    methods: ["POST", "GET", "PUT"]
}));

app.use('/api/words', require('./src/routes/wordRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/quiz', require('./src/routes/quizRoutes'))
app.use('/api', require('./src/routes/worddicRoutes'))
app.use('/api', require('./src/routes/pdfRoutes'))
app.use('/api/score', require('./src/routes/scoreRoutes'))
app.use('/api/user', require('./src/routes/streakRoutes'))
app.use('/api/avg', require('./src/routes/avgScoreRoutes'))
app.use('/api/', require('./src/routes/leaderBoardRoutes'))
app.use('/api', require('./src/routes/noteRoutes'))

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

