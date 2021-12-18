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

function closePopupByClickOnEscape(event) {
  if (event.code === 'Escape') {
    const activePopupElement = document.querySelector('.popup_opened')

    if (activePopupElement) {
      closePopup(activePopupElement)
    }
  }
}

function closePopupByClickOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target)
  }
}
