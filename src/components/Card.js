import {userId} from "../pages";

export default class Card {
  constructor({
                name,
                link,
                likes,
                _id
              }, selector, handleOpenPopup, handleDeleteButton, handleDeleteLike, handlePutLike) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this._id = _id;
    this._selector = selector;
    this._handleOpenPopup = handleOpenPopup;
    this._handleDeleteButton = handleDeleteButton;
    this._handleDeleteLike = handleDeleteLike;
    this._handlePutLike = handlePutLike;
  }

  _likeCard() {
    if (this._checkLike()) {
      this._handleDeleteLike(this._id)
        .then((res) => {
          this.likes = res.likes;
          this._element.querySelector('.card__like-counter').textContent = this.likes.length;
          this._element.querySelector('.card__like').classList.add('card__like_disabled');
          this._element.querySelector('.card__like').classList.remove('card__like_active');
        })
    } else {
      this._handlePutLike(this._id)
        .then((res) => {
          this.likes = res.likes;
          this._element.querySelector('.card__like-counter').textContent = this.likes.length;
          this._element.querySelector('.card__like').classList.add('card__like_active');
          this._element.querySelector('.card__like').classList.remove('card__like_disabled');
        })
    }
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => {
        this._handleOpenPopup();
      });
    this._element
      .querySelector('.card__like')
      .addEventListener('click', () => {
        this._likeCard();
      });
    this._element
      .querySelector('.card__delete')
      .addEventListener('click', () => {
        this._handleDeleteButton();
      });
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this.name;
    this._element.querySelector('.card__image').alt = this.name;
    this._element.querySelector('.card__image').src = this.link;
    this._element.querySelector('.card__like-counter').textContent = this.likes.length;
    if (this._checkLike()) {
      this._element.querySelector('.card__like').classList.add('card__like_active');
      this._element.querySelector('.card__like').classList.remove('card__like_disabled');
    } else {
      this._element.querySelector('.card__like').classList.add('card__like_disabled');
      this._element.querySelector('.card__like').classList.remove('card__like_active');
    }

    return this._element;
  }

  _checkLike() {
    return this.likes.some((like) => {
      return like._id === userId
    })
  }

  deleteCard() {
    this._element.remove();
  }

  removeDeleteBtn() {
    this._element.querySelector('.card__delete').remove();
  }
}
