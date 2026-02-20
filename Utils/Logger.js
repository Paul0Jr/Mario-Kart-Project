import { delay } from './General.js';

async function logResult(player, block, diceResult, pattribute) {
    await delay(1000);
    if (block === "CONFRONTO") {
        console.log(`${player} confrontou com poder ${diceResult} + ${pattribute} = ${diceResult + pattribute}`);
        return diceResult + pattribute;
    }
    else {
        await delay(1000);
        console.log(`${player} rolou um dado de ${block} ${diceResult} + ${pattribute} = ${diceResult + pattribute}`);
        return diceResult + pattribute;
    }
}

export { logResult };
