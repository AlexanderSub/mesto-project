export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: 'bd868286-b540-4323-aa0c-2f039f089353',
    'Content-Type': 'application/json'
  }
}

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const selectors = {
  userName:   '.profile__name',
  userAbout:  '.profile__description',
  userAvatar: '.profile__avatar'
}

export const editProfileForm = document.forms.profileEdit
export const editAvatarForm = document.forms.editAvatar

export const addPlacePopup = document.querySelector('.popup_place-add')
export const addPlaceForm = addPlacePopup.querySelector('.popup__form')

export const deleteCardPopup = document.querySelector('.popup_delete-card')
export const deleteCardForm = document.querySelector('.popup_delete-card-form')

export const editButton = document.querySelector('.profile__edit-button')

export const userNameInput = editProfileForm.elements.profile_name

export const userAboutInput = editProfileForm.elements.profile_description

export const avatarOverlay = document.querySelector('.profile__overlay')

export const addButton = document.querySelector('.profile__add-button')

export const cardsContainer = document.querySelector('.cards')
export const cardTemplate = document.querySelector('.card__template').content.querySelector('.card')
