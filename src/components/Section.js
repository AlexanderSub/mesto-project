export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector);
  }

  addItem(data) {
    this._cardsArray = data;
    this.renderCards();
  }

  setCard(card) {
    if (this._cardsArray.length < 2) {
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
