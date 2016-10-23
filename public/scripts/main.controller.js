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

    gif.getGif(main).then(function (search) {
      main.results = search;
    });

  };

  gif.updateNumber().then(function (databaseInfo) {
    main.number = databaseInfo.length;
  });

  main.favorite = function (comment, image) {
    var data = { comment: comment, image: image };
    main.newscopeobj = null;
    newscopeobj = null;
    gif.favorite(data).then(function (response) {
      gif.updateNumber().then(function (databaseInfo) {
        main.number = databaseInfo.length;
      });
    });
  };
}
