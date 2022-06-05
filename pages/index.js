let popup = document.querySelector('.popup');
let buttonProfileEdit = document.querySelector('.profile__edit-button');
let buttonProfileEditClose = document.querySelector('.popup__button-close');
let buttonProfileEditSave = document.querySelector('.popup__button-save');
let profileForm = document.querySelector('.popup__form');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileName = document.querySelector('.popup__input_type_name');
let profileProfession = document.querySelector('.popup__input_type_profession');

function popupOpen() {
    profileName.value = profileTitle.textContent;
    profileProfession.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
};

function popupClose() {
    popup.classList.remove('popup_opened');
};

buttonProfileEdit.addEventListener('click', popupOpen); // Открыть попап

buttonProfileEditClose.addEventListener('click', popupClose); // Закрыть попап нажатием на крест

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileProfession.value;
    popupClose();
};

profileForm.addEventListener('submit', formSubmitHandler); // Сохраняем данные

// popup.addEventListener('click', function (a) {
//     if (a.target === a.currentTarget) {
//         popupClose();
//     }
// }); // Закрыть попап нажатием на страницу

// let buttonLike = document.querySelectorAll('.card__like-button');
// buttonLike[i].addEventListener('click', function () {
//    i = ???
//    buttonLike[i].classList.add('card__like-button_active');
// }); // Кнопка лайка