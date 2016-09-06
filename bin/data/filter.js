'use strict';

/**
 * Принимает на вход массив и возвращает из него выборку
 * в зависимости от переданного в качестве 2-го параметра значения
 * @param {ReviewData[]} list
 * @param {String} filterID
 * @return {ReviewData[]}
 */
module.exports = function(list, filterID) {

  switch (filterID) {

    case 'reviews-all':
      return list;
      break;

    case 'reviews-recent':
      return list.filter(function(elem) {
        var now = Date.now();
        var DAY_IN_MS = 3600 * 24 * 1000;
        return now - elem.created <= DAY_IN_MS * 3;
      }).sort(function(a, b) {
        return b.created - a.created;
      });
      break;

    case 'reviews-good':
      return list.filter(function(elem) {
        return elem.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-bad':
      return list.filter(function(elem) {
        return elem.rating < 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
    default:
      return list;
      break;
  }
};
