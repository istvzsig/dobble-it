import Matrix from "./Matrix.js";
import LayerManager from "./Layers.js";
import Player from "./Player.js";
import Deck from "./Deck.js";
import { loadImage, loadJSON } from "../loaders.js";

export default class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.players = [];
        this.layerManager = new LayerManager();
        this.matrix = new Matrix(7, 6, 100);
        this.deck = new Deck(200, 200, 250, 200);
        this.init();
    }
    async init() {
        // const tableBackground = await loadImage("table-background.jpg");
        const cardImage = await loadImage("card-back.png");
        const testPlayers = await loadJSON("test-players");

        this.createTestPlayers(testPlayers);

        this.deck.create(cardImage, 55);
        this.deck.shuffle(1);

        this.layerManager.add(this.matrix);
        this.layerManager.add(this.deck);
        this.players.forEach(player => {
            player.addCards(this.deck);
            this.layerManager.add(player);
        });
        this.enablePlayerInteractions();
    }
    createTestPlayers(playersData) {
        playersData.forEach(data => {
            const player = new Player(data);
            this.players.push(player);
        });
    }
    enablePlayerInteractions() {
        this.players.forEach(player => {
            this.layerManager.add(player);
            player.cards.forEach(card => {
                card.onMouseEvent(this.canvas, player);
            });
        });
    }
    drawBackground() {
        this.context.drawImage(tableBackground, 0, 0, this.canvas.width, this.canvas.height);
    }
    start(time = 0) {
        this.layerManager.draw(this.context);
        window.requestAnimationFrame(this.start.bind(this));
    }
}