import { setPictureScale, picture } from './editing-picture.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const uploadSubmit = document.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector('#success').content;
const effectLevel = document.querySelector('.img-upload__effect-level');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error'
});

const textHashtagsFunction = () => {
  uploadSubmit.disabled = !pristine.validate();
};
textHashtags.addEventListener('change', textHashtagsFunction);

const openForm = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
};

const closeForm = () => {
  uploadForm.reset();
  pristine.reset();
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  textHashtags.removeEventListener('change', textHashtagsFunction);
  setPictureScale(100);
  picture.style.filter = 'none';
  effectLevel.classList.add('hidden');
};

const formEscFunction = (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== textHashtags && document.activeElement !== textDescription) {
    closeForm();
  }
};

const closeSuccessMessage = () => {
  document.querySelector('.success').remove();
};

const successEscFunction = (evt) => {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
};

const openSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  successMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', successEscFunction);
  const fragment = document.createDocumentFragment();
  fragment.append(successMessage);
  body.append(fragment);
};

const uploadSubmitFunction = (evt) => {
  evt.preventDefault();
  document.removeEventListener('keydown', closeSuccessMessage);
  openSuccessMessage();
  closeForm();
};

const normalizeHashtags = () => textHashtags.value.trim().split(' ');
const validateHashtagsChars = () => normalizeHashtags().every((hashtag) => HASHTAG_REGEXP.test(hashtag) || hashtag === '');
const validateHashtagsCount = () => normalizeHashtags().length <= MAX_HASHTAGS_COUNT;
const validateHashtagsRepeate = () => {
  const lowerCaseHashtags = normalizeHashtags().map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = Array.from(new Set(lowerCaseHashtags));
  return uniqueHashtags.length === lowerCaseHashtags.length;
};
const validateDescriptionLength = () => textDescription.value.length <= 140;

pristine.addValidator(textHashtags, validateHashtagsChars, 'Неверный формат хэштегов!', 3, false);
pristine.addValidator(textHashtags, validateHashtagsRepeate, 'Хэштеги не уникальны!', 2, false);
pristine.addValidator(textHashtags, validateHashtagsCount, `Не более ${MAX_HASHTAGS_COUNT} хэштегов!`, 1, false);
pristine.addValidator(textDescription, validateDescriptionLength, `Не более ${MAX_DESCRIPTION_LENGTH} символов!`, 1, false);

uploadInput.addEventListener('change', openForm);
uploadCancel.addEventListener('click', closeForm);
document.addEventListener('keydown', formEscFunction);
uploadForm.onsubmit = uploadSubmitFunction;
