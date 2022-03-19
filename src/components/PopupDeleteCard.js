import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupType) {
    super(popupType);
    this.form = this._popup.querySelector('.popup_delete-card-form')
  }

  open() {
    super.open();
    this._setSubmitEventListeners();
  }

  _setSubmitEventListeners() {
    this.form.addEventListener('submit', this._handleFormSubmit);
  }

  getHandler(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this.form.removeEventListener('submit', this._handleFormSubmit);
    super.close();
  }
}
