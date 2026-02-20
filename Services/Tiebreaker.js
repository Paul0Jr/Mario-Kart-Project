import { delay } from '../Utils/General.js';
import { rollDice, getRandomBlock } from '../Utils/Dice.js';
import { logResult } from '../Utils/Logger.js';

async function tiebreaker(tiedPlayers) {
    console.log(`\n⚡⚡⚡ DESEMPATE entre: ${tiedPlayers.map(p => p.NAME).join(", ")} ⚡⚡⚡`);
    await delay(1500);

    let resolved = false;

    while (!resolved) {
        for (let i = 0; i < tiedPlayers.length; i++) {
            for (let j = i + 1; j < tiedPlayers.length; j++) {
                const p1 = tiedPlayers[i];
                const p2 = tiedPlayers[j];

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
                    skillTest1 = await logResult(p1.NAME, block, dice1, p1.SPEED);
                    skillTest2 = await logResult(p2.NAME, block, dice2, p2.SPEED);
                } else if (block === "CURVA") {
                    skillTest1 = await logResult(p1.NAME, block, dice1, p1.HANDLING);
                    skillTest2 = await logResult(p2.NAME, block, dice2, p2.HANDLING);
                } else if (block === "CONFRONTO") {
                    skillTest1 = await logResult(p1.NAME, block, dice1, p1.POWER);
                    skillTest2 = await logResult(p2.NAME, block, dice2, p2.POWER);
                }

                if (skillTest1 > skillTest2) {
                    p1.POINTS++;
                    console.log(`${p1.NAME} marcou 1 ponto!\n-----------------------------------------`);
                } else if (skillTest2 > skillTest1) {
                    p2.POINTS++;
                    console.log(`${p2.NAME} marcou 1 ponto!\n-----------------------------------------`);
                } else {
                    console.log(`EMPATE!!!\n-----------------------------------------`);
                }
                await delay(1000);
            }
        }

        const pointsSet = new Set(tiedPlayers.map(p => p.POINTS));
        if (pointsSet.size === tiedPlayers.length) {
            resolved = true;
        } else {
            console.log(`\n⚡ Ainda há empate! Nova rodada de desempate... ⚡`);
            await delay(1000);
        }
    }
}

async function Winner(players) {
    let ranking = [...players].sort((a, b) => b.POINTS - a.POINTS);

    // Verificar empates e resolver por grupos
    let i = 0;
    while (i < ranking.length) {
        let j = i;
        while (j < ranking.length && ranking[j].POINTS === ranking[i].POINTS) {
            j++;
        }
        if (j - i > 1) {
            const tiedGroup = ranking.slice(i, j);
            await tiebreaker(tiedGroup);
            ranking = [...players].sort((a, b) => b.POINTS - a.POINTS);
            i = 0;
            continue;
        }
        i++;
    }

    const medals = ["🏆", "🥈", "🥉"];

    console.log(`\nRanking Final:\n`);
    await delay(1000);

    for (let i = 0; i < ranking.length; i++) {
        const medal = medals[i] || "  ";
        console.log(`${medal} ${i + 1}º - ${ranking[i].NAME} - ${ranking[i].POINTS} ponto(s)`);
        await delay(500);
    }

    await delay(1500);
    console.log(`\n🎉🎉🎉 O CAMPEÃO É ${ranking[0].NAME} COM ${ranking[0].POINTS} PONTO(S)! 🎉🎉🎉`);
}

export { tiebreaker, Winner };
