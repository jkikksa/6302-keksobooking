'use strict';

window.pins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  /**
   * @const {string}
   */
  var PIN_ACTIVE_CLASS = 'pin--active';

  /**
   * Removes the class from the active pin element
   */
  var removeActivePinClass = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }
  };

  /**
   * Adds behavior for the pin
   * @param  {Element} pin
   */
  var setPinActive = function (pin) {
    removeActivePinClass();
    pin.classList.add(PIN_ACTIVE_CLASS);
  };


  return {

    /**
     * @param {Array<Object>} adverts
     * @param {Function} callback
     */
    render: function (adverts, callback) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adverts.length; i++) {
        fragment.appendChild(window.getPin(adverts[i], function (advert, pin) {
          setPinActive(pin);
          callback(advert);
        }));
      }
      pinMap.appendChild(fragment);
    },

    remove: function () {
      var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
      for (var i = 0; i < pins.length; i++) {
        pinMap.removeChild(pins[i]);
      }
    },

    removeActivePinClass: removeActivePinClass
  };

})();
