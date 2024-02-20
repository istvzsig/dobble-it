import Player from "./Player.js";

export default class PlayerManager {
    constructor() {
        this.players = [];
    }
    createFromConfig(config, deck) {
        config.forEach(data => {
            const player = new Player(data);
            player.setCards(deck);
            this.players.push(player);
        });
    }
    createCardLayers(canvas, layerManager) {
        this.players.forEach(player => {
            player.cards.forEach((card, i) => {
                card.onMouseEvent(canvas, this.players, layerManager.layers);
                layerManager.add(card);
            })
        });
    }
}