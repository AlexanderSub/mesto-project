// Функционал открытия модальных окон и их закрытия при клике на крестик, оверлэй или нажатие на клавишу Escape

const popups = document.querySelectorAll('.popup')

// Открытие и закрытие модальных окон
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  popup.addEventListener('click', closePopupByClickOnOverlay)
  document.addEventListener('keydown', closePopupByClickOnEscape)
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  popup.removeEventListener('click', closePopupByClickOnOverlay)
  document.removeEventListener('keydown', closePopupByClickOnEscape)
}

// Закрытие модальных окон при нажатии на Escape
function closePopupByClickOnEscape(event) {
  if (event.code === 'Escape') {
    const activePopupElement = document.querySelector('.popup_opened')

    if (activePopupElement) {
      closePopup(activePopupElement)
    }
  }
}

// Закрытие модальных окон при клике на оверлэй
function closePopupByClickOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target)
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
