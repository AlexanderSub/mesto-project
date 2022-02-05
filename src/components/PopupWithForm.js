import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({popupType, handleFormSubmit}) {
    super(popupType)
    this._handleFormSubmit = handleFormSubmit

    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._submitButton = this._form.querySelector('.popup__save-button')
  }

  _getInputValues() {

    this._formValues = {}

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    });

    return this._formValues
  }

  _renderLoading() {
    this._submitButton.setAttribute('disabled', true)
    this._submitButton.initialValue = this._submitButton.textContent
    this._submitButton.textContent = 'Сохранение...'
  }

  setDefaultText() {
    this._submitButton.textContent = this._submitButton.initialValue
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._getInputValues()
      this._renderLoading()
      this._handleFormSubmit(this._formValues)
    })
  }

  close() {
    this._form.reset()
    super.close()
  }
}
