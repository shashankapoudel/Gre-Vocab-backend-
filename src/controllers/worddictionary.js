const axios = require('axios');

// Controller to get the meaning and sentence of a word
const getWordData = async (req, res) => {
    const word = req.query.word; // Get the word from the request parameters

    try {
        // Fetch word data from Free Dictionary API
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const wordData = response.data[0];

        // Extract necessary information
        const meaning = wordData.meanings[0].definitions[0].definition;
        const example = wordData.meanings[0].definitions[0].example || 'No example available';

        // Send the meaning and example as a response
        res.status(200).json({
            word: wordData.word,
            meaning,
            example
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching word data",
            error: error.message
        });
    }
};

module.exports = { getWordData };
