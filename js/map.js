'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var currentAdverts = null;
  var filteredAdverts = null;

  var updatePins = function () {
    filteredAdverts = window.filter(currentAdverts);
    window.pins.remove();
    window.card.close();
    window.pins.render(filteredAdverts, function (advert) {
      window.card.show(advert, window.pins.removeActivePinClass);
    });
  };

  filters.addEventListener('change', function () {
    window.utils.debounce(updatePins, 500);
  });

  /**
   * @param  {Array<Object>} adverts
   */
  var onLoad = function (adverts) {
    currentAdverts = adverts;
    window.pins.render(currentAdverts.slice(0, 3), function (advert) {
      window.card.show(advert, window.pins.removeActivePinClass);
    });
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);
})();
