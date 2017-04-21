'use strict';

window.makeDraggable = (function () {
  /**
   * @type {Element}
   */
  var _element = null;

  /**
   * @type {Element}
   */
  var _area = null;

  /**
   * @type {Function}
   */
  var _callback = null;

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

    if (_element.offsetLeft - shift.x < 0) {
      _element.style.left = 0;
    }

    if (_element.offsetLeft - shift.x > _area.clientWidth - _element.clientWidth) {
      _element.style.left = _area.clientWidth - _element.clientWidth + 'px';
    }

    if (_element.offsetTop - shift.y < 0) {
      _element.style.top = 0;
    }

    if (_element.offsetTop - shift.y > _area.clientHeight - _element.clientHeight) {
      _element.style.top = _area.clientHeight - _element.clientHeight + 'px';
    }

    if (evt.clientX < _area.getBoundingClientRect().left || evt.clientX > _area.getBoundingClientRect().right || evt.clientY < _area.getBoundingClientRect().top || evt.clientY > _area.getBoundingClientRect().bottom) {
      stopMove();
    }

    _element.style.top = (_element.offsetTop - shift.y) + 'px';
    _element.style.left = (_element.offsetLeft - shift.x) + 'px';
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

    if (typeof _callback === 'function') {
      _callback(_element);
    }


    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * Makes element draggable.
   * @param {Element} handle The handle for which the element is dragged
   * @param {Element} element What is dragged
   * @param {Element} area Limited area for draggable events
   * @param {Function} callback
   */
  return function (handle, element, area, callback) {
    _element = element;
    _callback = callback;
    _area = area;

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
