import { Pos, Size } from '../math.js';

export default class Player {
    constructor(data) {
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
    setCards(deck, numberOfCards = 2) {
        if (!deck) { return }
        for (let i = 0; i < numberOfCards; i++) {
            const card = deck.cards.shift();
            card.player = this;
            card.playerName = this.name;
            card.index = i;
            card.pos.x = this.isHorizontal ? this.pos.x + card.size.width * card.index : this.pos.x;
            card.pos.y = this.isHorizontal ? this.pos.y : this.pos.y + card.size.height * card.index;
            this.cards.push(card);
        }
    }
}