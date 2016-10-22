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

  main.getGif = function (search) {
    main.results = [];
    main.random = null;

    gif.getGif(main).then(function (search) {
      main.results = search;
    });

  };

  main.favorite = function () {
    main.favoriteGif.image = main.random;
    var data = main.favoriteGif
    gif.favorite(data).then(function () {
      console.log('then favorite');
    });
  };
}
