'use strict';

window.getPin = (function () {

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
   * Creates a pin based on the object parameters
   * @param {Object} advert
   * @param {Function} callback
   * @return {Element}
   */
  return function (advert, callback) {
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
      callback(advert, pin);
    });

    pin.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        callback(advert, pin);
      }
    });

    return pin;
  };

})();
