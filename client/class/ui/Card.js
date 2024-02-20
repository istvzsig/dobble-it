import EventManager from '../managers/EventManager.js';
import { Pos, Size } from '../math.js';

export default class Card {
    constructor(id = 0, image = Image, symbols = [], width = 0, height = 0, posX = 0, posY = 0) {
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.playerName = "";
        this.id = id;
        this.image = image;
        this.size = new Size(width, height);
        this.pos = new Pos(posX, posY);
        this.buffer.width = this.size.width;
        this.buffer.height = this.size.height;
        this.isGrabbed = false;
        this.frameIndexX = 0;
        this.frameIndexY = 0;
        this.flipped = false;
        this.animationFrames = 0;
        this.animationSqueanceRate = 1;
        this.eventManager = new EventManager();
        this.symbols = symbols;
    }
    get left() {
        return this.player.isHorizontal ? this.player.pos.x + this.size.width * this.index : this.player.pos.x;
    }
    get right() {
        return this.player.isHorizontal ? (this.player.pos.x + this.size.width * this.index) + this.size.width : this.player.pos.x + this.size.width;
    }
    get top() {
        return this.player.isHorizontal ? this.player.pos.y : this.player.pos.y + this.size.height * this.index;
    }
    get bottom() {
        return this.player.isHorizontal ? this.player.pos.y + this.size.height : this.player.pos.y + this.size.height * this.index + this.size.height;;
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
    onMouseDown(event, layers, target) {
        if (event.clientX > target.left
            && event.clientX < target.right
            && event.clientY > target.top
            && event.clientY < target.bottom
        ) {
            layers[layers.length] = target;
            target.flipped = true;
            target.isGrabbed = true;
        }
    }
    onMouseUp(event, players, layers, lastPosX, lastPosY, target) {
        if (target.isGrabbed) {
            layers.pop();
            target.findMatch(players, event);
        }
        target.isGrabbed = false;
        target.setPoistion(lastPosX, lastPosY);
    }
    onMouseMove(event, canvas, target) {
        if (target.isGrabbed) {
            const x = event.clientX;
            const y = event.clientY;
            target.pos.x = x - target.size.width / 2;
            target.pos.y = y - target.size.height / 2;
            target.draw(canvas.getContext("2d"));
        }
        canvas.getContext("2d").drawImage(target.buffer, target.pos.x, target.pos.y);
    }
    onMouseEvent(canvas, players, layers) {
        this.eventManager.emit(canvas, "mousedown", this.onMouseDown, layers, this);
        this.eventManager.emit(canvas, "mouseup", this.onMouseUp, players, layers, this.pos.x, this.pos.y, this);
        this.eventManager.emit(canvas, "mousemove", this.onMouseMove, canvas, this);
    }
    draw(context) {
        this.context.clearRect(0, 0, this.size.width, this.size.height);
        this.animationFrames++;
        // this.flip();
        this.context.drawImage(
            this.image, // image
            this.image.height * this.frameIndexX, // sx
            this.size.height * this.frameIndexY, // sy
            this.image.height, // sw
            this.image.height, // sh
            0, // dx
            0, // dy
            this.size.width, // dw
            this.size.height // dh
        );
        context.drawImage(this.buffer, this.pos.x, this.pos.y);
    }
}