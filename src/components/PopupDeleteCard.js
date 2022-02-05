import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupType, handleFormSubmit }) {
    super(popupType);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup_delete-card-form')
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  }

  close() {
    this._form.removeEventListener('submit', this._handleFormSubmit);
    super.close();
  }
}
