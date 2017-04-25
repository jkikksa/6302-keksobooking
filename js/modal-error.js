'use strict';

window.modalError = (function () {

  /**
   * @const {number}
   */
  var DELAY = 3000;

  /**
   * Shows a modal window and then hides it
   * @param {string} errMessage Error text
   */
  return function (errMessage) {
    var modal = document.querySelector('.modal-error');
    var message = modal.querySelector('.modal-error__error-message');
    window.utils.toggleHidden(modal, false);
    message.textContent = errMessage;

    setTimeout(function () {
      window.utils.toggleHidden(modal, true);
    }, DELAY);
  };
})();
