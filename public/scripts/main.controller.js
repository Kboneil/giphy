angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(gif) {
  var main = this;
  main.results = [];

  //gets a random result from giphy API
  main.getRandom = function () {
    main.results = [];
    gif.getRandom().then(function (gif) {
      main.random = gif;
    });
  };

  //searchs on giphy API
  main.getGif = function (search) {
    main.results = [];
    gif.getGif(main).then(function (search) {
      main.results = search;
      main.search = null;

    });

  };

  //updates the number of favorites in the header on load
  gif.updateNumber().then(function (databaseInfo) {
    main.number = databaseInfo.length;
  });

  //sends the favorite information to the service
  //so it can be added to the favorite page
  main.favorite = function (comment, image) {
    var data = { comment: comment, image: image };

    //clears out the random comment
    main.newscopeobj = null;

    //this should clear out the search comment,
    //but it doesn't work
    newscopeobj = null;
    gif.favorite(data).then(function (response) {
      //after a GIF is favorited it will update the number
      gif.updateNumber().then(function (databaseInfo) {
        main.number = databaseInfo.length;
      });
    });
  };
}
