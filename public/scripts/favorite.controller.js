angular.module('giphyApp')
       .controller('FavController', FavController);

function FavController(fav) {
  var main = this;

  fav.getFavorite(main).then(function (databaseInfo) {
    main.favResults = databaseInfo;
    main.number = databaseInfo.length;
  });

  main.delete = function (id) {
    console.log('id', id);
    fav.delete(id).then(function () {
      fav.getFavorite(main).then(function (databaseInfo) {
        console.log("databaseInfo", databaseInfo);
        main.favResults = databaseInfo;
        main.number = databaseInfo.length;
      });
    });
  };

  main.update = function (id, comment, image) {
    console.log('id', id);
    console.log('comment', comment);
    console.log('image', image);
    fav.update(id, comment, image).then(function () {
      fav.getFavorite(main).then(function (databaseInfo) {
        console.log("databaseInfo", databaseInfo);
        main.favResults = databaseInfo;
        main.number = databaseInfo.length;
      });
    });
  };

}
