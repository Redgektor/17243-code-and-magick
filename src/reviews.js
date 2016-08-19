'use strict';

// инициализируем глобальную переменную reviews пустым массивом
window.reviews = [];

// инициализируем глобальную переменную CallbackRegistry пустым объектом,
// представляющим собой реестр функций
window.CallbackRegistry = {};
var httpRequest = 'http://localhost:1506/api/reviews';


function saveReviews(data) {
  window.reviews = data;
}

/**
 * Функция, получающая данные с сервера по JSONP
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
   * Функция, представляющая собой результат вызова JSONP-скрипта, с данными в качестве параметра
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

// 2-м параметром мы передаем функцию foo, которую вызовет getData, когда придут данные
getData(httpRequest, saveReviews);
