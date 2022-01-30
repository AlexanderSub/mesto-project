import './index.css'

import { api } from '../components/Api';
import { enableValidation } from '../components/FormValidator'
import { userName, userAbout, userAvatar, userNameInput, userAboutInput, avatarOverlay } from '../utils/constants';
import { renderServerCards } from '../components/Card';
import { validationConfig } from '../utils/constants';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

export let userId

const profileInfo = new UserInfo(userName, userAbout, userAvatar )

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

const avatarPopup = new PopupWithForm({
  popupType: '.popup_change-avatar',
  handleFormSubmit: (formData) => {
    api.editUserAvatar(formData.profile_avatar)
    .then(userData => {
      profileInfo._setUserAvatar({newAvatar: userData.avatar})
      avatarPopup._closePopup()
      avatarPopup._submitButton.disabled = true
      avatarPopup._submitButton.classList.add('popup__save-button_disabled')
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      avatarPopup._setDefaultText()
    })
  },
})

avatarPopup._setEventListeners()


avatarOverlay.addEventListener('click', () => {
  avatarPopup._openPopup()
})
