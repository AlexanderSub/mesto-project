export default class Card {
  constructor({
                name,
                link,
                likes,
                owner,
                _id
              }, selector, handleOpenPopup, handleDeleteButton, handleDeleteLike, handlePutLike, userId) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.owner = owner;
    this._id = _id;
    this._userId = userId;
    this._selector = selector;
    this._handleOpenPopup = handleOpenPopup;
    this._handleDeleteButton = handleDeleteButton;
    this._handleDeleteLike = handleDeleteLike;
    this._handlePutLike = handlePutLike;
  }

  _likeCard(card) {
    if (this._checkLike()) {
      this._handleDeleteLike(card)
        .then((res) => {
          this.likes = res.likes;
          this._likeCounter.textContent = this.likes.length;
          this._likeElement.classList.add('card__like_disabled');
          this._likeElement.classList.remove('card__like_active');
        })
        .catch((err) => console.log(err));
    } else {
      this._handlePutLike(card)
        .then((res) => {
          this.likes = res.likes;
          this._likeCounter.textContent = this.likes.length;
          this._likeElement.classList.add('card__like_active');
          this._likeElement.classList.remove('card__like_disabled');
        })
        .catch((err) => console.log(err));
    }
  }

  setEventListeners() {
    this._cardImage
      .addEventListener('click', () => {
        this._handleOpenPopup();
      });
    this._likeElement
      .addEventListener('click', () => {
        this._likeCard(this);
      });
    this._deleteBtn
      .addEventListener('click', () => {
        this._handleDeleteButton(this);
      });
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  getOwnerId() {
    return this.owner._id;
  }

  getId() {
    return this._id;
  }

  generate() {
    this._element = this._getElement();
    this._likeElement = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._cardImage = this._element.querySelector('.card__image');
    this._deleteBtn = this._element.querySelector('.card__delete');

    this.setEventListeners();

    this._element.querySelector('.card__title').textContent = this.name;
    this._cardImage.alt = this.name;
    this._cardImage.src = this.link;
    this._likeCounter.textContent = this.likes.length;
    if (this._checkLike()) {
      this._likeElement.classList.add('card__like_active');
      this._likeElement.classList.remove('card__like_disabled');
    } else {
      this._likeElement.classList.add('card__like_disabled');
      this._likeElement.classList.remove('card__like_active');
    }

    return this._element;
  }

  _checkLike() {
    return this.likes.some((like) => {
      return like._id === this._userId
    })
  }

  deleteCard() {
    this._element.remove();
  }

  removeDeleteBtn() {
    this._deleteBtn.remove();
  }
}
