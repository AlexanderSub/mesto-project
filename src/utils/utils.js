import { popups } from "./constants"
import Section from "../components/Section";
import MyCard from "../components/MyCard";
import PopupWithImage from "../components/PopupWithImage";
import PopupDeleteCard from "../components/PopupDeleteCard";
import {api} from "../components/Api";
import OtherUserCard from "../components/OtherUserCard";
import {userId} from "../pages";

// Открытие и закрытие модальных окон
export const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByClickOnEscape)
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByClickOnEscape)
}

// Закрытие модальных окон при нажатии на Escape
const closePopupByClickOnEscape = (event) => {
  if (event.code === 'Escape') {
    const activePopupElement = document.querySelector('.popup_opened')

    if (activePopupElement) {
      closePopup(activePopupElement)
    }
  }
}

// Закрытие модальных окон при клике на крестик
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
    }
  })
})

export const createCards = (cards) => {
  const newCards = new Section({data: cards, renderer: (item) => {
      const newCard = (userId === item.owner._id) ? new MyCard(item, '.card__template', () => {
        const popup = new PopupWithImage('.popup_place-picture');
        popup._openPopup(newCard.link, newCard.name);
      }, () => {
        const deletePopup = new PopupDeleteCard(
          { popupType: '.popup_delete-card',
            handleFormSubmit: (evt) => {
              evt.preventDefault();
              api.deleteCard(item._id)
                .then(() => {
                  newCard.deleteCard()
                  deletePopup._closePopup();
                })
            }
          });
        deletePopup._openPopup();
      },  (id) => {
        return api.deleteLike(id)
      }, (id) => {
        return api.putLike(id)
      }) : new OtherUserCard(item, '.card__template', () => {
        const popup = new PopupWithImage('.popup_place-picture');
        popup._openPopup(newCard.link, newCard.name);
      }, (id) => {
        return api.deleteLike(id)
      }, (id) => {
        return api.putLike(id)
      });
      const card = newCard.generate();
      newCards.setCard(card);
    }
  }, '.cards');
  newCards.renderCards()
}
