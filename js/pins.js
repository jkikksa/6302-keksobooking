'use strict';

window.pins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  return {

    /**
     * @param {Array<Object>} adverts
     */
    render: function (adverts) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adverts.length; i++) {
        fragment.appendChild(window.pin.getPin(adverts[i], function (advert) {
          window.showCard(advert, window.pin.removeActivePinClass);
        }));
      }
      pinMap.appendChild(fragment);
    },

    remove: function () {
      var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
      for (var i = 0; i < pins.length; i++) {
        pinMap.removeChild(pins[i]);
      }
    }
  };

})();
