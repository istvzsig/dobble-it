export class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Perimeter {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }
    get() {
        return this.w * this.h;
    }
}