import './index.css'

import {api} from '../components/Api';
import FormValidator from "../components/FormValidator";
import {
  userName,
  userAbout,
  userAvatar,
  userNameInput,
  userAboutInput,
  avatarOverlay,
  editButton,
  addButton
} from '../utils/constants';

import {validationConfig} from '../utils/constants';
import {createCards} from "../utils/utils.js";
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
        editProfilePopup.close()
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
const editProfileFormValidator = new FormValidator({data: validationConfig, form: editProfilePopup._form});
editProfileFormValidator.enableValidation();

//Блок редактирования аватара
const avatarPopup = new PopupWithForm({
  popupType: '.popup_change-avatar',
  handleFormSubmit: (formData) => {
    api.editUserAvatar(formData.profile_avatar)
      .then(userData => {
        profileInfo._setUserAvatar({avatar: userData.avatar})
        avatarPopup.close()
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
const avatarFormValidator = new FormValidator({data: validationConfig, form: avatarPopup._form});
avatarFormValidator.enableValidation();

// Добавление карточек

const addPlacePopup = new PopupWithForm({
  popupType: '.popup_place-add',
  handleFormSubmit: (formData) => {
    api.postCard(formData.place_name, formData.place_picture)
      .then(card => {
        createCards([card])
        addPlacePopup.close()
        addPlacePopup._resetForm()
        addPlacePopup._submitButton.disabled = true
        addPlacePopup._submitButton.classList.add('popup__save-button_disabled')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        addPlacePopup._setDefaultText()
      });
  }
})

addPlacePopup._setEventListeners()

addButton.addEventListener('click', () => {
  addPlacePopup._openPopup()
})

const addPlaceFormValidator = new FormValidator({data: validationConfig, form: addPlacePopup._form});
addPlaceFormValidator.enableValidation();

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {

    userId = userData._id
    userName.textContent = userData.name
    userAbout.textContent = userData.about
    userAvatar.src = userData.avatar
    userNameInput.value = userData.name
    userAboutInput.value = userData.about
    createCards(cards);
  })
  .catch(err => console.log(err));
