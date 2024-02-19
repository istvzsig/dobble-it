import { Pos } from '../math.js';

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
        this.isGrabbed = false;
        this.frameIndexX = 0;
        this.frameIndexY = 0;
        this.flipped = false;
        this.animationFrames = 0;
        this.animationFrameSequence = 4;
    }
    flip() {
        if (this.flipped) {
            if (this.animationFrames % this.animationFrameSequence == 0) {
                this.frameIndexX++;
                if (this.frameIndexX > 9) {
                    this.frameIndexX = 10;
                    // this.flipped = false;
                    this.animationFrames = 0;
                }
            }
        }
    }
    setPoistion(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }
    onMouseEvent(canvas, player, layers) {
        const lastPosX = this.pos.x;
        const lastPosY = this.pos.y;
        canvas.addEventListener("mousedown", event => {
            const ex = event.clientX;
            const ey = event.clientY;
            const left = player.isHorizontal ? player.pos.x + this.width * this.index : player.pos.x;
            const right = player.isHorizontal ? (player.pos.x + this.width * this.index) + this.width : player.pos.x + this.width;
            const top = player.isHorizontal ? player.pos.y : player.pos.y + this.height * this.index;
            const bottom = player.isHorizontal ? player.pos.y + this.height : player.pos.y + this.height * this.index + this.height;

            if (ex > left && ex < right && ey > top && ey < bottom) {
                layers[layers.length] = this;
                this.isGrabbed = true;
                this.flipped = true;
            }
        });
        canvas.addEventListener("mouseup", _ => {
            if (this.isGrabbed) {
                layers.pop();
            }
            this.isGrabbed = false;
            this.setPoistion(lastPosX, lastPosY);
        });
        canvas.addEventListener("mousemove", event => {
            if (this.isGrabbed) {
                let x = event.clientX;
                let y = event.clientY;
                this.pos.x = x - this.width / 2;
                this.pos.y = y - this.height / 2;
                this.draw(canvas.getContext("2d"));
            }
            // debugger;
            canvas.getContext("2d").drawImage(this.buffer, this.pos.x, this.pos.y);
        });
    }
    draw(context) {
        this.context.clearRect(0, 0, this.width, this.height);
        this.animationFrames++;
        this.flip();
        this.context.drawImage(
            this.image, // image
            this.image.height * this.frameIndexX, // sx
            this.height * this.frameIndexY, // sy
            this.image.height, // sw
            this.image.height, // sh
            0, // dx
            0, // dy
            this.width, // dw
            this.height // dh
        );
        context.drawImage(this.buffer, this.pos.x, this.pos.y);
    }
}