'use strict';

/**
 * Принимает на вход массив и возвращает из него выборку,
 * ограниченную переданными параметрами
 * @param {ReviewData[]} list
 * @param {Number} from
 * @param {Number} to
 * @return {ReviewData[]}
 */
module.exports = function(list, from, to) {
  return list.slice(from, to);
};
