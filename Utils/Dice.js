async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        case random < 0.99:
            result = "CONFRONTO";
            break;
        default:
            break;
    }
    return result;
}

export { rollDice, getRandomBlock };
