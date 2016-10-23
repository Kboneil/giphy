angular.module('giphyApp')
       .controller('FavController', FavController);

function FavController(fav) {
  var main = this;

  //gets all the favorite information from
  //the database, so it can be added on load
  fav.getFavorite(main).then(function (databaseInfo) {
    main.favResults = databaseInfo;

    //updates the favorite number in the header
    main.number = databaseInfo.length;
  });

  //deletes an entry on click using the id number
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

  //updates the comment on click
  main.update = function (id, comment, image) {
    fav.update(id, comment, image).then(function () {
      fav.getFavorite(main).then(function (databaseInfo) {
        console.log("databaseInfo", databaseInfo);
        main.favResults = databaseInfo;
        main.number = databaseInfo.length;
      });
    });
  };

}
