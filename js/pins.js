'use strict';

window.pins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  /**
   * @const {string}
   */
  var PIN_ACTIVE_CLASS = 'pin--active';

  var activePin = null;

  /**
   * Removes the class from the active pin element
   */
  var removeActivePinClass = function () {
    if (activePin !== null) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
      activePin = null;
    }
  };

  /**
   * Adds behavior for the pin
   * @param  {Element} pin
   */
  var setPinActive = function (pin) {
    removeActivePinClass();
    pin.classList.add(PIN_ACTIVE_CLASS);
    activePin = pin;
  };

  var renderedPins = [];

  return {
    /**
     * @param {Array<Object>} adverts
     * @param {Function} callback
     */
    render: function (adverts, callback) {
      var fragment = document.createDocumentFragment();

      renderedPins = adverts.map(function (it) {
        var pinElement = window.pin.create(it, function (advert, pin) {
          setPinActive(pin);
          callback(advert);
        });
        fragment.appendChild(pinElement);
        return pinElement;
      });

      pinMap.appendChild(fragment);
    },

    remove: function () {
      renderedPins.forEach(function (it) {
        pinMap.removeChild(it);
        it.remove();
      });
      renderedPins.length = 0;
    },

    removeActivePinClass: removeActivePinClass
  };
})();
