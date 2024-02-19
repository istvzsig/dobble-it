import { Pos, Size } from "../math.js";
import Card from "./Card.js";
export default class Deck {
    constructor(numberOfCards, width, height, x, y) {
        this.numberOfCards = numberOfCards;
        this.size = new Size(width, height);
        this.pos = new Pos(x - this.size.width / 2, y - this.size.height / 2);
        this.cards = [];
        this.frames = 0;
    }
    create(cardImage, symbols) {
        this.image = cardImage;
        for (let index = 0; index < this.numberOfCards; ++index) {
            const card = new Card(index, cardImage, symbols[index], 100, 100);
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
        context.drawImage(buffer, this.pos.x, this.pos.y);
    }
    drawImage(topCard) {
        const buffer = topCard.buffer;
        const ctx = buffer.getContext("2d");
        buffer.width = this.size.width;
        buffer.height = this.size.height;
        ctx.drawImage(
            this.image,
            this.image.height * topCard.frameIndexX, 0,
            this.image.height, this.image.height,
            0, 0,
            buffer.width, buffer.height,
        );
    }
    draw(context, time = 0) {
        const topCard = this.cards[0];
        this.drawToCenter(context, topCard);
        this.drawImage(topCard);

    }
}