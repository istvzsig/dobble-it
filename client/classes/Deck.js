import { Pos } from "../math.js";
import Card from "./Card.js";
export default class Deck {
    constructor(width = 0, height = 0, posX = 0, posY = 0) {
        this.width = width;
        this.height = height;
        this.pos = new Pos(posX, posY);
        this.cards = [];
        this.frames = 0;
        this.animationLen = 1000;
        this.flipped = false;
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
    flip(card) {
        if (this.flipped) {
            this.frames++;
            card.frameIndexX++;
            if (card.frameIndexX > 10) {
                card.frameIndexX = 0;
                this.flipped = false;
            }
            // if (this.frames %  == 0) {
            // }
        }
    }
    draw(context, time = 0) {
        const topCard = this.cards[0];
        const buffer = topCard.buffer;
        const ctx = buffer.getContext("2d");
        buffer.width = this.width;
        buffer.height = this.height;

        this.flip(topCard);

        ctx.drawImage(
            this.image, // image
            500 * topCard.frameIndexX, // sx
            0, // sy
            500, // sw
            500, // sh
            0, // dx
            0, // dy
            buffer.width, // dw
            buffer.height, // dh
        );
        this.drawToCenter(context, topCard);
    }
}