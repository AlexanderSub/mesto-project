import Card from "./Card.js";

export default class OtherUserCard extends Card {
  constructor({name, link, likes, _id, owner}, selector, handleOpenPopup,  handleDeleteLike, handlePutLike) {
    super({name, link, likes, _id}, selector, handleOpenPopup,  handleDeleteLike, handlePutLike);
  }
  generate() {
    super.generate();
    this._element.querySelector('.card__delete').remove();
    return this._element;
  }
}
