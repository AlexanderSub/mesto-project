import { api } from "../components/Api"

import {
  renderNewCard
} from "../components/Card"

import {
  popups,
  userName,
  userAbout,
  userNameInput,
  userAboutInput,
  editAvatarForm,
  userAvatarInput,
  userAvatar,
  editProfilePopup,
  avatarPopup,
  addPlacePopup,
  addPlaceForm,
  placeNameInput,
  placePictureInput
} from "./constants"

// Функционал открытия модальных окон и их закрытия при клике на крестик, оверлэй или нажатие на клавишу Escape

// Открытие и закрытие модальных окон
export const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  // document.addEventListener('keydown', closePopupByClickOnEscape)
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  // document.removeEventListener('keydown', closePopupByClickOnEscape)
}

// Закрытие модальных окон при нажатии на Escape
// const closePopupByClickOnEscape = (event) => {
//   if (event.code === 'Escape') {
//     const activePopupElement = document.querySelector('.popup_opened')

//     if (activePopupElement) {
//       closePopup(activePopupElement)
//     }
//   }
// }

// Закрытие модальных окон при клике на оверлэй
const closePopupByClickOnOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.target)
  }
}

// Закрытие модальных окон при клике на крестик
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
    }
  })
})

// Добавление карточек

export const addCardHandler = (evt) => {
  evt.submitter.textContent = 'Сохранение...'
  evt.submitter.disabled = true

  const nameCard = placeNameInput.value
  const linkCard = placePictureInput.value
  api.postCard(nameCard, linkCard)
    .then(card => {
      renderNewCard([card])
      closePopup(addPlacePopup)
      addPlaceForm.reset()
      evt.submitter.classList.add('popup__save-button_disabled')
      evt.submitter.disabled = true
    })
    .catch(err => {
      console.log(err)
      evt.submitter.disabled = false
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить'
    });
}

// Редактирование профиля

export const editProfileHandler = (evt) => {
  evt.submitter.textContent = 'Сохранение...'
  evt.submitter.disabled = true

  api.editUserData(userNameInput.value, userAboutInput.value)
    .then(userData => {
      userName.textContent = userData.name
      userAbout.textContent = userData.about
      closePopup(editProfilePopup)
    })
    .catch(err => {
      console.log(err)
      evt.submitter.disabled = false
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить'
      evt.submitter.disabled = false
    })
}

