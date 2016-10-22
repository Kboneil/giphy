angular.module('giphyApp')
       .controller('FavController', FavController);

function FavController(fav) {
console.log('in getFavorite');
  var main = this;
  main.favResults;
  fav.getFavorite(main).then(function (databaseInfo) {
    main.favResults = databaseInfo;
  });

}
