'use strict';

window.load = (function () {

  /**
   * Makes a request to the server
   * @param {string} url
   * @param {Function} onLoad callback
   */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          window.modalError('Неверный запрос');
          break;
        case 401:
          window.modalError('Требуется аутентификация');
          break;
        case 404:
          window.modalError('Адрес не найден');
          break;
        default:
          window.modalError('Что-то пошло не так');
      }
    });

    xhr.addEventListener('error', function () {
      window.modalError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.modalError('Превышено время ожидания');
    });

    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.timeout = 1000;
    xhr.send();

  };
})();
