import LayerManager from "./Layers.js";
import Matrix from "./Matrix.js";
import Background from "./Background.js";
import Player from "./Player.js";
import Deck from "./Deck.js";
import { loadImage, loadJSON } from "../loaders.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.players = [];
        this.layerManager = new LayerManager();
        this.matrix = new Matrix(7, 6, 100);
        this.background = new Background(this.canvas.width, this.canvas.height);
        this.deck = new Deck(200, 200, 250, 200);
        this.init();
    }
    async init() {
        const tableBackgroundImage = await loadImage("table-background.jpg");
        this.background.image = tableBackgroundImage;

        const cardImageBack = await loadImage("card-back.png");
        const testPlayers = await loadJSON("test-players");

        this.deck.create(cardImageBack, 55);
        this.deck.shuffle();

        this.createTestPlayers(testPlayers);
        this.createLayers();

        this.players.forEach(player => {
            player.addCards(this.deck);
            this.layerManager.add(player);
            player.cards.forEach(card => {
                this.layerManager.add(card);
                card.onMouseEvent(this.canvas, player, this.layerManager.layers);
            });
        });
        // this.enablePlayerInteractions();
    }
    createTestPlayers(playersData) {
        playersData.forEach(data => {
            this.players.push(new Player(data));
        });
    }
    createLayers() {
        this.layerManager.add(this.matrix);
        // this.layerManager.add(this.background);
        this.layerManager.add(this.deck);
    }
    enablePlayerInteractions() {
        this.players.forEach(player => {
            player.cards.forEach(card => {
                card.onMouseEvent(this.canvas, player);
            });
        });
    }
    start(time = 0) {
        this.layerManager.draw(this.context);
        window.requestAnimationFrame(this.start.bind(this));
    }
}