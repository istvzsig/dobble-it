import Matrix from "./Matrix.js";
import Player from "./Player.js";
import Deck from "./Deck.js";
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
        this.deck = new Deck();
        this.init();
    }
    init() {
        this.createPlayers();
        this.addLayers();
        this.enablePlayerInteractions();

    }
    addLayers() {
        this.layers.add(this.matrix);
        this.players.forEach(player => {
            this.layers.add(player);
        });
    }
    createPlayers() {
        playerData.forEach(data => {
            const player = new Player(data);
            player.addCards(this.deck);
            this.players.push(player);
        });
    }
    enablePlayerInteractions() {
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