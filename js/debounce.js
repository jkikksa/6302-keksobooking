'use strict';

window.debounce = (function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  /**
   * @param {Function} func
   */
  return function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };
})();
