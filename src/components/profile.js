import { closePopup } from "./utils.js"
import { editUserAvatar } from "./api.js"
import { avatarPopup } from "./modal.js"

export const userName = document.querySelector('.profile__name')
export const userJob = document.querySelector('.profile__description')
export const userAvatar = document.querySelector('.profile__avatar')
export const editProfilePopup = document.querySelector('.popup_profile-edit')
export const editProfileForm = document.forms.profileEdit
export const profileName = editProfileForm.elements.profile_name
export const profileJob = editProfileForm.elements.profile_description
export const editAvatarForm = document.forms.editAvatar
export const userAvatarInput = editAvatarForm.elements.profile_avatar

