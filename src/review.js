'use strict';

/**
 * блок переменных для шаблонизации
 */
var templateElement = document.getElementById('review-template');

var reviewToClone = (('content' in templateElement) ?
  templateElement.content :
  templateElement)
  .querySelector('.review');

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
module.exports = function(data) {
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
