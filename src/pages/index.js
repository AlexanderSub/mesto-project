import './index.css'

import { openPopup, closePopup } from '../components/modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];


const editButton = document.querySelector('.profile__edit-button')
const userName = document.querySelector('.profile__name')
const userJob = document.querySelector('.profile__description')

const editProfilePopup = document.querySelector('.popup_profile-edit')
const editProfileForm = document.forms.profileEdit
const profileName = editProfileForm.elements.profile_name
const profileJob = editProfileForm.elements.profile_description
const editCloseIcon = editProfilePopup.querySelector('.popup__close-icon')

const cardTemplate = document.querySelector('.card__template')
const cardsContainer = document.querySelector('.cards')
const addButton = document.querySelector('.profile__add-button')

const addPlacePopup = document.querySelector('.popup_place-add')
const placeNameInput = addPlacePopup.querySelector('.popup__input_place')
const placePictureInput = addPlacePopup.querySelector('.popup__input_pic')
const addCloseIcon = addPlacePopup.querySelector('.popup__close-icon')

const picturePopup = document.querySelector('.popup_place-picture')
const popupImage = picturePopup.querySelector('.popup__image')
const popupImageDescription = picturePopup.querySelector('.popup__image-description')
const pictureCloseIcon = picturePopup.querySelector('.popup__close-icon')



// Редактирование профиля
function editProfile (evt) {
  evt.preventDefault()
  userName.textContent = profileName.value
  userJob.textContent = profileJob.value
  closePopup(editProfilePopup)
  editProfilePopup.removeEventListener('submit', editProfile)
}

//Создание карточки
function createCard(newCard) {
  const cardClone = cardTemplate.content.firstElementChild.cloneNode(true)
  const cardImage = cardClone.querySelector('.card__image')

  cardImage.setAttribute('src', newCard.link)
  cardImage.setAttribute('alt', newCard.name)

  cardImage.addEventListener('click', (evt) => {
    const link = evt.target.getAttribute('src')
    const text = evt.target.getAttribute('alt')
    popupImage.setAttribute('src', link)
    popupImage.setAttribute('alt', text)
    popupImageDescription.textContent = text
    openPopup(picturePopup)
  })

  cardClone.querySelector('.card__title').textContent = newCard.name;

  cardClone.querySelector('.card__delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove()})

  cardClone.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active')
  });

  return cardClone
}

// Добавление начальных карточек
for (const card of initialCards) {
	cardsContainer.append(createCard(card))
}

// Добавление карточки
function addCard(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value
  const placeLink = placePictureInput.value
  const data = {
    name: placeName,
    link: placeLink,
    alt: placeName
  }

  cardsContainer.prepend(createCard(data))
  closePopup(addPlacePopup)

  placeNameInput.value = ''
  placePictureInput.value = ''
}

// Обработчики

editButton.addEventListener('click', function (){
  openPopup(editProfilePopup)
  editProfilePopup.addEventListener('submit', editProfile)
});

editCloseIcon.addEventListener('click', function (){
  closePopup(editProfilePopup)
  editProfilePopup.removeEventListener('submit', editProfile)
});

addButton.addEventListener('click', function (){
  openPopup(addPlacePopup)
  addPlacePopup.addEventListener('submit', addCard)
});

addCloseIcon.addEventListener('click', function (){
  closePopup(addPlacePopup)
  addPlacePopup.removeEventListener('submit', addCard)
});

pictureCloseIcon.addEventListener('click', function (){
  closePopup(picturePopup)
});



