export default class Card {
    constructor(size = 100) {
        this.buffer = document.createElement("canvas");
        this.width = size;
        this.height = size;
        this.buffer.width = this.width;
        this.buffer.height = this.height;
        this.isGrabbed = false;
        // this.x = player.x * this.width;
        // this.y = player.y * this.height;

    }
    get left() {
        return this.x + (this.width * this.index);
    }
    get right() {
        return (this.x + this.width) + (this.width * this.index);
    }
    get top() {
        return this.y + (this.height * this.index);
    }
    get bottom() {
        return (this.y + this.height) + (this.height * this.index);
    }
    draw(ctx, player) {
        const context = this.buffer.getContext("2d");

        context.fillStyle = this.index % 2 ? "red" : "blue";
        context.fillRect(0, 0, this.width, this.height);

        let x = player.orientation === "HORIZONTAL" ? this.left : this.x;
        let y = player.orientation === "HORIZONTAL" ? this.y : this.top;

        ctx.drawImage(this.buffer, x, y);
    }
    onMouseEvent(canvas, player) {
        const lastPosX = this.x;
        const lastPosY = this.y;
        canvas.addEventListener("mousedown", event => {
            let ex = event.clientX;
            let ey = event.clientY;

            let left = player.orientation === "HORIZONTAL" ? this.left : this.x;
            let right = player.orientation === "HORIZONTAL" ? this.right : this.x + this.width;
            let top = player.orientation === "HORIZONTAL" ? this.y : this.top;
            let bottom = player.orientation === "HORIZONTAL" ? this.y + this.height : this.bottom;

            if (ex > left && ex < right && ey > top && ey < bottom) {
                this.isGrabbed = true;
            }
        });
        canvas.addEventListener("mouseup", _ => {
            this.isGrabbed = false;
            // check interaction with others cards before reset positions
            this.x = lastPosX;
            this.y = lastPosY;
        });
        canvas.addEventListener("mousemove", event => {
            if (this.isGrabbed) {
                let x = event.clientX;
                let y = event.clientY;

                let offsetX = player.orientation === "HORIZONTAL" ? this.width * this.index : 0;
                let offsetY = player.orientation === "HORIZONTAL" ? 0 : this.height * this.index;
                this.x = (x - this.width / 2) - offsetX;
                this.y = y - this.height / 2 - offsetY;
            }
            canvas.getContext("2d").drawImage(this.buffer, this.x, this.y);
        });
    }
}