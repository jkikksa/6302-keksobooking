'use strict';

window.load = (function () {

  /**
   * @const {Object<number, string>}
   */
  var ERROR_MAP = {
    400: 'Неверный запрос',
    401: 'Требуется аутентификация',
    404: 'Адрес не найден',
    500: 'Ошибка сервера'
  };

  /**
   * @const {number}
   */
  var TIMEOUT = 10000;

  /**
   * Makes a request to the server
   * @param {string} url
   * @param {Function} onLoad callback
   */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        window.modalError(ERROR_MAP[xhr.status] || 'Неизвестная ошибка');
      }
    });

    xhr.addEventListener('error', function () {
      window.modalError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.modalError('Превышено время ожидания');
    });

    xhr.send();

  };
})();
