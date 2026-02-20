import { delay } from '../Utils/General.js';
import { rollDice, getRandomBlock } from '../Utils/Dice.js';
import { logResult } from '../Utils/Logger.js';
import { generateRoundRobin } from '../Utils/Schedule.js';
import { Winner } from './Tiebreaker.js';

async function playRaceEngine(players) {
    const schedule = generateRoundRobin(players);

    for (let round = 0; round < schedule.length; round++) {
        console.log(`\n========== RODADA ${round + 1} ==========`);
        await delay(1500);
        const matchups = schedule[round];

        for (let match = 0; match < matchups.length; match++) {
            const { p1, p2 } = matchups[match];
            console.log(`\n${p1.NAME} VS ${p2.NAME}`);
            await delay(1000);

            let dice1 = await rollDice();
            let dice2 = await rollDice();

            let block = await getRandomBlock();
            console.log(`Bloco sorteado: ${block}`);
            await delay(500);

            let skillTest1 = 0;
            let skillTest2 = 0;

            if (block === "RETA") {
                skillTest1 += await logResult(p1.NAME, block, dice1, p1.SPEED);
                skillTest2 += await logResult(p2.NAME, block, dice2, p2.SPEED);
            } else if (block === "CURVA") {
                skillTest1 += await logResult(p1.NAME, block, dice1, p1.HANDLING);
                skillTest2 += await logResult(p2.NAME, block, dice2, p2.HANDLING);
            } else if (block === "CONFRONTO") {
                let powerResult1 = await logResult(p1.NAME, block, dice1, p1.POWER);
                let powerResult2 = await logResult(p2.NAME, block, dice2, p2.POWER);
                if (powerResult1 > powerResult2 && p2.POINTS > 0) {
                    p2.POINTS -= 1;
                    console.log(`${p1.NAME} venceu! ${p2.NAME} perdeu 1 ponto!\n-----------------------------------------`);
                } else if (powerResult2 > powerResult1 && p1.POINTS > 0) {
                    p1.POINTS -= 1;
                    console.log(`${p2.NAME} venceu! ${p1.NAME} perdeu 1 ponto!\n-----------------------------------------`);
                } else {
                    console.log(`Confronto empatado!!!\n-----------------------------------------`);
                }
                await delay(2000);
                continue;
            }
            await delay(500);

            if (skillTest1 > skillTest2) {
                p1.POINTS++;
                console.log(`\n${p1.NAME} marcou 1 ponto!\n-----------------------------------------`);
            } else if (skillTest2 > skillTest1) {
                p2.POINTS++;
                console.log(`\n${p2.NAME} marcou 1 ponto!\n-----------------------------------------`);
            } else {
                console.log(`\nEMPATE!!!\n-----------------------------------------`);
            }
            await delay(2000);
        }
    }

    console.log(`\n========== RESULTADO FINAL ==========`);
    await Winner(players);
}

export { playRaceEngine };
