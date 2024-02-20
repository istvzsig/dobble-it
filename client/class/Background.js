import { Pos } from "./math.js";

export default class Background {
    constructor(width, height, posX = 0, posY = 0) {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.pos = new Pos(posX, posY);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    draw(context) {
        this.context.drawImage(this.image, 0, 0);
        context.drawImage(this.canvas, this.pos.x, this.pos.y);
        // console.log("drawing background")
    }
}