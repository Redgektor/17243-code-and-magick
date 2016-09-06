'use strict';
/**
 * @callback loadedDataCallback
 */
/**
 * Загружает данные с сервера с помощью XMLHttpRequest
 * @param {String} url
 * @param {Object} params
 * @param {loadedDataCallback} cb
 */
module.exports = function(url, params, cb) {
  // создать объект XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // при загрузке вызвать callback,
  //  передав туда загруженные данные
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    cb(loadedData);
  };
  // сделать get-запрос по указанному url-адресу с дополнительными параметрами
  xhr.open('GET', url + '?from=' + params.from + '&to=' + params.to + '&filter=' + params.filter);

  // отправить запрос
  xhr.send();
};
