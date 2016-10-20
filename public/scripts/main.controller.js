angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(gif) {
  var main = this;
  main.results = [];

  main.getRandom = function () {
    main.results = [];

    gif.getRandom().then(function (gif) {
      main.random = gif;
    });
  };

  main.getGif = function () {
    main.results = [];

    gif.getGif(main).then(function (search) {
      main.results = search;
    });
  };
}
