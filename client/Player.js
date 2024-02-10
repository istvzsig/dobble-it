export default class Player {
    constructor(name, x, y, orientation, size = 100) {
        this.name = name;
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.rowIndex = x;
        this.colIndex = y;
        this.size = size;
        this.x = this.rowIndex * this.size;
        this.y = this.colIndex * this.size;
        this.cards = [];
        this.orientation = orientation;
        this.w = this.orientation === "HORIZONTAL" ? this.size * 2 : this.size;
        this.h = this.orientation === "HORIZONTAL" ? this.size : this.size * 2;
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