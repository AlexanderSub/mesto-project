import { picturePopup, addPlacePopup } from "./modal.js"
import { openPopup, closePopup } from "./utils.js"
import { enableValidation } from "./validate.js"

export const cardsContainer = document.querySelector('.cards')
const cardTemplate = document.querySelector('.card__template')
const popupImage = picturePopup.querySelector('.popup__image')
const popupImageDescription = picturePopup.querySelector('.popup__image-description')
const addPlaceForm = addPlacePopup.querySelector('.popup__form')
const placeNameInput = addPlacePopup.querySelector('.popup__input_place')
const placePictureInput = addPlacePopup.querySelector('.popup__input_pic')

//Создание карточки
export function createCard(newCard) {
  const cardClone = cardTemplate.content.firstElementChild.cloneNode(true)
  const cardImage = cardClone.querySelector('.card__image')

  cardImage.setAttribute('src', newCard.link)
  cardImage.setAttribute('alt', newCard.name)

  cardImage.addEventListener('click', (evt) => {
    const link = evt.target.getAttribute('src')
    const text = evt.target.getAttribute('alt')
    popupImage.setAttribute('src', link)
    popupImage.setAttribute('alt', text)
    popupImageDescription.textContent = text
    openPopup(picturePopup)
  })

  cardClone.querySelector('.card__title').textContent = newCard.name;

  cardClone.querySelector('.card__delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove()})

  cardClone.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active')
  });

  return cardClone
}

// Добавление карточки
export function addCard(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value
  const placeLink = placePictureInput.value
  const data = {
    name: placeName,
    link: placeLink,
    alt: placeName
  }

  cardsContainer.prepend(createCard(data))
  closePopup(addPlacePopup)
  addPlaceForm.reset()
  enableValidation()
}


