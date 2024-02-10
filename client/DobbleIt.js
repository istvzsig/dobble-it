import Matrix from "./Matrix.js";
import Player from "./Player.js";
import Card from "./Card.js";
import LayerManager from "./LayerManager.js";

// TEST PLAYERS
const players = [
    { name: "Pista", x: 2.5, y: 5, orientation: "HORIZONTAL" },
    { name: "Ors", x: 0, y: 2, orientation: "VERTICAL" },
    { name: "Marosan", x: 1, y: 0, orientation: "HORIZONTAL" },
    { name: "Buznyak", x: 4, y: 0, orientation: "HORIZONTAL" },
    { name: "Geza", x: 6, y: 2, orientation: "VERTICAL" },
];

// CREATE PLAYERS
const PLAYERS = players.map(data => {
    const player = new Player(data.x, data.y, data.orientation);
    player.addCards([new Card(data), new Card(data)]);
    return player;
})


export default class DobbleIt {
    constructor() {
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.players = [];
        this.layers = new LayerManager();
        this.matrix = new Matrix();
        this.layers.add(this.matrix);

        this.players = PLAYERS;
        this.init();
    }
    init() {
        this.players.forEach(player => {
            this.layers.add(player);
        });
    }
    start() {
        this.layers.draw(this.ctx, ...this.players);
        window.requestAnimationFrame(this.start.bind(this));
    }
}