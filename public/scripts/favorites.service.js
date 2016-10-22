angular.module('giphyApp')
       .service('fav', favoriteService);

function favoriteService($http) {

  this.getFavorite = function () {
    console.log('in favorite.service get');
    return $http.get('/fav')
        .then(function (response) {
          console.log('response', response.data);
          return response.data;
        });
  };

}
