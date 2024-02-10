export default class LayerManager {
    constructor() {
        this.layers = [];
    }
    add(layer) {
        this.layers.push(layer);
    }
    draw(ctx, args) {
        this.layers.forEach(layer => {
            layer.draw(ctx, args);
        });
    }
}
