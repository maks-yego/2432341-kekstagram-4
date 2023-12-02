const miniatureTemplate = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

const createMiniature = (picture) => {
  const miniature = miniatureTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').src = picture.url;
  miniature.querySelector('.picture__img').alt = picture.description;
  miniature.querySelector('.picture__likes').textContent = picture.likes;
  miniature.querySelector('.picture__comments').textContent = picture.comments.length;
  return miniature;
};

const renderMiniatures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(createMiniature(picture));
  });
  container.append(fragment);
};

export { renderMiniatures };
