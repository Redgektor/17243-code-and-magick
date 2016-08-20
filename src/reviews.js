'use strict';
/**
 * блок переменных для получения данных с помощью JSONP-запроса
 */
// инициализируем глобальную переменную reviews пустым массивом
var reviews = [];

// инициализируем глобальную переменную CallbackRegistry пустым объектом,
// представляющим собой реестр функций
window.CallbackRegistry = {};
var httpRequest = 'http://localhost:1506/api/reviews';

/**
 * блок переменных для работы с данными и шаблонизации
 */
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var templateElement = document.getElementById('review-template');

var reviewToClone = (('content' in templateElement) ?
  templateElement.content :
  templateElement)
  .querySelector('.review');

/**
 * Передает данные {Review} с сервера в массив
 * @param {Review} data
 */
function saveReviews(data) {
  reviews = data;
  drawReviewsList();
}

/**
 * Добавляет элементы {Review} в контейнер
 */
function drawReviewsList() {
  var fragment = document.createDocumentFragment();

  reviews.forEach(function(review) {
    fragment.appendChild(getReviewElement(review));
  });

  reviewsList.appendChild(fragment);

  reviewsFilter.classList.remove('invisible');
}

/**
 * Получает данные с сервера по JSONP
 * по указанному http-запросу
 * @param {String} url: адрес, по которому надо получить данные
 * @param {Function} cb: callback-функция, в которая получит данные после загрузки
 */
function getData(url, cb) {

  var elem = document.createElement('script');

  // генерируем имя JSONP-функции для запроса: Math.random() возвращает случайное число,
  // число приводится к строке, последние 6 символов которой записываются в переменную в качестве имени функции
  var callbackName = 'cb' + String(Math.random()).slice(-6);

  /**
   * Результат вызова JSONP-скрипта, с данными в качестве параметра
   * @param {Object[]} data: {*}
   */
  window.CallbackRegistry[callbackName] = function(data) {
    // cb — функция, в которую надо передать данные
    // data – данные, которые нужно передать в функцию
    cb(data);

    // данные переданы в cb-функцию, внешняя функция больше не нужна, удаляем
    delete window.CallbackRegistry[callbackName];

    //данные переданы в cb-функцию, значит, скрипт в DOM-дереве свою задачу выполнил, удаляем его
    document.body.removeChild(elem);
  };
  elem.src = url + '?callback=CallbackRegistry.' + callbackName;
  document.body.appendChild(elem);
}

/**
 * @typedef {Object} Review
 * Отзыв
 * @property {Object} author
 * @property {String} author.name
 * @property {String} author.picture
 * @property {Number} review_usefulness
 * @property {Number} rating
 * @property {String} description
 */

/**
 * Создает элемент на основе шаблона,
 * описанного в теге template с данными, пришедшими с сервера
 * @param {Review} data
 * @return {HTMLElement}
 */
var getReviewElement = function(data) {
  var review = reviewToClone.cloneNode(true);

  var rating = review.querySelector('.review-rating');
  var ratingMarks = ['', '-two', '-three', '-four', '-five'];
  rating.classList.add('review-rating' + ratingMarks[data.rating - 1]);

  var img = review.querySelector('.review-author');
  var imgWidth = 124;
  var imgHeight = 124;

  var backgroundLoadTimeout;
  var IMAGE_LOAD_TIMEOUT = 10000;

  var backgroundImg = new Image();
  img.alt = img.title = data.author.name;

  backgroundImg.onload = function() {
    clearTimeout(backgroundLoadTimeout);
    img.src = data.author.picture;
    img.width = imgWidth;
    img.height = imgHeight;
  };

  backgroundImg.onerror = function() {
    clearTimeout(backgroundLoadTimeout);
    review.classList.add('review-load-failure');
  };

  backgroundImg.src = data.author.picture;

  backgroundLoadTimeout = setTimeout(function() {
    backgroundImg.src = '';
    review.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  review.querySelector('.review-text').textContent = data.description;

  return review;
};

reviewsFilter.classList.add('invisible');

// 2-м параметром мы передаем функцию saveReviews, которую вызовет getData, когда придут данные
getData(httpRequest, saveReviews);

