'use strict';

/**
 * @const {number}
 */
var ADVERTS_AMOUNT = 8;

var adverts = window.advertsGetter(ADVERTS_AMOUNT);

/**
 * Adds pins to the page
 * @param {Array<Object>} adverts
 */
var renderPins = function (adverts) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(window.pin.generatePin(adverts[i], function (advert) {
      window.dialog.openDialog();
      window.dialog.renderDialog(advert);
    }));
  }

  pinMap.appendChild(fragment);
};

renderPins(adverts);
