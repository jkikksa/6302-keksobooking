var getRandomInt = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

var getRandomElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
}

var removeChildsFromCollection = function(collection) {
  while (collection.firstChild) {
    collection.removeChild(collection.firstChild);
  };
};

var generateObj = function (imageURL) {

  var obj = {

    'author': {
      'avatar': imageURL
    },

    'offer': {
      'title': 'Какой-то заголовок',
      'address': 'Какой-то адрес',
      'price': getRandomInt(1000, 1000000),
      'type': getRandomElement(['flat', 'house', 'bungalo']),
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 8),
      'checkin': getRandomElement(['12:00', '13:00', '14:00']),
      'checkout': getRandomElement(['12:00', '13:00', '14:00']),
      'features': 1,
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandomInt(300, 900),
      'y': getRandomInt(100, 500)
    }
  };

  return obj;
};

var generateArr = function() {
  var array = [];

  for (var i = 0; i < 8; i++) {
    var imageURL = 'img/avatars/user' + '0' + (i + 1) + '.png';
    array.push(generateObj(imageURL));
  }

  return array;
};

var arr = generateArr();
var pin = document.querySelector('.tokyo__pin-map');
var template = document.querySelector('#lodge-template');
var dialog = document.querySelector('#offer-dialog');

for (var i = 0; i < arr.length; i++) {
  var div = document.createElement('div');
  var img = document.createElement('img');
  div.className = 'pin';
  var offsetX = div.offsetWidth / 2;
  var offsetY = div.offsetHeight
  div.style.left = arr[i].location.x - offsetX + 'px';
  div.style.top = arr[i].location.y - offsetY + 'px';
  img.src =  arr[i].author.avatar;
  div.appendChild(img);
  pin.appendChild(div);
}

var element = template.content.cloneNode(true);
var title = element.querySelector('.lodge__title');
  title.textContent = arr[i].offer.title;

removeChildsFromCollection(dialog);
dialog.appendChild(element);

// console.log(generateArr());

// console.log(generateObj());


// {
//   "author": {
//     "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.jpg, где xx это число от 1 до 8 с ведущим нулем. Например 01, 02 и т. д. Адреса изображений не повторяются
//   },
//
//   "offer": {
//     "title": строка, заголовок предложения
//     "address": строка, адрес предложения
//     "price": число, случайная цена от 1000 до 1 000 000
//     "type": строка с одним из трех фиксированных значений: flat, house или bungalo
//     "rooms": число, случайное количество комнат от 1 до 5
//     "guests": число, случайное количество гостей, которое можно разместить
//     "checkin": строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
//     "checkout": строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
//     "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//     "description": пустая строка,
//     "photos": пустой массив
//   },
//
//   "location": {
//     "x": случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
//     "y": случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
//   }
// }
