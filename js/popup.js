const COMMENTS_COUNT_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('.social__comment');

const shownCommentsCount = () => Number(bigPicture.querySelector('.shown-comments-count').textContent);
const commentsCount = () => Number(bigPicture.querySelector('.comments-count').textContent);

const increaseCommentsCount = () => {
  bigPicture.querySelector('.shown-comments-count').textContent = Math.min(shownCommentsCount() + COMMENTS_COUNT_STEP, commentsCount());
};

let comments = bigPicture.querySelectorAll('.social__comment');

const loadComments = (lastShownCommentsCount = 0) => {
  for (let i = lastShownCommentsCount; i < shownCommentsCount(); i++) {
    comments[i].classList.remove('hidden');
  }
  if (shownCommentsCount() === commentsCount()) {
    commentsLoader.classList.add('hidden');
  }
  lastShownCommentsCount = shownCommentsCount();
};

const makePictureComments = (picture) => {
  const container = document.querySelector('.social__comments');
  const fragment = document.createDocumentFragment();
  picture.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    fragment.append(newComment);
  });
  container.replaceChildren();
  container.append(fragment);
  comments = bigPicture.querySelectorAll('.social__comment');
};

const commentsLoaderFunction = () => {
  increaseCommentsCount();
  loadComments();
};
const boundСommentsLoaderFunction = commentsLoaderFunction.bind(comments);

const closePicture = () => {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  bigPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  bigPicture.querySelector('.shown-comments-count').textContent = 0;
  bigPicture.querySelector('.comments-count').textContent = 0;
  commentsLoader.removeEventListener('click', boundСommentsLoaderFunction);
};

const openPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.shown-comments-count').textContent = Math.min(COMMENTS_COUNT_STEP, picture.comments.length);

  makePictureComments(picture);
  loadComments();

  document.body.classList.add('modal-open');
};

document.querySelector('.big-picture__cancel').addEventListener('click', closePicture);
commentsLoader.addEventListener('click', boundСommentsLoaderFunction);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePicture();
  }
});

export { openPicture };
