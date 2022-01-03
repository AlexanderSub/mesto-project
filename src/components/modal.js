import { editProfilePopup } from "./profile.js"
import { openPopup, addCardHandler, editProfileHandler, editAvatarHandler } from "./utils.js"

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const avatarPicture = document.querySelector('.profile__overlay')
export const addPlacePopup = document.querySelector('.popup_place-add')
export const picturePopup = document.querySelector('.popup_place-picture')
export const avatarPopup = document.querySelector('.popup_change-avatar')
export const deleteCardPopup = document.querySelector('.popup_delete-card')

// Обработчики

editButton.addEventListener('click', () => {
  openPopup(editProfilePopup)
});

addButton.addEventListener('click', () => {
  openPopup(addPlacePopup)
});

avatarPicture.addEventListener('click', () => {
  openPopup(avatarPopup)
})

editProfilePopup.addEventListener('submit', editProfileHandler)

addPlacePopup.addEventListener('submit', addCardHandler)

avatarPopup.addEventListener('submit', editAvatarHandler)

