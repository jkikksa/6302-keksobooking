'use strict';

window.makeDraggable = (function () {

  /**
   * @type {Element}
   */
  var element = null;

  /**
   * @type {Element}
   */
  var area = null;

  /**
   * @type {Function}
   */
  var callback = null;

  /**
   * @type {Object<string, number>}
   */
  var startCoords = {};

  /**
   * @type {Object<string, number>}
   */
  var shift = {};

  /**
   * @param {MouseEvent} evt
   */
  var onMouseMove = function (evt) {
    evt.preventDefault();

    shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    if (element.offsetLeft - shift.x < 0) {
      element.style.left = 0;
    }

    if (element.offsetLeft - shift.x > area.clientWidth - element.clientWidth) {
      element.style.left = area.clientWidth - element.clientWidth + 'px';
    }

    if (element.offsetTop - shift.y < 0) {
      element.style.top = 0;
    }

    if (element.offsetTop - shift.y > area.clientHeight - element.clientHeight) {
      element.style.top = area.clientHeight - element.clientHeight + 'px';
    }

    if (evt.clientX < area.getBoundingClientRect().left || evt.clientX > area.getBoundingClientRect().right || evt.clientY < area.getBoundingClientRect().top || evt.clientY > area.getBoundingClientRect().bottom) {
      stopMove();
    }

    element.style.top = (element.offsetTop - shift.y) + 'px';
    element.style.left = (element.offsetLeft - shift.x) + 'px';
  };

  var stopMove = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * @param {MouseEvent} evt
   */
  var onMouseUp = function (evt) {
    evt.preventDefault();

    if (typeof callback === 'function') {
      callback(element);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * Makes element draggable.
   * @param {Element} handle The handle for which the element is dragged
   * @param {Element} elem What is dragged
   * @param {Element} zone Limited area for draggable events
   * @param {Function} cb
   */
  return function (handle, elem, zone, cb) {
    element = elem;
    callback = cb;
    area = zone;

    handle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
