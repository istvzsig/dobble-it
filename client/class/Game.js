import LayerManager from "./manager/LayerManager.js";
import Background from "./Background.js";
import PlayerManager from "./manager/PlayerManager.js";
import Deck from "./Deck.js";
import { Size } from "./math.js";
import { loadImage, loadJSON } from "../util/loaders.js";

export default class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.size = new Size(window.innerWidth, window.innerHeight);
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        this.layerManager = new LayerManager();
        this.playerManager = new PlayerManager(this);
        this.background = new Background(this.canvas.width, this.canvas.height);
        this.deck = new Deck(this, 55, 200, 200, this.size.width / 2, this.size.height / 2);
        this.load();
    }
    async load() {
        const playerData = await loadJSON("data");
        const cardImage = await loadImage("card.png");
        const symbols = await loadJSON("symbol-combinations");
        this.background.image = await loadImage("table-background.jpg");

        this.deck.create(cardImage, symbols);
        this.deck.shuffle();
        // this.layerManager.add(this.background);
        // this.layerManager.add(this.deck);
        this.playerManager.createFromConfig(playerData, this.deck);
    }
    start() {
        this.context.fillStyle = "navy";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.layerManager.draw(this.context);
        window.requestAnimationFrame(this.start.bind(this));
    }
}