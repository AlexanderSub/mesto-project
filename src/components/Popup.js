export default class Popup {
  constructor(popupType) {
    this._popup = document.querySelector(popupType)
    this._handleEscapeClose = this._closePopupByClickOnEscape.bind(this)
  }

  _openPopup() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscapeClose);
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-icon')) {
        this.close()
      }
    })
  }

  _closePopupByClickOnEscape(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
