'use strict';
/**
 * @const
 * @type {Array<string>}
 */
var NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];

/**
 * @const
 * @type {Array<string>}
 */
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

/**
 * @const
 * @type {Array<string>}
 */
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/**
 * @const
 * @type {Array<string>}
 */
var OFFER_TYPES = ['flat', 'house', 'bungalo'];

/**
 * @const
 * @type {Array<string>}
 */
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];

/**
 * @const
 * @type {Array<string>}
 */
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

/**
 * @const {number}
 */
var ENTER_KEY_CODE = 13;

/**
 * @const {number}
 */
var ESC_KEY_CODE = 27;

/**
 * @const
 * @type {Object}
 */
var ACCOMODATION_TYPE_NAMES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

/**
 * Get a random integer number between the minimum number and the maximum number (inclusive)
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

/**
* Get a random item from an array
* @param {Array} array
* @return {*}
*/
var getRandomArrayItem = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

/**
 * Get a random unique item from an array
 * @param {Array} array
 * @return {Function}
 */
var getRandomUniqueItem = function (array) {
  var newArray = array.slice();

  return function () {
    return newArray.splice(getRandomInt(0, newArray.length - 1), 1);
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
 * Get a new random length array from the recieved array
 * @param {Array} array
 * @return {Array}
 */
var getRandomArray = function (array) {
  return array.filter(function () {
    return getRandomInt(0, 1) === 0;
  });
};

var toggleHidden = function (element, state) {
  element.classList.toggle('hidden', state);
};

/**
 * @return {Object}
 */
var generateLocation = function () {
  return {
    'x': getRandomInt(300, 900),
    'y': getRandomInt(100, 500)
  };
};

/**
 * Create an advert
 * @param {Object} location
 * @return {Object}
 */
var generateAdvert = function (location) {
  var advert = {
    'author': {
      'avatar': 'img/avatars/user' + getRandomNumber() + '.png'
    },
  };
  advert.location = location;
  advert.offer = {
    'title': getRandomTitle(),
    'address': advert.location.x + ',' + advert.location.y,
    'price': getRandomInt(1000, 1000000),
    'type': getRandomArrayItem(OFFER_TYPES),
    'rooms': getRandomInt(1, 5),
    'guests': getRandomInt(1, 8),
    'checkin': getRandomArrayItem(CHECKIN_TIMES),
    'checkout': getRandomArrayItem(CHECKOUT_TIMES),
    'features': getRandomArray(FEATURES),
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
var generateAdvertsList = function (avdertsAmount) {
  var advertsList = [];

  for (var i = 0; i < avdertsAmount; i++) {
    advertsList.push(generateAdvert(generateLocation()));
  }

  return advertsList;
};

var PIN_CLASSNAME = 'pin';
var IMG_CLASSNAME = 'rounded';
var IMG_WIDTH = 40;
var IMG_HEIGHT = 40;

/**
 * Creates a pin based on the object parameters
 * @param {Object} advert
 * @return {Element}
 */
var generatePin = function (advert) {
  var pin = document.createElement('div');
  var img = document.createElement('img');

  pin.className = PIN_CLASSNAME;
  pin.style.left = advert.location.x - pin.offsetWidth / 2 + 'px';
  pin.style.top = advert.location.y - pin.offsetHeight + 'px';
  img.className = IMG_CLASSNAME;
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;
  img.src = advert.author.avatar;
  img.tabIndex = '0';
  pin.appendChild(img);

  return pin;
};

/**
 * Adds pins to the page
 * @param {Array<Object>} adverts
 */
var renderPins = function (adverts) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(generatePin(adverts[i]));
  }

  pinMap.appendChild(fragment);
};

/**
 * @type {DocumentFragment}
 */
var lodgeTemplate = document.querySelector('#lodge-template').content;

/**
 * [description]
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
  lodgeElement.querySelector('.lodge__type').textContent = ACCOMODATION_TYPE_NAMES[advertsItem.offer.type];
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

var advertsList = generateAdvertsList(8);
renderPins(advertsList);

var pins = document.querySelectorAll('.pin:not(.pin__main)');
var dialogClose = document.querySelector('.dialog__close');

var removeActivePinClasses = function () {
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
};

var isEnterPressed = function (evt) {
  return evt.keyCode === ENTER_KEY_CODE;
};

var escPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeDialogPanel();
  }
};

var closeDialogPanel = function () {
  toggleHidden(dialog, true);
  removeActivePinClasses();

  document.removeEventListener('keydown', escPressHandler);
};

var openDialogPanel = function () {
  toggleHidden(dialog, false);

  document.addEventListener('keydown', escPressHandler);
};

dialogClose.addEventListener('click', function (evt) {
  closeDialogPanel();
});

dialogClose.addEventListener('keydown', function (evt) {
  if (isEnterPressed(evt)) {
    closeDialogPanel();
  }
});

var addPinHandler = function (pin, index) {
  removeActivePinClasses();
  pin.classList.add('pin--active');
  openDialogPanel();
  renderDialog(advertsList[index]);
};

Array.prototype.slice.call(pins).forEach(function (currentPin, index) {
  currentPin.addEventListener('click', function (evt) {
    addPinHandler(currentPin, index);
  });
  currentPin.addEventListener('keydown', function (evt) {
    if (isEnterPressed(evt)) {
      addPinHandler(currentPin, index);
    }
  });
});
