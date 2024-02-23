import EventManager from './manager/EventManager.js';
import { Pos, Size } from './math.js';

export default class Card {
    constructor(game, id = 0, image = Image, symbols = [], width = 0, height = 0, posX = 0, posY = 0) {
        this.game = game;
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        this.playerName = "";
        this.id = id;
        this.image = image;
        this.size = new Size(width, height);
        this.pos = new Pos(posX, posY);
        this.eventManager = new EventManager();
        this.buffer.width = this.size.width;
        this.buffer.height = this.size.height;
        this.isGrabbed = false;
        this.frameIndexX = 0;
        this.frameIndexY = 0;
        this.flipped = false;
        this.animationFrames = 0;
        this.animationSqueanceRate = 1;
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
    intersection(attackerCardSymbols, targetCardSymbols) {
        return attackerCardSymbols.filter(symbol => targetCardSymbols.includes(symbol));
    }
    findMatch(event) {
        const players = this.game.playerManager.players;
        players.forEach(targetPlayer => {
            targetPlayer.cards.forEach(targetCard => {
                if (event.clientX > targetCard.left
                    && event.clientX < targetCard.right
                    && event.clientY > targetCard.top
                    && event.clientY < targetCard.bottom
                    && this.playerName !== targetPlayer.name) {

                    if (this.intersection(this.symbols, targetCard.symbols)) {
                        const attackerPlayer = players.filter(targetPlayer => targetPlayer.name === this.playerName)[0];
                        const layerManagerIndexOfThisCard = this.game.layerManager.layers.indexOf(this);
                        const layerManagerIndeOfTargetCard = this.game.layerManager.layers.indexOf(targetCard);
                        const layerManager = this.game.layerManager.layers;

                        console.log(this.lastPosX, this.lastPosY)
                        try {
                            layerManager.splice(layerManagerIndexOfThisCard, 1);
                            targetCard.name = targetPlayer.name;

                            const attackerPlayerUsedCard = attackerPlayer.cards.splice(this, 1)[0];
                            attackerPlayerUsedCard.playerName = targetPlayer.name;
                            targetPlayer.cards.push(attackerPlayerUsedCard);
                            attackerPlayer.getCardFromDeckAndAddToLayerManager(this.lastPosX, this.lastPosY, this.index);
                            layerManager.splice(layerManagerIndeOfTargetCard, 1);
                        } catch (err) {
                            throw new Error(err);
                        }
                        return this.setPoistion(this.x, this.y);
                    }
                    // this.setPoistion(this.pos.x, this.pos.y);
                }
                // console.log("no matches", this.x, this.y);
            });
        });
    }
    onMouseDown(event, card = this) {
        const layers = card.game.layerManager.layers;
        if (event.clientX > card.left
            && event.clientX < card.right
            && event.clientY > card.top
            && event.clientY < card.bottom
        ) {
            layers[layers.length] = card;
            card.flipped = true;
            card.isGrabbed = true;
        }
    }
    onMouseUp(event, t = this) {
        if (t.isGrabbed) {
            t.findMatch(event);
        }
        t.isGrabbed = false;
    }
    onMouseMove(event, card = this) {
        const canvas = card.game.canvas;

        if (card.isGrabbed) {
            const x = event.clientX;
            const y = event.clientY;
            card.pos.x = x - card.size.width / 2;
            card.pos.y = y - card.size.height / 2;
            card.draw(canvas.getContext("2d"));
        }
        canvas.getContext("2d").drawImage(card.buffer, card.pos.x, card.pos.y);
    }
    onMouseEvent() {
        const canvas = this.game.canvas;

        this.eventManager.emit(canvas, "mousedown", this.onMouseDown, this);
        this.eventManager.emit(canvas, "mouseup", this.onMouseUp, this);
        this.eventManager.emit(canvas, "mousemove", this.onMouseMove, this);
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