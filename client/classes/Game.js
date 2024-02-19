import LayerManager from "./Layers.js";
import Background from "./Background.js";
import Player from "./Player.js";
import Deck from "./Deck.js";
import { loadImage, loadJSON } from "../loaders.js";

export default class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.layerManager = new LayerManager();
        this.background = new Background(this.canvas.width, this.canvas.height);
        this.deck = new Deck(55, 200, 200, this.width / 2, this.height / 2);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.players = [];
        this.init();
    }
    async init() {
        const playerData = await loadJSON("data");
        const cardImage = await loadImage("card.png");
        const symbols = await loadJSON("symbol-combinations");
        this.background.image = await loadImage("table-background.jpg");

        this.createDeckAndShuffle(cardImage, symbols);
        this.createPlayers(playerData);
        this.addLayers();
    }
    createDeckAndShuffle(cardImage, symbols) {
        this.deck.create(cardImage, symbols);
        this.deck.shuffle();
    }
    createPlayers(playerData) {
        playerData.forEach(data => {
            const player = new Player(data);
            player.setCards(this.deck);
            this.players.push(player);
        });
    }
    addCardLayers() {
        this.players.forEach(player => {
            player.cards.forEach((card, i) => {
                card.onMouseEvent(this.canvas, player, this.layerManager.layers);
                this.layerManager.add(card);
            })
        });
    }
    addLayers(data) {
        // this.layerManager.add(this.background);
        // this.layerManager.add(this.deck);
        this.addCardLayers(data);
    }
    start() {
        this.context.fillStyle = "navy";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.layerManager.draw(this.context);
        window.requestAnimationFrame(this.start.bind(this));
    }
}