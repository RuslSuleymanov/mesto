//ПР4
const popup = document.querySelector('.popup');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonProfileEditClose = document.querySelector('.popup__button-close');
const buttonProfileEditSave = document.querySelector('.popup__button-save');
const profileForm = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileName = document.querySelector('.popup__input_type_name');
const profileProfession = document.querySelector('.popup__input_type_profession');

profileName.value = profileTitle.textContent;
profileProfession.value = profileSubtitle.textContent;

function popupOpen(item) {
    item.classList.add('popup_opened');
};

function popupClose(item) {
    item.classList.remove('popup_opened');
};

// Открыте закрытие попап
buttonProfileEdit.addEventListener('click', () => { popupOpen(popup) });
buttonProfileEditClose.addEventListener('click', () => { popupClose(popup) });

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileProfession.value;
    popupClose(popup);
};

// Сохраняем данные из попап
profileForm.addEventListener('submit', formSubmitHandler);

// ПР5
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

const popupCards = document.querySelector('.popup__cards');
const buttonNewCardOpen = document.querySelector('.profile__add-button');
const buttonNewCardClose = document.querySelector('.popup__button-close-cards');
const template = document.querySelector('.template').content;
const elementsList = document.querySelector('.elements__list');
const popupPlaces = document.querySelector('.popup__places');
const popupPlacesImg = document.querySelector('.popup__image');
const popupPlacesSubtitle = document.querySelector('.popup__subtitle');
const buttonPlaceClose = document.querySelector('.popup__button-close-places');
const formInputPlacesLocation = document.querySelector('.popup__input_type_location');
const formInputPlacesUrl = document.querySelector('.popup__input_type_url');
const buttonSaveCard = document.querySelector('.popup__button-save-cards');

//открытие закрытие попап новой карточки
buttonNewCardOpen.addEventListener('click', () => { popupOpen(popupCards) });
buttonNewCardClose.addEventListener('click', () => { popupClose(popupCards) });

//длбавление, удаление, лайк, увеличение карточки
function newCards({ name, link }) {
    const newItem = template.querySelector('.card').cloneNode(true);

    newItem.querySelector('.card__title').textContent = name;
    newItem.querySelector('.card__img').alt = name;
    newItem.querySelector('.card__img').src = link;
    elementsList.prepend(newItem);

    newItem.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_type_active');
    });

    newItem.querySelector('.card__delete-button').addEventListener('click', function () {
        newItem.remove();
    });

    newItem.querySelector('.card__img').addEventListener('click', function () {
        popupPlacesImg.alt = name;
        popupPlacesImg.src = link;
        popupPlacesSubtitle.textContent = name;
        popupOpen(popupPlaces);
    });
}

//Закрытие попап картинки
buttonPlaceClose.addEventListener('click', () => { popupClose(popupPlaces) });

//Создаем новую карточку
function newCard(evt) {
    evt.preventDefault();

    const name = formInputPlacesLocation.value
    const link = formInputPlacesUrl.value

    newCards({ name, link });
    popupClose(popupCards);

    formInputPlacesLocation.value = '';
    formInputPlacesUrl.value = '';
}

buttonSaveCard.addEventListener('click', newCard);

//перебор массива карточек
initialCards.forEach(newCards);