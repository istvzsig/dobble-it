import Player from "../Player.js";

export default class PlayerManager {
    constructor(game) {
        this.game = game;
        this.players = [];
    }
    createFromConfig(config) {
        config.forEach(data => {
            const player = new Player(data, this.game);
            player.getCardsFromDeck(2);
            this.players.push(player);
            player.addCardsToLayerManager();
        });
    }
}