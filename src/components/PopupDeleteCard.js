import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupType, handleFormSubmit }) {
    super(popupType);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup_delete-card-form')
  }

  _openPopup() {
    super._openPopup();
    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._handleFormSubmit);
    super._setEventListeners();
  }

  close() {
    this._form.removeEventListener('submit', this._handleFormSubmit);
    super.close();
  }
}
