'use strict';

require('./check');
require('./reviews');
var form = require('./form');
var Game = require('./game');
var Gallery = require('./gallery');

var linksList = document.querySelectorAll('.photogallery a');
var picturesList = document.querySelectorAll('.photogallery a > img');

var picturesURL = Array.prototype.map.call(picturesList, function(elem) {
  return elem.getAttribute('src');
});

var gallery = new Gallery(picturesURL);

Array.prototype.forEach.call(linksList, function(elem, i) {
  elem.addEventListener('click', function() {
    gallery.show(i);
  });
});

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};
