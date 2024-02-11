import Card from "./Card.js";

export default class Deck {
    constructor(len = 55) {
        this.cards = [];
        while (len--) {
            this.cards.push(new Card())
        }

        return this.cards;
    }
}