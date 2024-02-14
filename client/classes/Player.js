import { Pos } from '../math.js';

export default class Player {
    constructor(data) {
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.id = data.id;
        this.name = data.name;
        this.pos = new Pos(data.posX * 100, data.posY * 100)
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
    addCards(deck, numberOfCards = 2) {
        if (!deck) { return }
        for (let i = 0; i < numberOfCards; i++) {
            const card = deck.cards.shift();
            card.pos.x = this.isHorizontal ? card.pos.x + (i * card.width) : card.pos.x;
            card.pos.y = this.isHorizontal ? card.pos.y : card.pos.y + (i * card.height);
            this.cards.push(card);
        }
    }
    changeColor(color = "blue") {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, 100, 100);
    }
    drawStroke(color = "blue") {
        this.context.strokeStyle = color;
        this.context.lineWidth = 15;
        this.context.strokeRect(0, 0, this.buffer.width, this.buffer.height)
    }
    drawCards() {
        this.cards.forEach(card => {
            card.draw(this.context, this);
            // this.context.fillRect(0, 0, card.width, 55)
        });
    }
    draw(context) {
        this.drawStroke();
        // this.context.fillRect(0, 0, this.buffer.width, this.buffer.height)
        this.drawCards();
        context.drawImage(this.buffer, this.pos.x, this.pos.y);
    }
}