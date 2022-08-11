import { Card } from "./card.js";
import { FormValidator } from "./validate.js";

const popupAuthor = document.querySelector('.popup_position_author');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileName = document.querySelector('.popup__input_type_name');
const profileProfession = document.querySelector('.popup__input_type_profession');
const formAuthor = document.querySelector('.popup__form_position_author');
const popupCards = document.querySelector('.popup_position_cards');
const profileFormCard = document.querySelector('.popup__form_position_cards');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

// Ф очистки ошибки
const resetError = () => {
    document.querySelectorAll('.popup__input-error').forEach((item) => {
        item.textContent = '';
    });

    document.querySelectorAll('.popup__input').forEach((item) => {
        item.classList.remove(validSettings.inputErrorClass);
    });
}

// Ф открытия попап
const openPopup = (item) => {
    resetError();
    item.classList.add('popup_opened');

    // Вешаем слушатели закрытия
    document.addEventListener('keydown', closePopupEsc);
    item.addEventListener('mousedown', closePopupOverlay);
};

// Ф закрытия попап
const closePopup = (item) => {
    item.classList.remove('popup_opened');

    // Удаляем слушатели закрытия
    document.removeEventListener('keydown', closePopupEsc);
    item.removeEventListener('mousedown', closePopupOverlay);
};

// Вешаем слушатель открытие попап
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    profileName.value = profileTitle.textContent;
    profileProfession.value = profileSubtitle.textContent;
    openPopup(popupAuthor);
});

// Ф Записи данных профиля
const handleAuthorFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileProfession.value;
    closePopup(popupAuthor);
};

// Вешаем слушатель сохранения данных из попап
formAuthor.addEventListener('submit', handleAuthorFormSubmit);

// Вешаем слушатель открытия добавления попап новой карточки
document.querySelector('.profile__add-button').addEventListener('click', () => {
    profileFormCard.reset();
    validCard.disableSubmit();
    openPopup(popupCards);
});

// Ф закрытия попап по Esc
const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};

// Ф закрытия попап по оверлею 
const closePopupOverlay = (evt) => {
    const popup = document.querySelector('.popup_opened');

    if (evt.target === evt.currentTarget) {
        closePopup(popup);
    };

    // Закрытие по крестику
    if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
    };
};


// Ф создания новой карточки
const newCard = (evt) => {
    evt.preventDefault();

    const name = document.querySelector('.popup__input_type_location').value;
    const link = document.querySelector('.popup__input_type_url').value;

    const card = new Card({ name, link }, '.template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__list').prepend(cardElement);

    closePopup(popupCards);
    profileFormCard.reset();
};

// Вешаем слушатель добавления карточки
profileFormCard.addEventListener('submit', newCard);

const handlePopupClick = (name, link) => {
    const popupPlaces = document.querySelector('.popup_position_places');
    const popupPlacesImg = document.querySelector('.popup__image');

    popupPlacesImg.alt = name;
    popupPlacesImg.src = link;
    document.querySelector('.popup__subtitle').textContent = name;

    openPopup(popupPlaces);
}

// Перебор массива начальных карточек
initialCards.forEach((item) => {
    const card = new Card(item, '.template', handlePopupClick);

    const cardElement = card.generateCard();

    document.querySelector('.elements__list').prepend(cardElement);
});

const validAuthor = new FormValidator(validSettings, formAuthor);
validAuthor.enableValidation();

const validCard = new FormValidator(validSettings, profileFormCard);
validCard.enableValidation();
