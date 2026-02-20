import Player from './Player.js';

const players= [
    new Player({ name: "Mario", speed: 4, handling: 3, power: 3, points: 0}),
    new Player({ name: "Luigi", speed: 3, handling: 4, power: 4, points: 0}),
    new Player({ name: "Peach", speed: 3, handling: 4, power: 2, points: 0}),
    new Player({ name: "Bowser", speed: 5, handling: 2, power: 5, points: 0}),
    new Player({ name: "Yoshi", speed: 2, handling: 4, power: 3, points: 0}),
    new Player({ name: "Donkey Kong", speed: 2, handling: 2, power: 5, points: 0})

]

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}


async function getRandomPlayers() {
    const player1 = players[Math.floor(Math.random() * players.length)];
    let player2;
    
    do {
        player2 = players[Math.floor(Math.random() * players.length)];
    } while (player2 === player1);
    
    return { player1, player2 };
}

async function playRaceEngine(char1, char2) {

}

(async function main() {
    const { player1, player2 } = await getRandomPlayers();
    console.log("---------- Bem-vindo ao Mario-Kart!! -----------");
    console.log(`Começando nova corrida entre ${player1.NAME} X ${player2.NAME}`);
    await playRaceEngine(player1, player2);
    
})()