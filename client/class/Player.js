import { Pos, Size } from './math.js';

export default class Player {
    constructor(data, game) {
        this.game = game;
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.id = data.id;
        this.name = data.name;
        this.orientation = data.orientation;
        this.pos = new Pos(data.posX * 100, data.posY * 100);
        this.size = new Size(this.isHorizontal ? 200 : 100, this.isHorizontal ? 100 : 200);
        this.buffer.width = this.size.width;
        this.buffer.height = this.size.height;
        this.cards = [];
    }
    get left() {
        return this.pos.x;
    }
    get right() {
        return this.pos.x + this.size.width;
    }
    get top() {
        return this.pos.y;
    }
    get bottom() {
        return this.pos.y + this.size.height;
    }
    get isHorizontal() {
        return this.orientation === "HORIZONTAL";
    }
    getCardsFromDeck(numberOfCards) {
        const deck = this.game.deck;
        if (!deck) { return }
        for (let i = 0; i < numberOfCards; i++) {
            const card = deck.cards.shift();
            card.player = this;
            card.playerName = this.name;
            card.index = this.cards.length % 2 === 0 ? 0 : 1;
            card.pos.x = this.isHorizontal ? this.pos.x + card.size.width * card.index : this.pos.x;
            card.pos.y = this.isHorizontal ? this.pos.y : this.pos.y + card.size.height * card.index;
            card.lastPosX = card.pos.x;
            card.lastPosY = card.pos.y;
            this.cards.push(card);
        }
    }
    addCardsToLayerManager() {
        const layerManager = this.game.layerManager;
        this.cards.forEach(card => {

            card.onMouseEvent();
            layerManager.add(card);
        })
    }
    getCardFromDeckAndAddToLayerManager(x, y, index) {
        const layerManager = this.game.layerManager;
        const newCard = this.game.deck.cards.shift();
        newCard.playerName = this.name;
        newCard.index = index;

        newCard.pos.x = x;
        newCard.pos.y = y;
        console.log(newCard)
        layerManager.add(newCard);
    }
}