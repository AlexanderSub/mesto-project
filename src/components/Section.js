export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._cardsArray = data
    this._renderer = renderer
    this._container = document.querySelector(containerSelector);
  }

  setCard(card) {
    if (this._cardsArray.length < 2){
      this._container.prepend(card);
    } else {
      this._container.append(card)
    }
  }

  renderCards() {
    this._cardsArray.forEach(card => {
      this._renderer(card)
    });
  }
}
