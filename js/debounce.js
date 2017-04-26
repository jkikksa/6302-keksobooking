'use strict';

window.debounce = (function () {

  var lastTimeout;

  /**
   * @param {Function} func
   * @param {number} interval
   */
  return function (func, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, interval);
  };
})();
