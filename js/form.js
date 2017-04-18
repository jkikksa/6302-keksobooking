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

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = TIMES_MAP[timeIn.value];
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

  type.addEventListener('change', function (evt) {
    price.min = PRICES_MAP[type.value];
  });

  /**
   * @const {Object<string, string>}
   */
  var CAPACITY_MAP = {
    'rooms_1': 'guest_0',
    'rooms_2': 'guest_3',
    'rooms_100': 'guest_3'
  };

  roomNumber.addEventListener('change', function (evt) {
    capacity.value = CAPACITY_MAP[roomNumber.value];
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

})();
