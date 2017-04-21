'use strict';

window.synchronizeFields = (function () {
  /**
   * @param {Element} syncFrom
   * @param {Element} syncTo
   * @param {Object<string, string>} map
   * @param {Function} callback
   */
  return function (syncFrom, syncTo, map, callback) {
    syncFrom.addEventListener('change', function (evt) {
      var value = map[syncFrom.value];
      callback(syncTo, value);
    });
  };
})();
