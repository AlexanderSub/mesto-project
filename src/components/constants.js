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

export const popups = document.querySelectorAll('.popup')

export const editProfilePopup = document.querySelector('.popup_profile-edit')
export const editProfileForm = document.forms.profileEdit

export const addPlacePopup = document.querySelector('.popup_place-add')
export const addPlaceForm = addPlacePopup.querySelector('.popup__form')

export const picturePopup = document.querySelector('.popup_place-picture')

export const deleteCardPopup = document.querySelector('.popup_delete-card')
export const deleteCardForm = document.querySelector('.popup_delete-card-form')

export const avatarPopup = document.querySelector('.popup_change-avatar')
export const editAvatarForm = document.forms.editAvatar

export const editButton = document.querySelector('.profile__edit-button')

export const userName = document.querySelector('.profile__name')
export const userNameInput = editProfileForm.elements.profile_name
export const userAbout = document.querySelector('.profile__description')
export const userAboutInput = editProfileForm.elements.profile_description

export const userAvatar = document.querySelector('.profile__avatar')
export const userAvatarInput = editAvatarForm.elements.profile_avatar
export const avatarOverlay = document.querySelector('.profile__overlay')

export const addButton = document.querySelector('.profile__add-button')
export const placeNameInput = addPlacePopup.querySelector('.popup__input_place')
export const placePictureInput = addPlacePopup.querySelector('.popup__input_pic')

export const popupImage = picturePopup.querySelector('.popup__image')
export const popupImageDescription = picturePopup.querySelector('.popup__image-description')

export const cardsContainer = document.querySelector('.cards')
export const cardTemplate = document.querySelector('.card__template').content.querySelector('.card')
