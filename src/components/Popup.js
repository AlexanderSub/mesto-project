import { editButton, addButton, editProfilePopup, addPlacePopup } from "../utils/constants"
import { openPopup, editProfileHandler, addCardHandler } from "../utils/utils.js"

// Обработчики

// editButton.addEventListener('click', () => {
//   openPopup(editProfilePopup)
// })

addButton.addEventListener('click', () => {
  openPopup(addPlacePopup)
})

// editProfilePopup.addEventListener('submit', editProfileHandler)

addPlacePopup.addEventListener('submit', addCardHandler)

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
