const miniatureTemplate = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

const createMiniature = (picture) => {
  const miniature = miniatureTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').scr = picture.url;
  miniature.querySelector('.picture__img').alt = picture.description;
  miniature.querySelector('.picture__likes').textContent = picture.likes;
  miniature.querySelector('.picture__comments').textContent = picture.comments;
  return miniature;
};

const renderMiniatures = (pictures) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pictures.length; i++) {
    fragment.append(createMiniature(pictures[i]));
  }
  container.append(fragment);
};

export { renderMiniatures };
