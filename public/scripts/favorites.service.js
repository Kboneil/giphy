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

  this.delete = function (id) {
    console.log('id in delete function', id);
    return $http.delete('/fav/' + id)
        .then(function (response) {
          console.log('delete complete');
        });
  };


  this.update = function (id, comment, image) {
    return $http({
      method: 'PUT',
      url: '/fav/' + id,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }, data: { comment: comment, image: image }
    }).then(function (result) {
        return result;
        console.log(result);
    });
  };

}
