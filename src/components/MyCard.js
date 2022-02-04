import Card from "./Card.js";

export default class MyCard extends Card {
  constructor({name, link, likes, _id, owner}, selector, handleOpenPopup, handleDeleteButton,  handleDeleteLike, handlePutLike) {
    super({name, link, likes, _id}, selector, handleOpenPopup,  handleDeleteLike, handlePutLike);
    this._handleDeleteButton = handleDeleteButton;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._element
      .querySelector('.card__delete')
      .addEventListener('click', () => {
        this._handleDeleteButton();
      })
  }
  deleteCard() {
    this._element.remove();
  }
}
