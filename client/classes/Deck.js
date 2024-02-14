import { Pos } from "../math.js";
import Card from "./Card.js";
export default class Deck {
    constructor(width = 0, height = 0, posX = 0, posY = 0) {
        this.width = width;
        this.height = height;
        this.pos = new Pos(posX, posY);
        this.cards = [];
    }
    create(cardImage, len = 55) {
        this.image = cardImage;
        for (let index = 0; index < len; ++index) {
            const card = new Card(index, cardImage, 100, 100);
            this.cards.push(card);
        }
    }
    shuffle() {
        const cards = this.cards;
        for (let i = 0; i < cards.length; i++) {
            let r = Math.random() * cards.length | 0;
            [cards[i], cards[r]] = [cards[r], cards[i]];
        }
    }
    drawToCenter(context, card) {
        const canvas = context.canvas;
        const buffer = card.buffer;
        this.pos.x = canvas.width / 2 - this.width / 2;
        this.pos.y = canvas.height / 2 - this.height / 2;
        context.drawImage(buffer, this.pos.x, this.pos.y);
    }
    draw(context) {
        const topCard = this.cards[0];
        const buffer = topCard.buffer;
        buffer.width = this.width;
        buffer.height = this.height;
        buffer
            .getContext("2d")
            .drawImage(this.image, 0, 0, buffer.width, buffer.height);
        this.drawToCenter(context, topCard);
    }
}