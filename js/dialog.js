'use strict';

window.dialog = (function () {
  /**
   * @const {Object<string, string>}
   */
  var LODGE_TYPE_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

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

    for (var i = 0; i < features.length; i++) {
      lodgeElement.querySelector('.lodge__features').appendChild(generateFeature(features[i]));
    }

    lodgeElement.querySelector('.lodge__description').textContent = advertsItem.offer.description;

    return lodgeElement;
  };

  var dialog = document.querySelector('.dialog');

  /**
   * Adds a dialog item to the page
   * @param {Object} advertsItem
   */
  var renderDialog = function (advertsItem) {
    var dialogPanel = document.querySelector('.dialog__panel');
    dialog.replaceChild(generateLodgeElement(advertsItem), dialogPanel);
    document.querySelector('.dialog__title img').src = advertsItem.author.avatar;
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

  var closeDialog = function () {
    window.utils.toggleHidden(dialog, true);
    window.pin.removeActivePinClass();

    document.removeEventListener('keydown', onEscPress);
  };

  var openDialog = function () {
    window.utils.toggleHidden(dialog, false);

    document.addEventListener('keydown', onEscPress);
  };

  var dialogClose = document.querySelector('.dialog__close');

  dialogClose.addEventListener('click', function (evt) {
    closeDialog();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      closeDialog();
    }
  });

  return {
    renderDialog: renderDialog,
    openDialog: openDialog
  };

})();
