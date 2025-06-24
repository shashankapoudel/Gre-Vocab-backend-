// tests/quizSocket.test.js
const io = require('socket.io-client');

describe('Multiplayer Quiz Socket Tests', () => {
    let client1, client2;

    beforeAll((done) => {
        client1 = io.connect('http://localhost:5000');
        client2 = io.connect('http://localhost:5000');

        let connectedClients = 0;

        const onConnect = () => {
            connectedClients++;
            if (connectedClients === 2) {
                console.log('Both clients connected');
                done();
            }
        };

        client1.on('connect', onConnect);
        client2.on('connect', onConnect);
    });

    afterAll(() => {
        client1.disconnect();
        client2.disconnect();
    });

    test('Clients should join the same room and start quiz', (done) => {
        const roomId = 'quizRoom1';
        let joinCount = 0;

        // Emit join event for both clients
        client1.emit('joinQuiz', { roomId, username: 'Player1' });
        client2.emit('joinQuiz', { roomId, username: 'Player2' });

        // Verify both clients receive the `userJoined` event
        const checkJoin = (data) => {
            console.log(`Received join event for ${data.username}`);
            expect(data).toHaveProperty('username');
            joinCount++;

            if (joinCount === 2) {
                setTimeout(() => {
                    client1.emit('startQuiz', roomId);
                }, 100); // Wait a bit before emitting startQuiz
            }
        };

        client1.on('userJoined', checkJoin);
        client2.on('userJoined', checkJoin);

        // Verify that quizQuestions are received by both clients
        const handleQuizQuestions = (questions) => {
            console.log('Received quiz questions');
            expect(Array.isArray(questions)).toBe(true);
            if (joinCount === 2) done();  // Only call done once all checks are complete
        };

        client1.on('quizQuestions', handleQuizQuestions);
        client2.on('quizQuestions', handleQuizQuestions);
    }, 15000); // Keep timeout at 15 seconds
});
