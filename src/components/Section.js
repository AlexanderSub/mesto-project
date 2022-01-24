export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._cardsArray = data
    this._renderer = renderer
    this._container = containerSelector
  }

  setCard(card) {
    this._container.append(card)
  }

  clear() {
    this._container.innerHTML = ''
  }

  renderCards() {
    this.clear()

    this._cardsArray.forEach(card => {
      this._renderer(card)
    });
  }
}
