import './index.css'

import { api } from '../components/Api';
import { enableValidation } from '../components/FormValidator'
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

// import Card, { renderServerCards, renderNewCard } from '../components/Card';
import { validationConfig } from '../utils/constants';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import MyCard from "../components/MyCard.js";
import OtherUserCard from "../components/OtherUserCard.js";

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

// Добавление карточек

const addPlacePopup = new PopupWithForm({
  popupType: '.popup_place-add',
  handleFormSubmit: (formData) => {
    api.postCard(formData.place_name, formData.place_picture)
    .then(card => {
      //renderNewCard([card])
      addPlacePopup._closePopup()
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


Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, cards])=>{

  userId = userData._id
  userName.textContent = userData.name
  userAbout.textContent = userData.about
  userAvatar.src = userData.avatar
  userNameInput.value = userData.name
  userAboutInput.value = userData.about
  const newCards = new Section({data: cards, renderer: (item) => {
    // console.log(userId, item.owner._id);
    // if (userId === item.owner._id) {
    //   console.log('vaflya');
    // }
      const newCard = (userId === item.owner._id) ? new MyCard(item, '.card__template', () => {
        const popup = new PopupWithImage('.popup_place-picture');
        popup._openPopup(newCard.link, newCard.name);
      }, () => {
        api.deleteCard(item._id)
          .then((res) => newCard.deleteCard())
      }) : new OtherUserCard(item, '.card__template', () => {
        const popup = new PopupWithImage('.popup_place-picture');
        popup._openPopup(newCard.link, newCard.name);
      });
      const card = newCard.generate();
      newCards.setCard(card);
    }
    }, '.cards');
  //renderServerCards(cards);
  newCards.renderCards()
  enableValidation(validationConfig);
})
.catch(err=>console.log(err));
