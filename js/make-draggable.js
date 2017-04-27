'use strict';

window.makeDraggable = (function () {
  var element = null;
  var area = null;
  var callback = null;

  /**
   * @param {MouseEvent} evt
   */
  var onMouseMove = function (evt) {
    evt.preventDefault();

    var x = evt.pageX - area.offsetLeft - element.offsetWidth / 2;
    var y = evt.pageY - area.offsetTop - element.offsetHeight / 2;

    if (x >= 0 && x <= area.clientWidth - element.offsetWidth &&
        y >= 0 && y <= area.clientHeight - element.offsetHeight) {
      element.style.left = x + 'px';
      element.style.top = y + 'px';
    }

    if (evt.clientX < area.getBoundingClientRect().left ||
        evt.clientX > area.getBoundingClientRect().right ||
        evt.clientY < area.getBoundingClientRect().top ||
        evt.clientY > area.getBoundingClientRect().bottom) {
      stopMove();
    }
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

    callback(element);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * Makes element draggable.
   * @param {Element} elem What is dragged
   * @param {Element} zone Limited area for draggable events
   * @param {Function} cb
   */
  return function (elem, zone, cb) {
    element = elem;
    callback = cb;
    area = zone;

    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
