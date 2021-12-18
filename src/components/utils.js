import { editProfile } from "./profile.js"
import { editProfilePopup } from "./profile.js"
import { openPopup, closePopup } from "./modal.js"
import { addCard } from "./card.js"

const editButton = document.querySelector('.profile__edit-button')
const editCloseIcon = editProfilePopup.querySelector('.popup__close-icon')
const addButton = document.querySelector('.profile__add-button')
export const addPlacePopup = document.querySelector('.popup_place-add')
const addCloseIcon = addPlacePopup.querySelector('.popup__close-icon')
export const picturePopup = document.querySelector('.popup_place-picture')
const pictureCloseIcon = picturePopup.querySelector('.popup__close-icon')

// Обработчики

editButton.addEventListener('click', function (){
  openPopup(editProfilePopup)
  editProfilePopup.addEventListener('submit', editProfile)
});

editCloseIcon.addEventListener('click', function (){
  closePopup(editProfilePopup)
  editProfilePopup.removeEventListener('submit', editProfile)
});

addButton.addEventListener('click', function (){
  openPopup(addPlacePopup)
  addPlacePopup.addEventListener('submit', addCard)
});

addCloseIcon.addEventListener('click', function (){
  closePopup(addPlacePopup)
  addPlacePopup.removeEventListener('submit', addCard)
});

pictureCloseIcon.addEventListener('click', function (){
  closePopup(picturePopup)
});
