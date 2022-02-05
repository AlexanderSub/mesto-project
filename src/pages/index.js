import './index.css'

import {api} from '../components/Api';
import FormValidator from "../components/FormValidator";
import {
  userNameInput,
  userAboutInput,
  avatarOverlay,
  editButton,
  addButton,
  selectors
} from '../utils/constants';

import {validationConfig} from '../utils/constants';
import {createCards} from "../utils/utils.js";
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import PopupWithImage from '../components/PopupWithImage';

export let userId

const profileInfo = new UserInfo(selectors.userName, selectors.userAbout, selectors.userAvatar)

//Блок редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupType: '.popup_profile-edit',
  handleFormSubmit: (formData) => {
    api.editUserData(formData.profile_name, formData.profile_description)
      .then(userData => {
        profileInfo.setUserInfo({
          name: userData.name,
          about: userData.about
        })
        editProfilePopup.close()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        editProfilePopup.setDefaultText()
      })
  }
})

editProfilePopup.setEventListeners()

editButton.addEventListener('click', () => {
  const currentUser = profileInfo.getUserInfo()
  userNameInput.value = currentUser.userName
  userAboutInput.value = currentUser.userAbout
  editProfilePopup.open()
})
const editProfileFormValidator = new FormValidator({data: validationConfig, form: editProfilePopup._form});
editProfileFormValidator.enableValidation();

//Блок редактирования аватара
const avatarPopup = new PopupWithForm({
  popupType: '.popup_change-avatar',
  handleFormSubmit: (formData) => {
    api.editUserAvatar(formData.profile_avatar)
      .then(userData => {
        profileInfo.setUserInfo({avatar: userData.avatar})
        avatarPopup.close()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        avatarPopup.setDefaultText()
      })
  }
})

avatarPopup.setEventListeners()

avatarOverlay.addEventListener('click', () => {
  avatarPopup.open()
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
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        addPlacePopup.setDefaultText()
      });
  }
})

addPlacePopup.setEventListeners()

addButton.addEventListener('click', () => {
  addPlacePopup.open()
})

const addPlaceFormValidator = new FormValidator({data: validationConfig, form: addPlacePopup._form});
addPlaceFormValidator.enableValidation();


const imagePopup = new PopupWithImage('.popup_place-picture')
imagePopup.setEventListeners()

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {

    userId = userData._id
    profileInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar
    })

    createCards(cards);
  })
  .catch(err => console.log(err));
