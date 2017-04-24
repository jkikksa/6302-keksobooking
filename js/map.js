'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var pinMap = document.querySelector('.tokyo__pin-map');

  var typeFilter = function (advert) {
    var type = filters.querySelector('#housing_type');

    return type.value === 'any' ? true : advert.offer.type === type.value;
  };

  var priceFilter = function (advert) {
    var price = filters.querySelector('#housing_price');

    switch (price.value) {
      case 'low':
        return advert.offer.price <= 10000;
      case 'middle':
        return advert.offer.price > 10000 && advert.offer.price < 50000;
      case 'high':
        return advert.offer.price >= 50000;
    }

    return false;
  };

  var roomsFilter = function (advert) {
    var rooms = filters.querySelector('#housing_room-number');

    return rooms.value === 'any' ? true : advert.offer.rooms === +rooms.value;
  };

  var guestsFilter = function (advert) {
    var guests = filters.querySelector('#housing_guests-number');

    return guests.value === 'any' ? true : advert.offer.guests === +guests.value;
  };

  var featuresFilter = function (advert) {
    var checked = filters.querySelectorAll('.feature input:checked');
    var features = [];

    for (var i = 0; i < checked.length; i++) {
      features.push(checked[i].value);
    }

    return features.every(function (it) {
      return ~advert.offer.features.indexOf(it);
    });
  };

  var currentAdverts;

  filters.addEventListener('change', function (evt) {
    updateAdverts(currentAdverts);
  });

  var updateAdverts = function (adverts) {
    var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');

    for (var i = 0; i < pins.length; i++) {
      pinMap.removeChild(pins[i]);
    }

    var fragment = document.createDocumentFragment();

    var sortedAdverts = adverts
      .filter(typeFilter)
      .filter(priceFilter)
      .filter(roomsFilter)
      .filter(guestsFilter)
      .filter(featuresFilter);

    for (var i = 0; i < sortedAdverts.length; i++) {
      fragment.appendChild(window.pin.getPin(sortedAdverts[i], function (advert) {
        window.showCard(advert, window.pin.removeActivePinClass);
      }));
    }
    pinMap.appendChild(fragment);
  };
  /**
   * @param  {Array<Object>} adverts
   */
  var onLoad = function (adverts) {
    currentAdverts = adverts;
    updateAdverts(currentAdverts);
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);

  /**
   * The offset of the image in the parent block
   * @const {number}
   */
  var PIN_IMAGE_OFFSET = 4;

  /**
   * Gets the coordinates of the pin
   * @param  {Element} pin
   * @return {Object}
   */
  var getPinPosition = function (pin) {
    return {
      posX: pin.offsetLeft + pin.clientWidth / 2,
      posY: pin.offsetTop + pin.clientHeight - PIN_IMAGE_OFFSET
    };
  };

  /**
   * Format the coordinates of the pin
   * @param  {Element} pin
   * @return {string}
   */
  var getFormattedPosition = function (pin) {
    return 'x: ' + Math.round(getPinPosition(pin).posX) + ' ' + 'y: ' + Math.round(getPinPosition(pin).posY);
  };

  var pinMain = document.querySelector('.pin__main');
  var address = document.querySelector('#address');

  address.readOnly = true;
  address.value = getFormattedPosition(pinMain);

  window.makeDraggable(pinMain, pinMain, document.querySelector('.tokyo'), function (pin) {
    address.value = getFormattedPosition(pin);
  });

})();
