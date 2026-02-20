import { shuffleArray } from './General.js';

function generateRoundRobin(playersList) {
    const shuffled = shuffleArray(playersList);
    const n = shuffled.length;
    const rotating = [...shuffled];
    const rounds = [];

    for (let round = 0; round < n - 1; round++) {
        const matchups = [];
        for (let i = 0; i < n / 2; i++) {
            matchups.push({ p1: rotating[i], p2: rotating[n - 1 - i] });
        }
        rounds.push(matchups);

        const last = rotating.pop();
        rotating.splice(1, 0, last);
    }

    return rounds;
}

export { generateRoundRobin };
