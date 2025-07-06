function updateSpacedRepetition(userWord, quality) {
    if (quality < 3) {
        userWord.repetitionCount = 0;
        userWord.interval = 1; // retry tomorrow
    } else {
        if (userWord.repetitionCount === 0) {
            userWord.interval = 1;
        } else if (userWord.repetitionCount === 1) {
            userWord.interval = 6;
        } else {
            userWord.interval = Math.round(userWord.interval * userWord.easinessFactor);
        }
        userWord.repetitionCount += 1;

        userWord.easinessFactor = userWord.easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (userWord.easinessFactor < 1.3) userWord.easinessFactor = 1.3;
    }
    userWord.nextReviewDate = new Date(Date.now() + userWord.interval * 24 * 60 * 60 * 1000);
    userWord.lastReviewedDate = new Date();

    userWord.status = userWord.repetitionCount >= 5 ? 'mastered' : 'learning';

    return userWord;
}

function mapDifficultyToQuality(difficulty) {
    switch (difficulty) {
        case 'easy': return 5;
        case 'medium': return 3;
        case 'hard': return 2;
        default: return 0;
    }
}

module.exports = { updateSpacedRepetition, mapDifficultyToQuality };
