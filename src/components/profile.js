import { closePopup } from "./modal.js"

const userName = document.querySelector('.profile__name')
const userJob = document.querySelector('.profile__description')
export const editProfilePopup = document.querySelector('.popup_profile-edit')
const editProfileForm = document.forms.profileEdit
const profileName = editProfileForm.elements.profile_name
const profileJob = editProfileForm.elements.profile_description

// Редактирование профиля
export function editProfile (evt) {
  evt.preventDefault()
  userName.textContent = profileName.value
  userJob.textContent = profileJob.value
  closePopup(editProfilePopup)
  editProfilePopup.removeEventListener('submit', editProfile)
}
