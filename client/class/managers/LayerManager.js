export default class LayerManager {
    constructor() {
        this.layers = [];
    }
    add(layer) {
        this.layers.push(layer);
    }
    draw(context) {
        this.layers.forEach(layer => {
            layer.draw(context);
        });
    }
}
