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
   * @param  {Function} callback
   */
  var closeDialog = function (callback) {
    window.utils.toggleHidden(dialog, true);
    callback();
  };

  /**
   * @param  {Object} advert
   * @param  {Function} callback
   */
  var openDialog = function (advert, callback) {
    window.utils.toggleHidden(dialog, false);
    renderDialog(advert);
    callback();
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
    openDialog: openDialog,
    closeDialog: closeDialog
  };

})();
