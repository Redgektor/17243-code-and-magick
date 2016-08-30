'use strict';

/**
 * Конструктор объекта Gallery. Создает контейнер с управляющими элементами,
 * отрисовывает в нем выбранное пользователем изображение,
 * добавляет обработчики событий
 * @param {String[]} picturesList: массив из url для изображений
 * @constructor
 */
function Gallery(picturesList) {

  // сохраняем контекст для ссылки на объект в обработчиках
  var self = this;

  var overlay = document.querySelector('.overlay-gallery');
  this.galleryContainer = overlay;
  this.pictureContainer = overlay.querySelector('.overlay-gallery-preview');

  this.closeGallery = overlay.querySelector('.overlay-gallery-close');
  this.toggleLeft = overlay.querySelector('.overlay-gallery-control-left');
  this.toggleRight = overlay.querySelector('.overlay-gallery-control-right');

  this.currentPicture = overlay.querySelector('.preview-number-current');
  this.picturesCount = overlay.querySelector('.preview-number-total');

  this.pictures = picturesList;
  this.picturesCount.textContent = this.pictures.length;

  /**
   * Добавляет обработчику onCloseClickHandler метод закрытия галереи,
   * указанный в прототипе: контекст берется из замыкания
   */
  this.onCloseClickHandler = function() {
    self.hide();
  };

  /**
   * Добавляет обработчику onToggleLeftClickHandler метод из прототипа,
   * отвечающий за показ предыдущего изображения: контекст берется из замыкания
   */
  this.onToggleLeftClickHandler = function() {
    self.prev();
  };

  /**
   * Добавляет обработчику onToggleRightClickHandler метод из прототипа,
   * отвечающий за показ следующего изображения: контекст берется из замыкания
   */
  this.onToggleRightClickHandler = function() {
    self.next();
  };
}

/**
 * Устанавливает изображение, предшествующее текущему,
 * пока верно условие
 */
Gallery.prototype.prev = function() {
  if (this.activePicture !== 0) {
    this.setActivePicture(this.activePicture - 1);
  }
};

/**
 * Устанавливает изображение, следующее за текущим,
 * пока верно условие
 */
Gallery.prototype.next = function() {
  if (this.activePicture !== this.pictures.length - 1) {
    this.setActivePicture(this.activePicture + 1);
  }
};

/**
 * Отрисовывает изображение
 * @param number
 */
Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;

  var pictureElement = new Image();
  pictureElement.src = this.pictures[this.activePicture];

  if (this.pictureElement) {
    this.pictureContainer.replaceChild(pictureElement, this.pictureElement);
  } else {
    this.pictureContainer.appendChild(pictureElement);
  }

  this.pictureElement = pictureElement;

  this.currentPicture.textContent = number + 1;
};

/**
 * Открывает галерею по клику на изображение,
 * добавляет обработчики событий управляющим элементам галереи
 * @param {Number} number: порядковый номер (индекс) изображения
 */
Gallery.prototype.show = function(number) {
  this.closeGallery.addEventListener('click', this.onCloseClickHandler);
  this.toggleLeft.addEventListener('click', this.onToggleLeftClickHandler);
  this.toggleRight.addEventListener('click', this.onToggleRightClickHandler);
  this.setActivePicture(number);
  this.galleryContainer.classList.remove('invisible');
};

/**
 * Прячет галерею, удаляет обработчики событий на управляющих элементах
 */
Gallery.prototype.hide = function() {
  this.galleryContainer.classList.add('invisible');
  this.closeGallery.removeEventListener('click', this.onCloseClickHandler);
  this.toggleLeft.removeEventListener('click', this.onToggleLeftClickHandler);
  this.toggleRight.removeEventListener('click', this.onToggleRightClickHandler);
};

module.exports = Gallery;
