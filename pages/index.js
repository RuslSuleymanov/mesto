const popup = document.querySelector('.popup');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonProfileEditClose = document.querySelector('.popup__button-close');
const buttonProfileEditSave = document.querySelector('.popup__button-save');
const profileForm = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileName = document.querySelector('.popup__input_type_name');
const profileProfession = document.querySelector('.popup__input_type_profession');

function popupOpen() {
    profileName.value = profileTitle.textContent;
    profileProfession.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
};

function popupClose() {
    popup.classList.remove('popup_opened');
};

// Открыть попап
buttonProfileEdit.addEventListener('click', popupOpen);

// Закрыть попап
buttonProfileEditClose.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileProfession.value;
    popupClose();
};

// Сохраняем данные
profileForm.addEventListener('submit', formSubmitHandler);

const popupCards = document.querySelector('.popup__cards');
const buttonNewCard = document.querySelector('.profile__add-button')
const buttonNewCardClose = document.querySelector('.popup__button-close-cards')
const placeLocation = document.querySelector('.popup__input_type_location')
const placeUrl = document.querySelector('.popup__input_type_url')
const placeForm = document.querySelector('.popup__form-place');

function popupOpenCards() {
    popupCards.classList.add('popup_opened');
};

buttonNewCard.addEventListener('click', popupOpenCards);

function popupCloseCards() {
    popupCards.classList.remove('popup_opened');
};

buttonNewCardClose.addEventListener('click', popupCloseCards);

function formSubmitHandlerPlace(evt) {
    evt.preventDefault();
    const list = document.querySelector('.elements__list')
    const newElement = template.cloneNode(true);
    newElement.querySelector('.card__title').innerText = placeLocation.value
    newElement.querySelector('.card__img').src = placeUrl.value
    list.prepend(newElement);
    popupCloseCards();
};

placeForm.addEventListener('submit', formSubmitHandlerPlace);


const template = document.querySelector('.template').content;
const elementsList = document.querySelector('.elements__list');
const templateImg = document.querySelector('.card__img');
const templateTitle = document.querySelector('.card__title');
const templatePlaces = document.querySelector('.popup__places').content;

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

function newCards({ name, link }) {
    const newElement = template.cloneNode(true);
    newElement.querySelector('.card__title').textContent = name;
    newElement.querySelector('.card__img').src = link;
    elementsList.prepend(newElement);

    newElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_type_active');
    });
}

initialCards.forEach(newCards);

// const buttonLike = document.querySelector('.card__like-button');

// buttonLike.addEventListener('click', function () {
//     buttonLike.classList.toggle('card__like-button_type_active');
// });

const deleteButton = document.querySelector('.card__delete-button')

function deleteCard() {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
};
deleteButton.addEventListener('click', deleteCard);

const popupPlaces = document.querySelector('.popup__places');
const cardImg = document.querySelector('.card__img');
const popupSubtitle = document.querySelector('popup__subtitle');
const popupImg = document.querySelector('.popup__image')
const cardTitle = document.querySelector('card__title');

function placeOpen() {
    popupPlaces.classList.add('popup_opened');
    popupImg.src = cardImg.setAttribute('background-image');
    popupSubtitle = cardTitle.textContent;

}

cardImg.addEventListener('click', placeOpen);