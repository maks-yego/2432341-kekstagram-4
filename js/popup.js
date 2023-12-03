const commentTemplate = document.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');

const closePicture = () => {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  bigPicture.querySelector('.social__comments-loader').classList.remove('hidden');
};

const openPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  const shownCommentsCount = () => Number(bigPicture.querySelector('.shown-comments-count').textContent);
  const commentsCount = () => Number(bigPicture.querySelector('.comments-count').textContent);

  const commentsCountStep = 5;

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

  bigPicture.querySelector('.shown-comments-count').textContent = Math.min(commentsCountStep, commentsCount());
  if (shownCommentsCount() === commentsCount()) {
    commentsLoader.classList.add('hidden');
  }
  const comments = bigPicture.querySelectorAll('.social__comment');
  for (let i = 0; i < shownCommentsCount(); i++) {
    comments[i].classList.remove('hidden');
  }

  document.body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closePicture();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePicture();
    }
  });

  commentsLoader.addEventListener('click', () => {
    bigPicture.querySelector('.shown-comments-count').textContent = Math.min(shownCommentsCount() + commentsCountStep, commentsCount());
    if (shownCommentsCount() === commentsCount()) {
      commentsLoader.classList.add('hidden');
    }
    for (let i = 0; i < shownCommentsCount(); i++) {
      comments[i].classList.remove('hidden');
    }
  });
};

export { openPicture };
