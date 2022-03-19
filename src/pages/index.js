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
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import PopupWithImage from '../components/PopupWithImage';
import PopupDeleteCard from "../components/PopupDeleteCard";
import Section from "../components/Section";
import Card from "../components/Card";

const profileInfo = new UserInfo(selectors.userName, selectors.userAbout, selectors.userAvatar);

//Создание попапа удаления карточки
const deletePopup = new PopupDeleteCard('.popup_delete-card');
deletePopup.setEventListeners();

//Создание попапа карточки
const imagePopup = new PopupWithImage('.popup_place-picture');
imagePopup.setEventListeners();

//Создание класса Section
const newCards = new Section({renderer:  (item) => {
    const newCard = new Card(
      item,
      '.card__template',
      () => {
        imagePopup.open(newCard.link, newCard.name);
      },
      (card) => {
        deletePopup.getHandler((evt) => {
          evt.preventDefault();
          api.deleteCard(card.getId())
            .then(() => {
              newCard.deleteCard();
              deletePopup.close();
            })
            .catch((err) => console.log(err));
        })
        deletePopup.open();
      },
      (card) => {
        return api.deleteLike(card.getId())
      },
      (card) => {
        return api.putLike(card.getId())
      },
      profileInfo.getUserInfo().userId
    )

    const card = newCard.generate();
    if (!(profileInfo.getUserInfo().userId === newCard.getOwnerId())) {
      newCard.removeDeleteBtn()
    }
    newCards.setCard(card);
  }}, '.cards')

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

const editProfileFormValidator = new FormValidator({data: validationConfig, form: editProfilePopup.form});
editProfileFormValidator.enableValidation();

editButton.addEventListener('click', () => {
  const currentUser = profileInfo.getUserInfo()
  userNameInput.value = currentUser.userName;
  userAboutInput.value = currentUser.userAbout;
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
})


//Блок редактирования аватара
const avatarPopup = new PopupWithForm({
  popupType: '.popup_change-avatar',
  handleFormSubmit: (formData) => {
    api.editUserAvatar(formData.profile_avatar)
      .then(userData => {
        profileInfo.setUserInfo({avatar: userData.avatar});
        avatarPopup.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.setDefaultText();
      })
  }
})

avatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator({data: validationConfig, form: avatarPopup.form});
avatarFormValidator.enableValidation();

avatarOverlay.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
})


// Добавление карточек

const addPlacePopup = new PopupWithForm({
  popupType: '.popup_place-add',
  handleFormSubmit: (formData) => {
    api.postCard(formData.place_name, formData.place_picture)
      .then(card => {
        newCards.addItem([card]);
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

const addPlaceFormValidator = new FormValidator({data: validationConfig, form: addPlacePopup.form});
addPlaceFormValidator.enableValidation();

addButton.addEventListener('click', () => {
  addPlaceFormValidator.resetValidation();
  addPlacePopup.open();
})

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {

    profileInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      userId: userData._id
    })
    newCards.addItem(cards);
  })
  .catch(err => console.log(err));
