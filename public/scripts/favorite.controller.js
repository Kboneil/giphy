angular.module('giphyApp')
       .controller('FavController', FavController);

function FavController(fav) {
  console.log('fav', fav);
  var main = this;
  main.favResults;
  main.number;
  fav.getFavorite(main).then(function (databaseInfo) {
    main.favResults = databaseInfo;
    main.number = databaseInfo.length;
  });

}
