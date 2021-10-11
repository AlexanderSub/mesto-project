const profileEditPopup = document.querySelector('#profile-edit')
const editCloseIcon = profileEditPopup.querySelector('.popup__close-icon')
const editButton = document.querySelector('.profile__edit-button')
const submitEditButton = profileEditPopup.querySelector('.popup__save-button')

// Открытие и закрытие модального окна редактирования профиля
function editPopupOpen() {
  profileEditPopup.classList.add('popup_opened');
}

editButton.addEventListener('click', editPopupOpen)

function editPopupClose() {
  profileEditPopup.classList.remove('popup_opened');
}

editCloseIcon.addEventListener('click', editPopupClose)

// Редактирование профиля
function editUser(userNameValue, userJobValue) {

  document.querySelector('.profile__name').textContent = userNameValue;
  document.querySelector('.profile__description').textContent = userJobValue;

  editPopupClose()
}

submitEditButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  const userName = document.querySelector('.popup__input_name')
  const userJob = document.querySelector('.popup__input_job')

  editUser(userName.value, userJob.value)
})

//Добавление карточек

const cardTemplate = document.querySelector('#card__template')
const cardsContainer = document.querySelector('.cards')
const addButton = document.querySelector('.profile__add-button')

const placeAddPopup = document.querySelector('#place-add')
const placeNameInput = placeAddPopup.querySelector('input[name="place-name"]')
const placePictureInput = placeAddPopup.querySelector('input[name="place-picture"]')

const addCloseIcon = placeAddPopup.querySelector('.popup__close-icon')

const submitAddButton = placeAddPopup.querySelector('.popup__save-button')

// Открытие и закрытие модального окна добавления карточки

function addPopupOpen() {
  placeAddPopup.classList.add('popup_opened');
}

addButton.addEventListener('click', addPopupOpen)

function addPopupClose() {
  placeAddPopup.classList.remove('popup_opened');
}

addCloseIcon.addEventListener('click', addPopupClose)

//Добавление карточки

function addCard(newCard) {

  const cardClone = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image')

  cardImage.setAttribute('src', newCard.link)
  cardImage.setAttribute('alt', newCard.alt)

  cardImage.addEventListener('click', clickOnImage)

  cardClone.querySelector('.card__title').textContent = newCard.name;

  cardClone.querySelector('.card__delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove()})

  cardClone.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active')

  });

  return cardClone
}

for (const card of initialCards) {
	cardsContainer.append(addCard(card));
}

// Функция отправки карточки

submitAddButton.addEventListener('click', function(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value
  const placeLink = placePictureInput.value
  const data = {
    name: placeName,
    link: placeLink,
    alt: placeName
  }

  cardsContainer.prepend(addCard(data))

  addPopupClose()

  placeNameInput.value = ''
  placePictureInput.value = ''
})



// Открытие и закрытие просмотра фотографии
const picturePopup = document.querySelector('#place-picture')
const popupImage = picturePopup.querySelector('.popup__image')
const popupImageDescription = picturePopup.querySelector('.popup__image-description')

const pictureCloseIcon = picturePopup.querySelector('.popup__close-icon')

function picturePopupOpen() {
  picturePopup.classList.add('popup_opened');
}

function picturePopupClose() {
  picturePopup.classList.remove('popup_opened');
}

pictureCloseIcon.addEventListener('click', picturePopupClose)


function clickOnImage (evt) {
  const link = evt.target.getAttribute('src');
  const text = evt.target.getAttribute('alt');
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', text);
  popupImageDescription.textContent = text;
  picturePopupOpen();
}
