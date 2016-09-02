'use strict';
/**
 * @callback loadImageCallback
 * @param {Boolean} isOk: true, если изображение загрузилось,
 * false, если загрузка изображения не удалась
 */
/**
 * Загружает изображение
 * @param {String} url
 * @param {loadImageCallback} cb
 */
module.exports = function(url, cb) {
  var backgroundLoadTimeout;
  var IMAGE_LOAD_TIMEOUT = 10000;

  var backgroundImg = new Image();

  backgroundImg.onload = function() {
    clearTimeout(backgroundLoadTimeout);
    cb(true);
  };

  backgroundImg.onerror = function() {
    clearTimeout(backgroundLoadTimeout);
    cb(false);
  };

  backgroundImg.src = url;

  backgroundLoadTimeout = setTimeout(function() {
    backgroundImg.src = '';
    cb(false);
  }, IMAGE_LOAD_TIMEOUT);

};
