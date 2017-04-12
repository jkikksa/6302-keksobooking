'use strict';

/**
 * @const {number}
 */
var ADVERTS_AMOUNT = 8;

var advertsList = window.advertsGetter(ADVERTS_AMOUNT);

window.pin.renderPins(advertsList);
