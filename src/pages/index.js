import './index.css'

import { api } from '../components/Api';
import { enableValidation } from '../components/FormValidator'
import { userName, userAbout, userAvatar, userNameInput, userAboutInput } from '../utils/constants';
import { renderServerCards } from '../components/Card';
import { validationConfig } from '../utils/constants';

export let userId

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
