import Player from '../Models/Player.js';
import { playRaceEngine } from '../Services/RaceEngine.js';

const players = [
    new Player({ name: "Mario", speed: 4, handling: 3, power: 3, points: 0 }),
    new Player({ name: "Luigi", speed: 3, handling: 4, power: 4, points: 0 }),
    new Player({ name: "Peach", speed: 3, handling: 4, power: 2, points: 0 }),
    new Player({ name: "Bowser", speed: 5, handling: 2, power: 5, points: 0 }),
    new Player({ name: "Yoshi", speed: 2, handling: 4, power: 3, points: 0 }),
    new Player({ name: "Donkey Kong", speed: 2, handling: 2, power: 5, points: 0 })
];

(async function main() {
    console.log("---------- Bem-vindo ao Mario-Kart!! -----------");
    console.log(`${players.length} jogadores, ${players.length - 1} rodadas, ${players.length / 2} confrontos por rodada`);
    await playRaceEngine(players);
})()