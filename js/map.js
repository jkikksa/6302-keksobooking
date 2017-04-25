'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var currentAdverts;

  /**
   * @param {Array<Object>} adverts
   */
  var updatePins = function (adverts) {
    var filteredAdverts = window.filter(adverts);
    window.pins.remove();
    window.pins.render(filteredAdverts);
  };

  filters.addEventListener('change', function () {
    updatePins(currentAdverts);
  });

  /**
   * @param  {Array<Object>} adverts
   */
  var onLoad = function (adverts) {
    currentAdverts = adverts;
    window.pins.render(currentAdverts.slice(0, 3));
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);

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

  window.makeDraggable(pinMain, pinMain, document.querySelector('.tokyo'), function (pin) {
    address.value = getFormattedPosition(pin);
  });

})();
