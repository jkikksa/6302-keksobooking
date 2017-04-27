'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('#time');
  var timeOut = form.querySelector('#timeout');
  var price = form.querySelector('#price');
  var type = form.querySelector('#type');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  /**
   * @const {Object<string, string>}
   */
  var TIMES_MAP = {
    'timein_12': 'timeout_12',
    'timein_13': 'timeout_13',
    'timein_14': 'timeout_14'
  };

  window.synchronizeFields(timeIn, timeOut, TIMES_MAP, function (input, value) {
    input.value = value;
  });

  /**
   * @const {Object<string, string>}
   */
  var PRICES_MAP = {
    'shack': 0,
    'flat': 1000,
    'palace': 10000
  };

  price.min = PRICES_MAP[type.value];

  window.synchronizeFields(type, price, PRICES_MAP, function (input, value) {
    input.min = value;
  });

  /**
   * @const {Object<string, string>}
   */
  var CAPACITY_MAP = {
    'rooms_1': 'guest_0',
    'rooms_2': 'guest_3',
    'rooms_100': 'guest_3'
  };

  window.synchronizeFields(roomNumber, capacity, CAPACITY_MAP, function (input, value) {
    input.value = value;
  });

  form.addEventListener('invalid', function (evt) {
    evt.target.classList.add('error');
  }, true);

  form.addEventListener('change', function (evt) {
    if (evt.target.classList.contains('error')) {
      if (evt.target.validity.valid) {
        evt.target.classList.remove('error');
      }
    }
  });

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

  window.makeDraggable(pinMain, document.querySelector('.tokyo'), function (pin) {
    address.value = getFormattedPosition(pin);
  });
})();
