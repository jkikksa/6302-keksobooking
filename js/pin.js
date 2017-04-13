'use strict';

window.pin = (function () {

  /**
   * @const {string}
   */
  var PIN_CLASSNAME = 'pin';

  /**
   * @const {string}
   */
  var IMG_CLASSNAME = 'rounded';

  /**
   * @const {number}
   */
  var IMG_WIDTH = 40;

  /**
   * @const {number}
   */
  var IMG_HEIGHT = 40;

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

  /**
   * Creates a pin based on the object parameters
   * @param {Object} advert
   * @param {Function} callback
   * @return {Element}
   */
  var generatePin = function (advert, callback) {
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

    pin.addEventListener('click', function (evt) {
      setPinActive(pin, advert);
      callback(advert);
    });

    pin.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        setPinActive(pin, advert);
        callback(advert);
      }
    });

    return pin;
  };

  return {
    generatePin: generatePin,
    removeActivePinClass: removeActivePinClass
  };

})();
