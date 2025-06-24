const Word = require("../models/Word");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


const getQuizQuestions = asyncHandler(async (req, res) => {
    const quizLength = parseInt(req.query.limit) || 10;
    const words = await Word.aggregate([{ $sample: { size: quizLength } }])

    const quizQuestions = words.map(word => ({
        questionId: word._id,
        question: `What is the meaning of "${word.word}"?`,
        correctAnswer: word.meaning,
        choices: generateChoices(word.meaning, words)
    }));
    return res.status(200).json(new ApiResponse(200, quizQuestions, 'Questions generated successfully'));

})

const generateChoices = (correctAnswer, words) => {
    const choices = new Set()
    choices.add(correctAnswer)

    while (choices.size < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)]
        if (randomWord.meaning !== correctAnswer) {
            choices.add(randomWord.meaning)
        }
    }
    return Array.from(choices);
}

const calculateScore = asyncHandler(async (req, res) => {
    const { answers } = req.body;  // Expects an array of { questionId, answer } objects

    // Fetch questions by their IDs
    const questionIds = answers.map(a => a.questionId);
    const questions = await Word.find({ _id: { $in: questionIds } });

    // Calculate the score by checking if each answer is correct
    let score = 0;
    answers.forEach(answer => {
        const question = questions.find(q => q._id.toString() === answer.questionId);
        if (question && question.meaning === answer.answer) {
            score += 10;  // Award 10 points for each correct answer
        }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { score }, 'Score calculated successfully'));
});

module.exports = {
    getQuizQuestions, calculateScore
}