//ПР4
const popupAuthor = document.querySelector('.popup_position_author');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileFormAuthor = document.querySelector('.popup__form_position_author');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileName = document.querySelector('.popup__input_type_name');
const profileProfession = document.querySelector('.popup__input_type_profession');

const inputList = document.querySelectorAll('.popup__input');
const errorList = document.querySelectorAll('.popup__input-error');
// Ф очистки ошибки
const resetError = () => {
    errorList.forEach((item) => {
        item.textContent = '';
    });

    inputList.forEach((item) => {
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
buttonProfileEdit.addEventListener('click', () => {
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
profileFormAuthor.addEventListener('submit', handleAuthorFormSubmit);

// ПР5
// Массив начальных карточек
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

const template = document.querySelector('.template').content;
const popupCards = document.querySelector('.popup_position_cards');
const buttonNewCardOpen = document.querySelector('.profile__add-button');
const elementsList = document.querySelector('.elements__list');
const popupPlaces = document.querySelector('.popup_position_places');
const popupPlacesImg = document.querySelector('.popup__image');
const popupPlacesSubtitle = document.querySelector('.popup__subtitle');
const formInputPlacesLocation = document.querySelector('.popup__input_type_location');
const formInputPlacesUrl = document.querySelector('.popup__input_type_url');
const profileFormCard = document.querySelector('.popup__form_position_cards');

// Вешаем слушатель открытия попап новой карточки
buttonNewCardOpen.addEventListener('click', () => {
    profileFormCard.reset();
    disableSubmit(profileFormCard.place, validSettings);
    openPopup(popupCards);
});

// Ф возвращения элемента с лайком, корзиной, попапом
const createCard = (item) => {
    const newItem = template.querySelector('.card').cloneNode(true);
    const cardImg = newItem.querySelector('.card__img');

    newItem.querySelector('.card__title').textContent = item.name;
    cardImg.alt = item.name;
    cardImg.src = item.link;

    // Вешаем слушатель лайка
    newItem.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_type_active');
    });

    // Вешаем слушатель корзины
    newItem.querySelector('.card__delete-button').addEventListener('click', function () {
        newItem.remove();
    });

    // Вешаем слушатель попап увеличения картинки
    cardImg.addEventListener('click', function () {
        popupPlacesImg.alt = item.name;
        popupPlacesImg.src = item.link;
        popupPlacesSubtitle.textContent = item.name;
        openPopup(popupPlaces);
    });

    return newItem;
};

// Ф добавления елемента в DOM
const addCard = (item) => {
    elementsList.prepend(item);
};

// Перебор массива начальных карточек
initialCards.forEach((item) => {
    addCard(createCard(item));
});

// Ф создания новой карточки
const newCard = (evt) => {
    evt.preventDefault();

    const name = formInputPlacesLocation.value;
    const link = formInputPlacesUrl.value;

    addCard(createCard({ name, link }));

    closePopup(popupCards);
    profileFormCard.reset();
};

// Вешаем слушатель добавления карточки
profileFormCard.addEventListener('submit', newCard);

//ПР6
// Объект настроек
const validSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(validSettings);

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