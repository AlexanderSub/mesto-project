import './index.css'

import { createCard, cardsContainer } from '../components/card';
import { getInitialCards, getUserData } from '../components/api';
import { enableValidation, validationConfig } from '../components/validate'
import { userName, userJob, userAvatar, profileName, profileJob } from '../components/profile';

export let userId

// Добавление начальных карточек
getInitialCards()
  .then((result) => {
    for (const card of result) {
      cardsContainer.append(createCard(card))
    }

  })
  .catch((err) => {
    console.log(err)
  })

enableValidation(validationConfig)

getUserData()
  .then((userData) => {
    userId = userData._id
    userName.textContent = userData.name
    userJob.textContent = userData.about
    userAvatar.src = userData.avatar
    profileName.value = userData.name
    profileJob.value = userData.about
  })
  .catch((err) => {
    console.log(err)
  })
