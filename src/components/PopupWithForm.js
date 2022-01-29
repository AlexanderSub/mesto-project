import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({popupType}, handleFormSubmit) {
    super(popupType)
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._handleFormSubmit = handleFormSubmit
  }

  _getInputValues() {
    this._inputValues = {}

    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value
    });
  }

  _setEventListeners() {
    super._setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._getInputValues()
      this._handleFormSubmit(this._inputValues)
    })
  }

  _closePopup() {
    super._closePopup()
    this._form.reset()
  }
}
