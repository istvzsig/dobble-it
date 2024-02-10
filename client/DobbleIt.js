import Matrix from "./Matrix.js";
import Player from "./Player.js";
import Card from "./Card.js";
import LayerManager from "./LayerManager.js";
import { playerData } from "./test-players.js";

export default class DobbleIt {
    constructor() {
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.players = [];
        this.layers = new LayerManager();
        this.matrix = new Matrix();
        this.layers.add(this.matrix);
        this.init();
    }
    init() {
        this.createPlayers();
        this.players.forEach(player => {
            this.layers.add(player);
        });
        this.animate();
    }
    createPlayers() {
        playerData.forEach(data => {
            const player = new Player(data.name, data.x, data.y, data.orientation);
            player.addCards([new Card(data), new Card(data)]);
            this.players.push(player);
        });
    }
    animate() {
        this.players.forEach(player => {
            player.cards.forEach(card => {
                card.onMouseEvent(this.canvas, player);
            })
        })
    }
    start() {
        this.layers.draw(this.ctx, ...this.players);
        window.requestAnimationFrame(this.start.bind(this));
    }
}