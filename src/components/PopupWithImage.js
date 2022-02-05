import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupType) {
    super(popupType)
    this.popupImage = this._popup.querySelector('.popup__image')
    this.popupImageDescription = this._popup.querySelector('.popup__image-description')
  }

  open(link, name) {
    this.popupImage.src = link;
    this.popupImage.alt = name;
    this.popupImageDescription.textContent = name;
    super.open();
  }
}
