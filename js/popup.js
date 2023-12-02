// Задание 8.14. Не укладываюсь в дедлайн, отправляю одной домашкой, надеюсь, так можно.

const commentTemplate = document.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');

const closePicture = () => {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
};

const openPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

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

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closePicture();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePicture();
    }
  });
};

export { openPicture };
