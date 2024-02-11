import Matrix from "./Matrix.js";
import Player from "./Player.js";
import Deck from "./Deck.js";
import LayerManager from "./LayerManager.js";
import { loadImage, loadJSON } from "../loaders.js";

export default class Game {
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
        Promise.all([
            loadImage("card-back.png"),
            loadJSON("test-players"),
        ]).then(([cardImage, testPlayers]) => {
            this.createDeck(cardImage, 55);
            this.createPlayers(testPlayers);
            this.addLayers();
            this.enablePlayerInteractions();
        });
    }
    addLayers() {
        this.layers.add(this.matrix);
        this.layers.add(this.deck);
        this.players.forEach(layer => {
            this.layers.add(layer);
        });
    }
    createDeck(cardImage, size) {
        this.deck.create(cardImage, size)
    }
    createPlayers(playerData) {
        playerData.forEach(data => {
            const player = new Player(data, 100);
            player.addCards(this.deck);
            this.players.push(player);
        });
    }
    enablePlayerInteractions() {
        this.players.forEach(player => {
            player.cards.forEach(card => {
                card.onMouseEvent(this.canvas, player);
            });
        });
    }
    start() {
        this.layers.draw(this.ctx, ...this.players);
        window.requestAnimationFrame(this.start.bind(this));
    }
}