import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithImage from "../components/PopupWithImage";
import PopupDeleteCard from "../components/PopupDeleteCard";
import {api} from "../components/Api";
import {userId} from "../pages";

// создание карточки и добавление на страницу
export const createCards = (cards) => {
  const newCards = new Section({
      data: cards,
      renderer: (item) => {
        const newCard = new Card(
          item,
          '.card__template',
          () => {
            const popup = new PopupWithImage('.popup_place-picture');
            popup._openPopup(newCard.link, newCard.name);
          },
          () => {
            const deletePopup = new PopupDeleteCard(
              {
                popupType: '.popup_delete-card',
                handleFormSubmit: (evt) => {
                  evt.preventDefault();
                  api.deleteCard(item._id)
                    .then(() => {
                      newCard.deleteCard()
                      deletePopup.close();
                    })
                }
              });
            deletePopup._openPopup();
          },
          (id) => {
            return api.deleteLike(id)
          },
          (id) => {
            return api.putLike(id)
          })

        const card = newCard.generate();
        if (!(userId === item.owner._id)) {
          newCard.removeDeleteBtn()
        }
        newCards.setCard(card);
      }
    },
    '.cards');
  newCards.renderCards()
}
