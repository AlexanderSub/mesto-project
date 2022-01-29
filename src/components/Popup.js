import { editButton, addButton, avatarOverlay, editProfilePopup, addPlacePopup, avatarPopup } from "../utils/constants"
import { openPopup, editProfileHandler, editAvatarHandler, addCardHandler } from "../utils/utils.js"

// Обработчики

editButton.addEventListener('click', () => {
  openPopup(editProfilePopup)
})

addButton.addEventListener('click', () => {
  openPopup(addPlacePopup)
})

avatarOverlay.addEventListener('click', () => {
  openPopup(avatarPopup)
})

editProfilePopup.addEventListener('submit', editProfileHandler)

addPlacePopup.addEventListener('submit', addCardHandler)

avatarPopup.addEventListener('submit', editAvatarHandler)

export default class Popup {
  constructor(popupType) {
    this._popup = document.querySelector(popupType)
  }

  _openPopup() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._closePopupByClickOnEscape);
  }

  _closePopup() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._closePopupByClickOnEscape);
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-icon')) {
        this._closePopup()
      }
    })
  }

  _closePopupByClickOnEscape(evt) {
    if (evt.key === "Escape") {
      this._closePopup();
    }
  }
}
