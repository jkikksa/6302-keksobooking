'use strict';

(function () {

  /**
   * @const {number}
   */
  var ADVERTS_AMOUNT = 8;

  var advertsList = window.getAdverts(ADVERTS_AMOUNT);

  var dialogClose = document.querySelector('.dialog__close');

  dialogClose.addEventListener('click', function (evt) {
    window.dialog.closeDialog(window.pin.removeActivePinClass);
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.dialog.closeDialog(window.pin.removeActivePinClass);
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
        window.dialog.openDialog(advert);
      }));
    }
    pinMap.appendChild(fragment);
  };

  renderPins(advertsList);
})();
