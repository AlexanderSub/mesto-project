import { editProfilePopup, editProfile } from "./profile.js"
import { addCard } from "./card.js"
import { openPopup } from "./utils.js"

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
export const addPlacePopup = document.querySelector('.popup_place-add')
export const picturePopup = document.querySelector('.popup_place-picture')

// Обработчики

editButton.addEventListener('click', function (){
  openPopup(editProfilePopup)
});

addButton.addEventListener('click', function (){
  openPopup(addPlacePopup)
});

editProfilePopup.addEventListener('submit', editProfile)

addPlacePopup.addEventListener('submit', addCard)
