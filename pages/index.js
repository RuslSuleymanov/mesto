let popup = document.querySelector('.popup');
let buttonProfileEdit = document.querySelector('.profile__edit-button');
let buttonProfileEditClose = document.querySelector('.popup__button-close');
let buttonProfileEditSave = document.querySelector('.popup__button-save');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileName = document.querySelector('.popup__name');
let profileProfession = document.querySelector('.popup__profession');
// let buttonLike = document.querySelectorAll('.elements__like-button');

function popupVisible() {
    popup.classList.remove('popup__hidden');
};

function popupHidden() {
    popup.classList.add('popup__hidden');
};

buttonProfileEdit.addEventListener('click', popupVisible); // открыть попап

buttonProfileEditClose.addEventListener('click', popupHidden); // закрыть попап нажатием на крест

popup.addEventListener('click', function (a) {
    if (a.target === a.currentTarget) {
        popup.classList.add('popup__hidden');
    }
}); // закрыть попап нажатием на страницу

function formSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileProfession.value;
};

buttonProfileEditSave.addEventListener('click', formSubmitProfile); // сохроняем изменения профиля

// buttonLike[i].addEventListener('click', function () {
//    i = ???
//    buttonLike[i].classList.add('elements__like-button_active');
// }); // кнопка лайка