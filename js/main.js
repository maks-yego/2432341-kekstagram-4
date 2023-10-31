const OBJECT_COUNT = 25;
const MIN_COMMENTS_COUNT = 30;
const MAX_COMMENTS_COUNT = 30;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
let lastCommentId = 0;

const messageBase = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Артем',
  'Борис',
  'Виктория',
  'Галина',
  'Денис',
  'Егор',
  'Жанна',
  'Зинаида Васильевна Шмель'
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const createComment = (commentId) => {
  return {
    id: commentId,
    avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
    message: messageBase[getRandomInt(0, messageBase.length)],
    name: names[getRandomInt(0, names.length)],
  };
};

const createComments = () => {
  const comments = [];
  const count = getRandomInt(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  for (let i = 1; i <= count; i++) {
    lastCommentId += 1;
    comments[i - 1] = createComment(lastCommentId);
  }
  return comments;
};

const createObject = (id) => {
  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: 'Это фотография, не иначе!',
    likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: createComments(),
  };
};

const createObjects = () => {
  const objects = [];
  for (let i = 1; i <= OBJECT_COUNT; i++) {
    objects[i - 1] = createObject(i);
  }
  return objects;
};

console.log(createObjects());
