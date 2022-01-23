import { editButton, addButton, avatarOverlay, editProfilePopup, addPlacePopup, avatarPopup } from "../utils/constants"
import { openPopup, editProfileHandler, editAvatarHandler, addCardHandler } from "../utils/utils.js"

// Обработчики

editButton.addEventListener('click', () => {
  openPopup(editProfilePopup)
})

addButton.addEventListener('click', () => {
  openPopup(addPlacePopup)
})

avatarOverlay.addEventListener('click', () => {
  openPopup(avatarPopup)
})

editProfilePopup.addEventListener('submit', editProfileHandler)

addPlacePopup.addEventListener('submit', addCardHandler)

avatarPopup.addEventListener('submit', editAvatarHandler)

