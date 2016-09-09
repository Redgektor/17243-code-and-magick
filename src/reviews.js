'use strict';
/**
 * блок переменных для получения данных с сервера
 */
var reviews = [];
var httpRequest = 'http://localhost:1506/api/reviews';

/**
 * блок переменных для фильтрации данных
 * и отрисовывания элементов в контейнер
 */

var reviewStorage = localStorage;
var activeFilter = reviewStorage.getItem('activeFilter') || document.querySelector('input[type=radio][name=reviews][checked]').value;
document.querySelector('input[type=radio][name=reviews][value=' + activeFilter + ']').checked = true;

var reviewsList = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsControls = document.querySelector('.reviews-controls');
var reviewsMore = reviewsControls.querySelector('.reviews-controls-more');
var reviewCount = 3;
var listIndex = 0;

var load = require('./load');
var Review = require('./review');

/**
 * Передает данные {ReviewData[]} с сервера в массив
 * @param {ReviewData[]} data
 */
function drawReviews(data) {
  reviews = data;
  if (reviews.length !== reviewCount) {
    reviewsMore.classList.add('invisible');
  }
  var fragment = document.createDocumentFragment();
  reviews.forEach(function(reviewData) {
    fragment.appendChild(new Review(reviewData).element);
  });
  reviewsList.appendChild(fragment);

  reviewsFilter.classList.remove('invisible');
}

/**
 * Создает список отзывов
 * в соответствии с переданным значением фильтра
 * @param {String} filterID
 */
function changeFilter(filterID) {
  reviewsList.innerHTML = '';
  activeFilter = filterID;
  listIndex = 0;
  reviewsMore.classList.remove('invisible');
  loadReviews();
}

/**
 * Получает с сервера данные {ReviewData[]},
 * ограничивая выборку переданными параметрами
 */
function loadReviews() {
  load(httpRequest, {
    from: listIndex,
    to: reviewCount + listIndex,
    filter: activeFilter
  }, drawReviews);
}

loadReviews();

reviewsMore.classList.remove('invisible');

reviewsFilter.classList.add('invisible');

reviewsMore.addEventListener('click', function() {
  listIndex += reviewCount;
  loadReviews();
});

reviewsFilter.addEventListener('change', function(evt) {
  if (evt.target.checked) {
    reviewStorage.setItem('activeFilter', evt.target.value);
    changeFilter(evt.target.value);
  }
}, true);

