'use strict';

(function () {

  /**
   * @const {number}
   */
  var ADVERTS_AMOUNT = 8;

  var advertsList = window.getAdverts(ADVERTS_AMOUNT);

  /**
   * Adds pins to the page
   * @param {Array<Object>} adverts
   */
  var renderPins = function (adverts) {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(window.pin.getPin(adverts[i], function (advert) {
        window.openDialog(advert, window.pin.removeActivePinClass);
      }));
    }
    pinMap.appendChild(fragment);
  };

  renderPins(advertsList);
})();
