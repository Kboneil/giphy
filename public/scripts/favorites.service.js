angular.module('giphyApp')
       .service('fav', favoriteService);

function favoriteService($http) {

  //sends a get request to put all the favorites on the page
  this.getFavorite = function () {
    return $http.get('/fav')
        .then(function (response) {
          console.log('response', response.data);
          return response.data;
        });
  };

  //sends a delete request that will use the id
  //as a parameter
  this.delete = function (id) {
    return $http.delete('/fav/' + id)
        .then(function (response) {
          console.log('delete complete');
        });
  };

  //sends a post request to update the comment
  //uses the id as a parameter
  this.update = function (id, comment, image) {
    var data = { comment: comment, image: image };
    return $http.put('/fav/' + id, data)
      .then(function (result) {
        return result;
      });
  };

}
