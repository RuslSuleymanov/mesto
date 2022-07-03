

// Ф добавления ошибки
const showError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
};

// Ф удаления ошибки
const hideError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

// Ф добавления или удаления ошибки
const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideError(formElement, inputElement, settings);
    };
};

// Ф возврата false если один из инпутов с ошибкой
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Ф добавления атрибута disable
const disableSubmit = (buttonElement, settings) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
};

// Ф отключения кнопки если один из инпутов с ошибкой
const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        disableSubmit(buttonElement, settings);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(settings.inactiveButtonClass);
    };
};

// Ф вешаем слушатель отключения кнопки на инпуты
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);

            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

// Ф вешаем слушатель на формы
const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};

