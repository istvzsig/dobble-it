import { Pos } from '../math.js';

export default class Player {
    constructor(data) {
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.id = data.id;
        this.name = data.name;
        this.pos = new Pos(data.posX * 100, data.posY * 100);
        this.orientation = data.orientation;
        this.width = this.isHorizontal ? 200 : 100;
        this.height = this.isHorizontal ? 100 : 200;
        this.buffer.width = this.width;
        this.buffer.height = this.height;
        this.cards = [];
    }
    get isHorizontal() {
        return this.orientation === "HORIZONTAL";
    }
    setCards(deck, numberOfCards = 2) {
        if (!deck) { return }
        for (let i = 0; i < numberOfCards; i++) {
            const card = deck.cards.shift();
            card.index = i;
            card.pos.x = this.isHorizontal ? this.pos.x + card.width * card.index : this.pos.x;
            card.pos.y = this.isHorizontal ? this.pos.y : this.pos.y + card.height * card.index;
            this.cards.push(card);
        }
    }
}