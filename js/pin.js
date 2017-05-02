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

  var onPinClick = function () {

  };

  var onPinPress = function () {

  };

  var currentPin = null;

  return {
    create: function (advert, callback) {
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

      onPinClick = function (evt) {
        callback(advert, pin);
      };

      onPinPress = function (evt) {
        if (window.utils.isEnterPressed(evt)) {
          callback(advert, pin);
        }
      };

      currentPin = pin;
      currentPin.addEventListener('click', onPinClick);
      currentPin.addEventListener('keydown', onPinPress);

      return currentPin;
    },

    remove: function () {
      currentPin.removeEventListener('click', onPinClick);
      currentPin.removeEventListener('keydown', onPinPress);
    }
  };
})();
