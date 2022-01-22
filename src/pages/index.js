import './index.css'

import { getInitialCards, getUserData } from '../components/Api';
import { enableValidation } from '../components/FormValidator'
import { userName, userAbout, userAvatar, userNameInput, userAboutInput } from '../components/constants';
import { renderServerCards } from '../components/Card';
import { validationConfig } from '../components/constants';

export let userId

  Promise.all([getUserData(), getInitialCards()])
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
