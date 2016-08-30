'use strict';
/**
 * блок переменных для получения данных с помощью JSONP-запроса
 */
var reviews = [];
var httpRequest = 'http://localhost:1506/api/reviews';

/**
 * блок переменных для фильтрации данных
 * и отрисовывания элементов в контейнер
 */
var reviewsList = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');

var load = require('./load');
var Review = require('./review');
/**
 * Передает данные {ReviewData[]} с сервера в массив
 * @param {ReviewData[]} data
 */
function saveReviews(data) {
  reviews = data;

  var fragment = document.createDocumentFragment();
  reviews.forEach(function(reviewData) {
    fragment.appendChild(new Review(reviewData).element);
  });

  reviewsList.appendChild(fragment);

  reviewsFilter.classList.remove('invisible');
}

reviewsFilter.classList.add('invisible');

// 2-м параметром мы передаем функцию saveReviews, которую вызовет load, когда придут данные
load(httpRequest, saveReviews);
