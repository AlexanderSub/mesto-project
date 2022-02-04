import Card from "./card.js";

export default class OtherUserCard extends Card {
  constructor({name, link, likes, _id, owner}, selector, handleOpenPopup) {
    super({name, link, likes, _id}, selector, handleOpenPopup);
  }
  generate() {
    super.generate();
    this._element.querySelector('.card__delete').remove();
    return this._element;
  }
}
