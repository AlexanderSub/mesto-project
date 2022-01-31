import { popups } from "./constants"

// Открытие и закрытие модальных окон
export const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  // document.addEventListener('keydown', closePopupByClickOnEscape)
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  // document.removeEventListener('keydown', closePopupByClickOnEscape)
}

// Закрытие модальных окон при нажатии на Escape
// const closePopupByClickOnEscape = (event) => {
//   if (event.code === 'Escape') {
//     const activePopupElement = document.querySelector('.popup_opened')

//     if (activePopupElement) {
//       closePopup(activePopupElement)
//     }
//   }
// }

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

