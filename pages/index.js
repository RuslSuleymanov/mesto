let popup = document.querySelector('.popup');
let buttonProfileEdit = document.querySelector('.profile__edit-button');
let buttonProfileEditClose = document.querySelector('.popup__button-close');
let buttonProfileEditSave = document.querySelector('.popup__button-save');
let profileForm = document.querySelector('popup__form');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileName = document.querySelector('.popup__name');
let profileProfession = document.querySelector('.popup__profession');

function popupVisible() {
    profileName.value = profileTitle.textContent;
    profileProfession.value = profileSubtitle.textContent;
    popup.classList.remove('popup_open');
};

function popupHidden() {
    popup.classList.add('popup_open');
};

buttonProfileEdit.addEventListener('click', popupVisible); // открыть попап

buttonProfileEditClose.addEventListener('click', popupHidden); // закрыть попап нажатием на крест

// popup.addEventListener('click', function (a) {
//     if (a.target === a.currentTarget) {
//         popup.classList.add('popup_open');
//     }
// }); // закрыть попап нажатием на страницу

function formSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileProfession.value;
    popupHidden();
};

buttonProfileEditSave.addEventListener('click', formSubmitProfile); // сохроняем изменения профиля
profileForm.addEventListener('submit', formSubmitProfile); //отправка формы

// let buttonLike = document.querySelectorAll('.card__like-button');
// buttonLike[i].addEventListener('click', function () {
//    i = ???
//    buttonLike[i].classList.add('card__like-button_active');
// }); // кнопка лайка