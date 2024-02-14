import { Pos, Perimeter } from '../math.js';

export default class Card {
    constructor(id = 0, image = Image, width = 0, height = 0, posX = 0, posY = 0) {
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.id = id;
        this.image = image;
        this.width = width; //perimeter
        this.height = height;
        this.pos = new Pos(posX, posY);
        this.buffer.width = width;
        this.buffer.height = height;
        this.index = null;
        this.isGrabbed = false;
    }
    get left() {
        return this.pos.x + (this.width * this.index);
    }
    get right() {
        return (this.pos.x + this.width) + (this.width * this.index);
    }
    get top() {
        return this.pos.y + (this.height * this.index);
    }
    get bottom() {
        return (this.pos.y + this.height) + (this.height * this.index);
    }
    onMouseEvent(canvas, player) {
        const lastPosX = this.pos.x;
        const lastPosY = this.pos.y;
        canvas.addEventListener("mousedown", event => {
            let ex = event.clientX;
            let ey = event.clientY;

            let left = player.isHorizontal ? this.left : this.x;
            let right = player.isHorizontal ? this.right : this.x + this.width;
            let top = player.isHorizontal ? this.pos.y : this.top;
            let bottom = player.isHorizontal ? this.pos.y + this.height : this.bottom;

            if (ex > left && ex < right && ey > top && ey < bottom) {
                this.isGrabbed = true;
                console.log(player.id)
                // this.context.fillStyle = "green"
            }
            this.drawStroke("green");
            this.draw(canvas.getContext("2d"))
        });
        canvas.addEventListener("mouseup", _ => {
            this.setPoistion(lastPosX, lastPosY);
            this.isGrabbed = false;
        });
        canvas.addEventListener("mousemove", event => {
            if (this.isGrabbed) {
                let x = event.clientX;
                let y = event.clientY;

                let offsetX = player.orientation === "HORIZONTAL" ? this.width * this.index : 0;
                let offsetY = player.orientation === "HORIZONTAL" ? 0 : this.height * this.index;
            }
            // debugger;
            canvas.getContext("2d").drawImage(this.buffer, this.pos.x, this.pos.y);
        });
    }
    drawStroke(color = "red") {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.lineWidth = 15;
        this.context.strokeRect(this.pos.x, this.pos.y, this.buffer.width, this.buffer.height)
    }
    draw(context) {
        this.context.drawImage(this.image, 0, 0, this.width, this.height);
        this.drawStroke();
        context.drawImage(this.buffer, this.pos.x, this.pos.y, this.width, this.height);
    }
}