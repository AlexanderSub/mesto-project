import { picturePopup, deleteCardPopup, deleteCardForm, popupImage, popupImageDescription, cardsContainer, cardTemplate } from "../utils/constants"
import { openPopup, closePopup } from "../utils/utils"
import { userId } from "../pages/index"
import { api } from "./Api"


const getCardData = (card) => {
  const cardData = {
    likeCounter: card.likes.length,
    likedByMe: Boolean(card.likes.find(owner => owner._id === userId)),
    cardId: card._id,
    name: card.name,
    link: card.link,
    isMine: card.owner._id === userId,
  };
  return cardData;
}

export const createCard = ({ cardId = '', link = '', name = '', likeCounter = 0, isMine = false, likedByMe = false } = {}) => {

  const card = cardTemplate.cloneNode(true)
  card.cardID = cardId

  // Карточка изображения
  const cardImage = card.querySelector('.card__image')
  cardImage.src = link
  cardImage.alt = name

  card.querySelector('.card__title').textContent = name
  cardImage.addEventListener('click', (evt) => {
    popupImage.src = evt.target.src
    popupImage.alt = evt.target.alt
    popupImageDescription.textContent = evt.target.alt
    openPopup(picturePopup)
  })

  // Кнопка удаления
  const deleteButton = card.querySelector('.card__delete')
  if (!isMine) {
    deleteButton.remove()
  }
  deleteButton.addEventListener('click', () => {
    deleteCardForm.cardId = cardId
    deleteCardForm.currentCard = card
    openPopup(deleteCardPopup)
  });

  // Кнопка лайка
  const likeButton = card.querySelector('.card__like')
  likeButton.addEventListener('click', () => {
    toggleLike(card, likeButton, cardId)
  });
  updateLikeStatus(likeButton, likedByMe)

  // Счётчик лайков
  card.querySelector('.card__like-counter').textContent = likeCounter

  return card
}

export const renderServerCards = (cardList) => {
  cardList.forEach(card => {
    const cardData = getCardData(card)
    insertServerCards(createCard(cardData))
  })
}

export const insertServerCards = (card, place = cardsContainer) => {
  place.append(card)
}

export const renderNewCard = (cardList) => {
  cardList.forEach(card => {
    const cardData = getCardData(card)
    insertNewCard(createCard(cardData))
  })
}

export const insertNewCard = (card, place = cardsContainer) => {
  place.prepend(card)
}

const removeCard = (card) => {
  card.remove()
}

const updateLikeStatus = (likeButton, likedByMe = false) => {
  if (likedByMe) {
    likeButton.classList.add('card__like_active')
  } else {
    likeButton.classList.remove('card__like_active')
  }
}

const toggleLike = (card, likeButton, cardId) => {

  const handleLike = likeButton.classList.contains('card__like_active') ? api.deleteLike : api.putLike

  handleLike(cardId)
    .then(cardResponse => {
      const cardData = getCardData(cardResponse)
      updateLikeStatus(likeButton, cardData.likedByMe)
      countLikes(card, cardData.likeCounter)
    })
    .catch(err => console.log(err))
}

const countLikes = (card, likeCounter = 0) => {
  card.querySelector('.card__like-counter').textContent = likeCounter
}


deleteCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault()
  evt.submitter.textContent = 'Удаление...'
  evt.submitter.disabled = true
  const currentCard = evt.target.currentCard
  api.deleteCard(evt.target.cardId)
    .then(() => {
      removeCard(currentCard)
      closePopup(deleteCardPopup)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      evt.submitter.textContent = 'Да'
      evt.submitter.disabled = false
    })
})

// export default class Card {
//   constructor(data) {
//     this.name = data.name
//     this.link = data.link
//     this._id = data._id
//     this.owner = data.owner
//   }

//   _getElement() {
//     const cardElement = document
//     .querySelector('.card__template')
//     .content
//     .querySelector('.card')
//     .cloneNode(true)

//     return cardElement
//   }
// }
