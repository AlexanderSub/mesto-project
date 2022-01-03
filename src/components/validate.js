export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

export const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.disabledButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(validationConfig.disabledButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig)
    });
  });
};

export const enableValidation = ({formSelector, ...rest}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector))
  getFormList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    setEventListeners(formElement, rest)
  })
}

// enableValidation(validationConfig)


