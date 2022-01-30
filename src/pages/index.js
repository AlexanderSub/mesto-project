import './index.css'

import { api } from '../components/Api';
import { enableValidation } from '../components/FormValidator'
import { userName, userAbout, userAvatar, userNameInput, userAboutInput, avatarOverlay, editButton } from '../utils/constants';
import { renderServerCards } from '../components/Card';
import { validationConfig } from '../utils/constants';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

export let userId

const profileInfo = new UserInfo(userName, userAbout, userAvatar)

//Блок редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupType: '.popup_profile-edit',
  handleFormSubmit: (formData) => {
    api.editUserData(formData.profile_name, formData.profile_description)
    .then(userData => {
      profileInfo._setUserInfo({
        name: userData.name,
        about: userData.about
      })
      editProfilePopup._closePopup()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      editProfilePopup._setDefaultText()
    })
  }
})

editProfilePopup._setEventListeners()

editButton.addEventListener('click', () => {
  editProfilePopup._openPopup()
})

//Блок редактирования аватара
const avatarPopup = new PopupWithForm({
  popupType: '.popup_change-avatar',
  handleFormSubmit: (formData) => {
    api.editUserAvatar(formData.profile_avatar)
    .then(userData => {
      profileInfo._setUserAvatar({avatar: userData.avatar})
      avatarPopup._closePopup()
      avatarPopup._resetForm()
      avatarPopup._submitButton.disabled = true
      avatarPopup._submitButton.classList.add('popup__save-button_disabled')
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      avatarPopup._setDefaultText()
    })
  }
})

avatarPopup._setEventListeners()

avatarOverlay.addEventListener('click', () => {
  avatarPopup._openPopup()
})


Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, cards])=>{

  userId = userData._id
  userName.textContent = userData.name
  userAbout.textContent = userData.about
  userAvatar.src = userData.avatar
  userNameInput.value = userData.name
  userAboutInput.value = userData.about

  renderServerCards(cards);

  enableValidation(validationConfig);
})
.catch(err=>console.log(err));
