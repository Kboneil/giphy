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
    return $http({
      method: 'PUT',
      url: '/fav/' + id,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function (obj) {
        var str = [];
        for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }, data: { comment: comment, image: image }
    }).then(function (result) {
        return result;
        console.log('update complete');
      });
  };

}
