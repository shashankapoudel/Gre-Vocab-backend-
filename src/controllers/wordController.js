const User = require('../models/User');
const Word = require('../models/Word');


const getWords = async (req, res) => {
    try {
        const words = await Word.find();
        res.json(words);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getWordById = async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (!word) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json(word);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getUserUnknownWords = async (req, res) => {
    const userId = req.user._id;  // Get the logged-in user's ID

    try {
        const user = await User.findById(userId).populate('unknownWords');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.unknownWords);
    } catch (error) {

        res.status(500).json({ message: 'Error fetching unknown words' });
    }
};



const addUnknownWord = async (req, res) => {
    const { wordId } = req.body;
    const userId = req.user._id;

    try {
        const word = await Word.findById(wordId);

        if (!word) {
            return res.status(404).json({ message: 'Word not found' });
        }

        word.isUnknown = true;
        try {
            await word.save();
            console.log('Word after saving:', word);
        } catch (saveError) {
            console.error('Error during save:', saveError.message);
            return res.status(500).json({ message: 'Error saving word' });
        }
       

        const user = await User.findById(userId);

        if (!user.unknownWords.includes(wordId)) {
            user.unknownWords.push(wordId);
            await user.save();
        }
        console.log(user);

        res.status(200).json({ message: 'Word marked as unknown and added to your list' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







module.exports = {
    getWords,
    getWordById,
    getUserUnknownWords,
    addUnknownWord
};


























// const getUnknownWords = async (req, res) => {
//     try {
//         const word = await Word.find({ isUnknown: true, user: req.user._id })
//         res.status(201).json(word)
//     } catch (error) {
//         res.status(500).json({ message: err.message });
//     }
// }











// const addUnknownWord = async (req, res) => {
//     const { word, meaning, sentence } = req.body;
//     const userId = req.user._id;

//     if (!word || !meaning || !sentence) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//         const existingWord = await Word.findOne({ word, user: userId });
//         // user: mongoose.Types.ObjectId(req.user._id)
//         console.log(existingWord);



//         if (existingWord) {
//             // existingWord.meaning = meaning;
//             // existingWord.sentence = sentence;
//             existingWord.isUnknown = true;

//             const updatedWord = await existingWord.save();
//             console.log('Word updated successfully:', updatedWord);

//             return res.status(200).json(updatedWord);
//         } else {

//             const newWord = new Word({
//                 word,
//                 meaning,
//                 sentence,
//                 isUnknown: true,
//                 user: req.user._id
//             });

//             const savedWord = await newWord.save();
//             console.log('Word saved successfully:', savedWord);
//             return res.status(201).json(savedWord);
//         }
//     } catch (err) {
//         console.error('Error saving or updating word:', err.message);
//         return res.status(500).json({ message: err.message });
//     }
// };