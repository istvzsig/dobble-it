import LayerManager from "./Layers.js";
import Background from "./Background.js";
import Player from "./Player.js";
import Deck from "./Deck.js";
import { Size } from "../math.js";
import { loadImage, loadJSON } from "../loaders.js";


export default class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.size = new Size(window.innerWidth, window.innerHeight);
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        this.layerManager = new LayerManager();
        this.background = new Background(this.canvas.width, this.canvas.height);
        this.deck = new Deck(55, 200, 200, this.size.width / 2, this.size.height / 2);
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
                card.onMouseEvent(this.canvas, this.players, this.layerManager.layers);
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