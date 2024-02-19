import { Pos } from '../math.js';

export default class Card {
    constructor(id = 0, image = Image, symbols = [], width = 0, height = 0, posX = 0, posY = 0) {
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.playerName = "";
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
        this.animationSqueanceRate = 1;
        this.symbols = symbols;
    }
    get left() {
        return this.player.isHorizontal ? this.player.pos.x + this.width * this.index : this.player.pos.x;
    }
    get right() {
        return this.player.isHorizontal ? (this.player.pos.x + this.width * this.index) + this.width : this.player.pos.x + this.width;
    }
    get top() {
        return this.player.isHorizontal ? this.player.pos.y : this.player.pos.y + this.height * this.index;
    }
    get bottom() {
        return this.player.isHorizontal ? this.player.pos.y + this.height : this.player.pos.y + this.height * this.index + this.height;;
    }
    flip() {
        if (this.flipped) {
            if (this.animationFrames % this.animationSqueanceRate == 0) {
                this.frameIndexX++;
                if (this.frameIndexX > 9) {
                    this.frameIndexX = 10;
                    this.flipped = false;
                    this.animationFrames = 0;
                }
            }
        }
    }
    setPoistion(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }
    findMatch(players, event) {
        players.forEach(targetPlayer => {
            targetPlayer.cards.forEach(targetCard => {
                if (event.clientX > targetCard.left
                    && event.clientX < targetCard.right
                    && event.clientY > targetCard.top
                    && event.clientY < targetCard.bottom
                    && this.playerName !== targetPlayer.name
                ) {
                    const attackerName = this.playerName;
                    const targetName = targetPlayer.name;
                    const attackerCardSymbols = this.symbols;
                    const targetCardSymbols = targetCard.symbols;
                    console.log({ attackerName, targetName, attackerCardSymbols, targetCardSymbols });
                }
            });
        });
    }
    onMouseEvent(canvas, players, layers) {
        const lastPosX = this.pos.x;
        const lastPosY = this.pos.y;
        canvas.addEventListener("mousedown", event => {
            const ey = event.clientY;

            if (event.clientX > this.left
                && event.clientX < this.right
                && event.clientY > this.top
                && event.clientY < this.bottom
            ) {
                layers[layers.length] = this;
                this.flipped = true;
                this.isGrabbed = true;
            }
        });
        canvas.addEventListener("mouseup", event => {
            if (this.isGrabbed) {
                layers.pop();
                this.findMatch(players, event);
            }
            this.isGrabbed = false;
            this.setPoistion(lastPosX, lastPosY);
        });
        canvas.addEventListener("mousemove", event => {
            if (this.isGrabbed) {
                const x = event.clientX;
                const y = event.clientY;
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
        // this.flip();
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