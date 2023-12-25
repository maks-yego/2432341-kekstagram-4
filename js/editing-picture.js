const PICTURE_SCALE_STEP = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const picture = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

const noneEffectButton = document.getElementById('effect-none');
const chromeEffectButton = document.getElementById('effect-chrome');
const sepiaEffectButton = document.getElementById('effect-sepia');
const marvinEffectButton = document.getElementById('effect-marvin');
const phobosEffectButton = document.getElementById('effect-phobos');
const heatEffectButton = document.getElementById('effect-heat');

const getPictureScale = () => {
  const scaleControlValue = document.querySelector('.scale__control--value');
  return parseInt(scaleControlValue.value.slice(0, -1), 10);
};

const setPictureScale = (scale) => {
  document.querySelector('.scale__control--value').value = `${scale}%`;
  picture.style.transform = `scale(${(scale / 100).toString()})`;
};

const changePictureScale = (scaleChange) => {
  let scale = getPictureScale() + scaleChange;
  if (scale < 25) {
    scale = 25;
  } else if (scale > 100) {
    scale = 100;
  }
  setPictureScale(scale);
};

const makePictureSmaller = () => {
  changePictureScale(-PICTURE_SCALE_STEP);
};

const makePictureBigger = () => {
  changePictureScale(PICTURE_SCALE_STEP);
};

scaleControlSmaller.addEventListener('click', makePictureSmaller);
scaleControlBigger.addEventListener('click', makePictureBigger);

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower'
});
effectLevel.classList.add('hidden');

const updateSliderOptions = (min, max, step, start) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step,
    start
  });
};

effectLevelSlider.noUiSlider.on('update', () => {
  valueElement.setAttribute('value', effectLevelSlider.noUiSlider.get());
  if (chromeEffectButton.checked) {
    picture.style.filter = `grayscale(${valueElement.value})`;
  } else if (sepiaEffectButton.checked) {
    picture.style.filter = `sepia(${valueElement.value})`;
  } else if (marvinEffectButton.checked) {
    picture.style.filter = `invert(${valueElement.value}%)`;
  } else if (phobosEffectButton.checked) {
    picture.style.filter = `blur(${valueElement.value}px)`;
  } else if (heatEffectButton.checked) {
    picture.style.filter = `brightness(${valueElement.value})`;
  }
});

noneEffectButton.addEventListener('change', () => {
  effectLevel.classList.add('hidden');
  picture.style.filter = 'none';
});

chromeEffectButton.addEventListener('change', () => {
  updateSliderOptions(0, 1, 0.1, 1);
  effectLevel.classList.remove('hidden');
  picture.style.filter = 'grayscale(1)';
});

sepiaEffectButton.addEventListener('change', () => {
  updateSliderOptions(0, 1, 0.1, 1);
  effectLevel.classList.remove('hidden');
  picture.style.filter = 'sepia(1)';
});

marvinEffectButton.addEventListener('change', () => {
  updateSliderOptions(0, 100, 1, 100);
  effectLevel.classList.remove('hidden');
  picture.style.filter = 'invert(100%)';
});

phobosEffectButton.addEventListener('change', () => {
  updateSliderOptions(0, 3, 0.1, 3);
  effectLevel.classList.remove('hidden');
  picture.style.filter = 'blur(3px)';
});

heatEffectButton.addEventListener('change', () => {
  updateSliderOptions(1, 3, 0.1, 3);
  effectLevel.classList.remove('hidden');
  picture.style.filter = 'brightness(3)';
});

export { setPictureScale, effectLevelSlider, picture };
