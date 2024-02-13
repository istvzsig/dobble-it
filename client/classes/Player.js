import Entity from "./Entity.js";

export default class Player extends Entity {
    constructor(data) {
        super(100);
        this.name = data.name;
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.w = this.orientation === "HORIZONTAL" ? this.width * 2 : this.width;
        this.h = this.orientation === "HORIZONTAL" ? this.height : this.height * 2;
        this.buffer.width = this.w;
        this.buffer.height = this.h;
        this.x = data.x * this.width;
        this.y = data.y * this.height;
        this.orientation = data.orientation;
        this.cards = [];
        this.id = data.id;

    }
    addCards(deck, numberOfCards = 2) {
        while (numberOfCards--) {
            const card = deck.cards.shift();
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
        // this.context.fillRect(0, 0, this.buffer.width, this.buffer.height)
        ctx.drawImage(this.buffer, this.x, this.y);
    }
}