import Card from "./Card.js";

export default class Deck {
    constructor() {
        this.cards = [];
    }
    create(cardImage, len = 55) {
        while (len--) {
            this.cards.push(new Card(cardImage, 100))
        }
    }
    draw(ctx) {
        let topCard = this.cards[0];
        topCard.buffer.width = 200;
        topCard.buffer.height = 200;
        topCard.buffer.getContext("2d").fillRect(0, 0, 200, 200)
        ctx.drawImage(topCard.buffer, 250, 200)
    }
}