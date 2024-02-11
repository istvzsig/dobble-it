export default class Player {
    constructor(data, size = 100) {
        this.name = data.name;
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.rowIndex = data.x;
        this.colIndex = data.y;
        this.size = size;
        this.x = this.rowIndex * this.size;
        this.y = this.colIndex * this.size;
        this.cards = [];
        this.orientation = data.orientation;
        this.w = this.orientation === "HORIZONTAL" ? this.size * 2 : this.size;
        this.h = this.orientation === "HORIZONTAL" ? this.size : this.size * 2;
        this.buffer.width = this.w;
        this.buffer.height = this.h;

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