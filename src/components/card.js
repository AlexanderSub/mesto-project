import { picturePopup, addPlacePopup, deleteCardPopup } from "./modal.js"
import { openPopup, closePopup, hasLike } from "./utils.js"
import { userId } from "../pages/index.js"
import { deleteCard, putLike, deleteLike } from "./api.js"

export const cardsContainer = document.querySelector('.cards')
const cardTemplate = document.querySelector('.card__template')
const popupImage = picturePopup.querySelector('.popup__image')
const popupImageDescription = picturePopup.querySelector('.popup__image-description')
export const addPlaceForm = addPlacePopup.querySelector('.popup__form')
export const placeNameInput = addPlacePopup.querySelector('.popup__input_place')
export const placePictureInput = addPlacePopup.querySelector('.popup__input_pic')
const deleteCardForm = document.querySelector('.popup_delete-card-form')

//Создание карточки
export function createCard(card) {
  const cardClone = cardTemplate.content.firstElementChild.cloneNode(true)
  const cardImage = cardClone.querySelector('.card__image')
  const cardTitle = cardClone.querySelector('.card__title')
  const likeButton = cardClone.querySelector('.card__like')
  const likeCounter = cardClone.querySelector('.card__like-counter')
  const deleteButton = cardClone.querySelector('.card__delete')

  cardImage.src = card.link
  cardImage.alt = card.name
  cardTitle.textContent = card.name
  likeCounter.textContent = card.likes.length

  if (card.owner._id !== userId) {
    deleteButton.remove()
  }

  deleteButton.addEventListener('click', (evt) => {
    deleteCard(card._id)
    .then(() => {
      evt.target.closest('.card').remove()
    })
    .catch(err => console.log(err))
  })


  // Просмотр полного размера изображения
  cardImage.addEventListener('click', (evt) => {
    popupImage.src = evt.target.src
    popupImage.alt = evt.target.alt
    popupImageDescription.textContent = evt.target.alt
    openPopup(picturePopup)
  })

  if (card.likes.find(like => like._id === userId)) {
    likeButton.classList.add('card__like_active');
  } else {
    likeButton.classList.remove('card__like_active');
  }

  likeButton.addEventListener('click', (evt) => {
  if (card.likes.find(like => like._id === userId)) {
    deleteLike(card._id)
    .then((card) => {
      likeCounter.textContent = card.likes.length,
      evt.target.classList.remove('card__like_active')
      // likes = card.likes
    })
    .catch(err => console.log(err))
    } else {
      putLike(card._id)
      .then((card) => {
        likeCounter.textContent = card.likes.length,
        evt.target.classList.add('card__like_active')
        // likes = card.likes
      })
      .catch(err => console.log(err))
    }
})

  return cardClone
}


export function addCard(data, cardsContainer) {
  const name = data.name;
  const link = data.link;
  const card = createCard(name, link, data);

  cardsContainer.prepend(card);
}

