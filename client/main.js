import Game from "./classes/Game.js";

const canvas = document.getElementById("game");
const game = new Game(canvas);
game.start();
