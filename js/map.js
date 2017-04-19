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

  /**
   * Gets the coordinates of the pin
   * @param  {Element} pin
   * @return {Object}
   */
  var getPinPosition = function (pin) {
    return {
      posX: pin.offsetLeft + pin.clientWidth / 2,
      posY: pin.offsetTop + pin.clientHeight
    };
  };

  /**
   * Format the coordinates of the pin
   * @param  {Element} pin
   * @return {string}
   */
  var getFormatedPosition = function (pin) {
    return 'x: ' + getPinPosition(pin).posX + ' ' + 'y: ' + getPinPosition(pin).posY;
  };

  var pinMain = document.querySelector('.pin__main');
  var address = document.querySelector('#address');

  address.readOnly = true;
  address.value = getFormatedPosition(pinMain);

  window.makeDraggable(pinMain, pinMain, function (pin) {
    address.value = getFormatedPosition(pin);
  });

})();
