import { postCard, editUserData, editUserAvatar } from "./api"
import { addCard, placeNameInput, placePictureInput, cardsContainer, addPlaceForm } from "./card"
import { userName, userJob, profileName, profileJob, editProfileForm, editAvatarForm, userAvatarInput, userAvatar, editProfilePopup } from "./profile"
import { addPlacePopup, avatarPopup } from "./modal"
import { validationConfig } from "./validate"

// Функционал открытия модальных окон и их закрытия при клике на крестик, оверлэй или нажатие на клавишу Escape

const popups = document.querySelectorAll('.popup')

// Открытие и закрытие модальных окон
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByClickOnEscape)
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByClickOnEscape)
}

// Закрытие модальных окон при нажатии на Escape
function closePopupByClickOnEscape(event) {
  if (event.code === 'Escape') {
    const activePopupElement = document.querySelector('.popup_opened')

    if (activePopupElement) {
      closePopup(activePopupElement)
    }
  }
}

// Закрытие модальных окон при клике на оверлэй
function closePopupByClickOnOverlay(event) {
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




export function addCardHandler(evt) {
  evt.submitter.textContent = 'Сохранение...';
  evt.submitter.disabled = true;

  postCard(placeNameInput.value, placePictureInput.value)
    .then((card) => {
      addCard(card, cardsContainer);
      evt.submitter.classList.add(validationConfig.disabledButtonClass);
      evt.submitter.textContent = 'Создать';
      closePopup(addPlacePopup);
      addPlaceForm.reset();
    })
    .catch(err => {
      console.log(err);
      evt.submitter.textContent = 'Ошибка! Попробуйте ещё раз';
      evt.submitter.disabled = false;
    })
}

export function editProfileHandler(evt) {
  evt.submitter.textContent = 'Сохранение...';
  evt.submitter.disabled = true;

  editUserData(profileName.value, profileJob.value)
    .then(userData => {
      userName.textContent = userData.name,
      userJob.textContent = userData.about,
      evt.submitter.classList.add(validationConfig.disabledButtonClass);
      evt.submitter.textContent = 'Создать';
      closePopup(editProfilePopup);
      editProfileForm.reset();
    })
    .catch(err => {
      console.log(err);
      evt.submitter.textContent = 'Ошибка! Попробуйте ещё раз';
      evt.submitter.disabled = false;
    })

}



export function editAvatarHandler(evt) {
  evt.submitter.textContent = 'Сохранение...';
  evt.submitter.disabled = true;

  editUserAvatar(userAvatarInput.value)
    .then(userData => {
      userAvatar.src = userData.avatar,
      evt.submitter.classList.add(validationConfig.disabledButtonClass);
      evt.submitter.textContent = 'Создать';
      closePopup(avatarPopup);
      editAvatarForm.reset();
    })
    .catch(err => {
      console.log(err);
      evt.submitter.textContent = 'Ошибка! Попробуйте ещё раз';
      evt.submitter.disabled = false;
    })
}


export function hasLike(card) {
  return card.likes.some(obj => obj._id == userId)
}
