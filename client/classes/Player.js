export default class Player {
    constructor(data, size = 100) {
        this.name = data.name;
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.w = this.orientation === "HORIZONTAL" ? size * 2 : size;
        this.h = this.orientation === "HORIZONTAL" ? size : size * 2;
        this.buffer.width = this.w;
        this.buffer.height = this.h;
        this.x = data.x * size;
        this.y = data.y * size;
        this.orientation = data.orientation;
        this.cards = [];

    }
    addCards(deck, numberOfCards = 2) {
        while (numberOfCards--) {
            const card = deck.shift();
            card.x = this.x;
            card.y = this.y;
            this.cards.push(card)
        }
    }

    draw(ctx) {
        this.cards.forEach((card, i) => {
            card.index = i;
            card.draw(ctx, this)
        })
        ctx.drawImage(this.buffer, this.x, this.y);
    }
}