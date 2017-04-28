'use strict';

window.filter = (function () {
  var filters = document.querySelector('.tokyo__filters');
  var type = filters.querySelector('#housing_type');
  var price = filters.querySelector('#housing_price');
  var rooms = filters.querySelector('#housing_room-number');
  var guests = filters.querySelector('#housing_guests-number');

  /**
   * @param {Object} advert
   * @return {boolean}
   */
  var typeFilter = function (advert) {
    return type.value === 'any' ? true : advert.offer.type === type.value;
  };

  /**
   * @param {Object} advert
   * @return {boolean}
   */
  var priceFilter = function (advert) {
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

  /**
   * @param {Object} advert
   * @return {boolean}
   */
  var roomsFilter = function (advert) {
    return rooms.value === 'any' ? true : advert.offer.rooms === +rooms.value;
  };

  /**
   * @param {Object} advert
   * @return {boolean}
   */
  var guestsFilter = function (advert) {
    return guests.value === 'any' ? true : advert.offer.guests === +guests.value;
  };

  /**
   * @param {Object} advert
   * @return {boolean}
   */
  var featuresFilter = function (advert) {
    var featuresChecked = filters.querySelectorAll('.feature input:checked');

    return Array.prototype.every.call(featuresChecked, function (it) {
      return ~advert.offer.features.indexOf(it.value);
    });
  };

  /**
   * @param {Array<Object>} adverts
   * @return {Array<Object>}
   */
  return function (adverts) {
    return adverts
      .filter(typeFilter)
      .filter(priceFilter)
      .filter(roomsFilter)
      .filter(guestsFilter)
      .filter(featuresFilter);
  };
})();
