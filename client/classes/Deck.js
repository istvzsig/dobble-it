import Card from "./Card.js";
export default class Deck {
    constructor(width = 0, height = 0, posX = 0, posY = 0) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.cards = [];
    }
    create(cardImage, len = 55) {
        for (let i = 0; i < len; ++i) {
            const card = new Card(i, cardImage, 100, 100, 100, 100);
            this.cards.push(card);

        }
    }
    shuffle(shuffleTimes = 1) {
        const cards = this.cards;
        while (shuffleTimes--) {
            for (let i = 0; i < cards.length; i++) {
                let r = Math.random() * cards.length | 0;
                [cards[i], cards[r]] = [cards[r], cards[i]];
            }
        }
    }
    drawToCenter(context, card) {
        let centerX = context.canvas.width / 2 - this.width / 2;
        let centerY = context.canvas.height / 2 - this.height / 2;
        context.drawImage(card.buffer, centerX, centerY);

    }
    draw(context) {
        const topCard = this.cards[0];
        topCard.buffer.width = this.width;
        topCard.buffer.height = this.height;

        topCard.buffer.getContext("2d")
            .drawImage(topCard.image, 0, 0, topCard.buffer.width, topCard.buffer.height);

        this.drawToCenter(context, topCard);
    }
}