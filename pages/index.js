//ПР4
const popupAuthor = document.querySelector('.popup_position_author');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonProfileEditSave = document.querySelector('.popup__button-save_position_author');
const profileFormAuthor = document.querySelector('.popup__form_position_author');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileName = document.querySelector('.popup__input_type_name');
const profileProfession = document.querySelector('.popup__input_type_profession');
const popups = document.querySelectorAll('.popup')

function openPopup(item) {
    item.classList.add('popup_opened');
};

function closePopup(item) {
    item.classList.remove('popup_opened');
};

// Открыте попап
buttonProfileEdit.addEventListener('click', function () {
    profileName.value = profileTitle.textContent;
    profileProfession.value = profileSubtitle.textContent;
    openPopup(popupAuthor);
});

function handleAuthorFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileProfession.value;
    closePopup(popupAuthor);
};

// Сохраняем данные из попап
profileFormAuthor.addEventListener('submit', handleAuthorFormSubmit);

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

//Открытие попап новой карточки
buttonNewCardOpen.addEventListener('click', () => openPopup(popupCards));

//Возвращаем элемент с лайком, удалением, попапом
function createCard(item) {
    const newItem = template.querySelector('.card').cloneNode(true);

    newItem.querySelector('.card__title').textContent = item.name;
    newItem.querySelector('.card__img').alt = item.name;
    newItem.querySelector('.card__img').src = item.link;

    newItem.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_type_active');
    });

    newItem.querySelector('.card__delete-button').addEventListener('click', function () {
        newItem.remove();
    });

    newItem.querySelector('.card__img').addEventListener('click', function () {
        popupPlacesImg.alt = item.name;
        popupPlacesImg.src = item.link;
        popupPlacesSubtitle.textContent = item.name;
        openPopup(popupPlaces);
    });

    return newItem;
};

//Вставляем елемент в DOM
function addCard(item) {
    elementsList.prepend(item);
};

//Создаем карточки из массива элементов
initialCards.forEach((item) => {
    addCard(createCard(item));
});

//Создаем новый элемент
function newCard(evt) {
    evt.preventDefault();

    const name = formInputPlacesLocation.value;
    const link = formInputPlacesUrl.value;

    addCard(createCard({ name, link }));

    closePopup(popupCards);
    profileFormCard.reset();
};

profileFormCard.addEventListener('submit', newCard);

//Закрытие попапов
popups.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__button-close')) {
            closePopup(item)
        };
    });
});