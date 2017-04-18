'use strict';

window.getAdverts = (function () {
  /**
   * @const {Array<string>}
   */
  var NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];

  /**
   * @const {Array<string>}
   */
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  /**
   * @const {Array<string>}
   */
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  /**
   * @const {Array<string>}
   */
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];

  /**
   * @const {Array<string>}
   */
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];

  /**
   * @const {Array<string>}
   */
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

  /**
   * Get a random unique item from an array
   * @param {Array} array
   * @return {Function}
   */
  var getRandomUniqueItem = function (array) {
    var newArray = array.slice(0);

    return function () {
      return newArray.splice(window.utils.getRandomInt(0, newArray.length - 1), 1);
    };
  };

  /**
   * @return {number}
   */
  var getRandomNumber = getRandomUniqueItem(NUMBERS);

  /**
   * @return {string}
   */
  var getRandomTitle = getRandomUniqueItem(TITLES);

  /**
   * @return {Object}
   */
  var generateLocation = function () {
    return {
      'x': window.utils.getRandomInt(300, 900),
      'y': window.utils.getRandomInt(100, 500)
    };
  };

  /**
   * Create an advert
   * @param {Object} location
   * @return {Object}
   */
  var getAdvert = function (location) {
    var advert = {
      'author': {
        'avatar': 'img/avatars/user' + getRandomNumber() + '.png'
      },
    };
    advert.location = location;
    advert.offer = {
      'title': getRandomTitle(),
      'address': advert.location.x + ',' + advert.location.y,
      'price': window.utils.getRandomInt(1000, 1000000),
      'type': window.utils.getRandomArrayItem(OFFER_TYPES),
      'rooms': window.utils.getRandomInt(1, 5),
      'guests': window.utils.getRandomInt(1, 8),
      'checkin': window.utils.getRandomArrayItem(CHECKIN_TIMES),
      'checkout': window.utils.getRandomArrayItem(CHECKOUT_TIMES),
      'features': window.utils.getRandomArray(FEATURES),
      'description': '',
      'photos': []
    };

    return advert;
  };

  /**
   * Create an advert list
   * @param {number} avdertsAmount Amount of adverts
   * @return {Array<Object>}
   */
  var getAdverts = function (avdertsAmount) {
    var advertsList = [];

    for (var i = 0; i < avdertsAmount; i++) {
      advertsList.push(getAdvert(generateLocation()));
    }

    return advertsList;
  };

  return getAdverts;
})();
