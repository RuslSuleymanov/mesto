export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const newItem = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        // вернём DOM-элемент карточки
        return newItem
    }

    generateCard() {
        // Запишем разметку в приватное поле
        this._element = this._getTemplate();
        const cardImg = this._element.querySelector('.card__img');

        this._setEventListeners();

        cardImg.src = this._link;
        cardImg.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like-button')
            .addEventListener('click', () => (this._handleLikeClick()));

        this._element.querySelector('.card__delete-button')
            .addEventListener('click', () => (this._handleBasketClick()));

        this._element.querySelector('.card__img')
            .addEventListener('click', () => (this._handlePopupClick()));
    }

    _handleLikeClick() {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_type_active');
    }

    _handleBasketClick() {
        this._element.remove();
    }

    _handlePopupClick() {
        const popupPlaces = document.querySelector('.popup_position_places');
        const popupPlacesImg = document.querySelector('.popup__image');

        popupPlacesImg.alt = this._name;
        popupPlacesImg.src = this._link;
        document.querySelector('.popup__subtitle').textContent = this._name;

        openPopup(popupPlaces);
    }
}