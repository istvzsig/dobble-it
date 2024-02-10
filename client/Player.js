export default class Player {
    constructor(name, x, y, orientation) {
        this.name = name;
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.rowIndex = x;
        this.colIndex = y;
        this.x = this.rowIndex * 100;
        this.y = this.colIndex * 100;
        this.cards = [];
        this.orientation = orientation;
        this.w = this.orientation === "HORIZONTAL" ? 200 : 100;
        this.h = this.orientation === "HORIZONTAL" ? 100 : 200;
        this.buffer.width = this.w;
        this.buffer.height = this.h;

    }
    addCards(cards) {
        this.cards.push(...cards);
    }

    draw(ctx) {
        this.cards.forEach((card, i) => {
            card.index = i;
            card.draw(ctx, this)
        })
        ctx.drawImage(this.buffer, this.x, this.y);
    }
}