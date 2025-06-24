// const mongoose = require('mongoose');
// const Word = require('../models/Word');  // Path to the Word model
// const wordsData = require('../../data/words.json');  // Path to the words.json file
// const connectDB = require('../config/db');  // Path to the db.js file

// const importData = async () => {
//     try {
//         await connectDB();
//         await Word.deleteMany(); // Clear existing data in the collection
//         await Word.insertMany(wordsData); // Insert data from words.json
//         console.log('Data Imported...');
//         process.exit();
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// };

// importData();

const mongoose = require('mongoose');
const Word = require('../models/Word');  // Path to the Word model
const wordsData = require('../../data/words.json');  // Path to the words.json file
const connectDB = require('../config/db');  // Path to the db.js file

const importData = async () => {
    try {
        await connectDB();

        // Loop through the words in the json file
        for (const wordData of wordsData) {
            // Check if the word already exists in the database
            const existingWord = await Word.findOne({ word: wordData.word });
            if (!existingWord) {
                // If the word doesn't exist, insert it
                await Word.create(wordData);
            } else {
                console.log(`Word "${wordData.word}" already exists in the database.`);
            }
        }

        console.log('New Words Imported...');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

importData();


