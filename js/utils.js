'use strict';

window.utils = (function () {

  /**
   * Keyboard key codes
   * @enum {number}
   */
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var lastTimeout;

  return {

    /**
     * @param {KeyboardEvent} evt
     * @return {boolean}
     */
    isEnterPressed: function (evt) {
      return evt.keyCode === KeyCode.ENTER;
    },

    /**
     * @param {KeyboardEvent} evt
     * @return {boolean}
     */
    isEscapePressed: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    },

    /**
     * Toggle class 'hidden' in the element.
     * @param {Element} element The DOM element in which the class is toggled
     * @param {boolean} state If false - remove class, if true - add class.
     */
    toggleHidden: function (element, state) {
      element.classList.toggle('hidden', state);
    },

    /**
     * @param {Function} func
     * @param {number} interval
     */
    debounce: function (func, interval) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(func, interval);
    }
  };
})();
