'use strict';

window.card = (function () {
  /**
   * @const {Object<string, string>}
   */
  var LODGE_TYPE_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var callback = null;

  /**
   * @type {DocumentFragment}
   */
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  /**
   * @param {string} featureItem
   * @return {Element}
   */
  var generateFeature = function (featureItem) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + featureItem;
    return span;
  };

  /**
   * @param {string} photoURL
   * @return {Element}
   */
  var generatePhotos = function (photoURL) {
    var PHOTO_WIDTH = 52;
    var PHOTO_HEIGHT = 42;

    var img = document.createElement('img');
    img.src = photoURL;
    img.width = PHOTO_WIDTH;
    img.height = PHOTO_HEIGHT;

    return img;
  };

  /**
   * @param {Object} advertsItem
   * @return {Element}
   */
  var generateLodgeElement = function (advertsItem) {
    var lodgeElement = lodgeTemplate.cloneNode(true);

    lodgeElement.querySelector('.lodge__title').textContent = advertsItem.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = advertsItem.offer.address;
    lodgeElement.querySelector('.lodge__price').innerHTML = advertsItem.offer.price + ' ' + '&#x20bd;/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = LODGE_TYPE_MAP[advertsItem.offer.type];
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advertsItem.offer.guests + ' гостей в ' + advertsItem.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после' + advertsItem.offer.checkin + ', выезд до ' + advertsItem.offer.checkout;

    var features = advertsItem.offer.features;
    var photos = advertsItem.offer.photos;

    for (var i = 0; i < features.length; i++) {
      lodgeElement.querySelector('.lodge__features').appendChild(generateFeature(features[i]));
    }

    lodgeElement.querySelector('.lodge__description').textContent = advertsItem.offer.description;

    for (var j = 0; j < photos.length; j++) {
      lodgeElement.querySelector('.lodge__photos').appendChild(generatePhotos(photos[j]));
    }

    return lodgeElement;
  };

  var dialog = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');

  var closeDialog = function () {
    window.utils.toggleHidden(dialog, true);
    document.removeEventListener('keydown', onEscPress);

    if (typeof callback === 'function') {
      callback();
    }
  };

  /**
   * The handler that closes the dialog panel when the escape key is pressed
   * @param {KeyboardEvent} evt
   */
  var onEscPress = function (evt) {
    if (window.utils.isEscapePressed(evt)) {
      closeDialog();
    }
  };

  /**
   * Adds a dialog item to the page
   * @param {Object} advert
   */
  var renderDialog = function (advert) {
    var dialogPanel = document.querySelector('.dialog__panel');
    dialog.replaceChild(generateLodgeElement(advert), dialogPanel);
    document.querySelector('.dialog__title img').src = advert.author.avatar;
  };

  return {
    /**
     * @param  {Object} advert
     * @param  {Function} cb
     */
    show: function (advert, cb) {
      window.utils.toggleHidden(dialog, false);
      renderDialog(advert);

      dialogClose.addEventListener('click', function (evt) {
        closeDialog();
      });

      dialogClose.addEventListener('keydown', function (evt) {
        if (window.utils.isEnterPressed(evt)) {
          closeDialog();
        }
      });

      document.addEventListener('keydown', onEscPress);

      callback = cb;
    },
    close: closeDialog
  };
})();
