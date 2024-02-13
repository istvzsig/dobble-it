export default class Layers {
    constructor() {
        this.layers = [];
    }
    add(layer) {
        this.layers.push(layer);
    }
    draw(ctx) {
        this.layers.forEach(layer => {
            layer.draw(ctx);
        });
    }
}
