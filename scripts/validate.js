export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    // Ф добавления ошибки
    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.classList.add(this._settings.errorClass);
        errorElement.textContent = errorMessage;
    };

    // Ф удаления ошибки
    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    };

    // Ф добавления или удаления ошибки
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        };
    };

    // Ф возврата false если один из инпутов с ошибкой
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // Ф добавления атрибута disable
    disableSubmit() {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    };

    // Ф отключения кнопки если один из инпутов с ошибкой
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmit();
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        };
    };

    // Ф вешаем слушатель отключения кнопки на инпуты
    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);

                this._toggleButtonState();
            });
        });
    };

    // Ф вешаем слушатель на формы
    enableValidation() {
        this._setEventListeners();
    };

}



