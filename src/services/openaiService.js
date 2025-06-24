// openaiService.js
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const searchWord = async (query) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003", // or other models
            prompt: `What is the meaning and usage of the word "${query}"?`,
            max_tokens: 100,
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        throw error;
    }
};

module.exports = { searchWord };
