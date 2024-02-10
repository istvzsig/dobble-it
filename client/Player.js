export default class Player {
    constructor(x, y, orientation) {
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.x = x * 100;
        this.y = y * 100;
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
        ctx.drawImage(this.buffer, this.x, this.y);
    }
}