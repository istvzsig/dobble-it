import DobbleIt from "./DobbleIt.js";

const game = new DobbleIt();

game.players.forEach(player => {
    player.cards.forEach(card => {
        card.onMouseEvent(game.canvas, player);
    })
})
game.start();
