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

        this._setEventListener();

        cardImg.src = this._link;
        cardImg.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._text;

        return this._element;
    }

    _setEventListener() {
        this._element.querySelector('.card__like-button')
            .addEventListener('click', () => _handleLikeClick());

        this._element.querySelector('.card__delete-button')
            .addEventListener('click', () => _handleBasketClick());

        this._element.querySelector('.card__img')
            .addEventListener('click', () => _handlePopupClick());
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

        popupPlacesImg.alt = item.name;
        popupPlacesImg.src = item.link;
        document.querySelector('.popup__subtitle').textContent = item.name;
        openPopup(popupPlaces);
    }
}

initialCards.forEach((item) => {
    const card = new Card(item, '.template');

    const cardElement = card.generateCard();

    document.querySelector('.elements__list').prepend(cardElement);
});