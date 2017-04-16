'use strict';

(function () {

  /**
   * @const {number}
   */
  var ADVERTS_AMOUNT = 8;

  var advertsList = window.getAdverts(ADVERTS_AMOUNT);

  /**
   * The handler that closes the dialog panel when the escape key is pressed
   * @param {KeyboardEvent} evt
   */
  var onEscPress = function (evt) {
    if (window.utils.isEscapePressed(evt)) {
      window.dialog.closeDialog(function () {
        window.pin.removeActivePinClass();
        document.removeEventListener('keydown', onEscPress);
      });
    }
  };

  var dialogClose = document.querySelector('.dialog__close');

  dialogClose.addEventListener('click', function (evt) {
    window.dialog.closeDialog(function () {
      window.pin.removeActivePinClass();
      document.removeEventListener('keydown', onEscPress);
    });
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.dialog.closeDialog(function () {
        window.pin.removeActivePinClass();
        document.removeEventListener('keydown', onEscPress);
      });
    }
  });

  /**
   * Adds pins to the page
   * @param {Array<Object>} adverts
   */
  var renderPins = function (adverts) {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(window.pin.getPin(adverts[i], function (advert) {
        window.dialog.openDialog(advert, function () {
          document.addEventListener('keydown', onEscPress);
        });
      }));
    }
    pinMap.appendChild(fragment);
  };

  renderPins(advertsList);
})();
