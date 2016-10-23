angular.module('giphyApp')
       .service('gif', gifService);

function gifService($http) {
  var API = 'http://api.giphy.com/v1/gifs';

  this.getRandom = function () {
    return $http.get(API + '/random?api_key=dc6zaTOxFJmzC')
        .then(function (response) {
          return response.data.data.image_url;
        });
  };

  this.getGif = function (image) {
    return $http.get(API + '/search?q=' + image.search + '&api_key=dc6zaTOxFJmzC')
      .then(function (response) {
        return response.data.data;
      });
  };

  this.favorite = function (favorite) {
    return $http({
      method: 'POST',
      url: '/fav',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }, data: { comment: favorite.comment, image: favorite.image }
    }).then(function (result) {
        return result;
        console.log(result);
    });
  };

  this.updateNumber = function () {
    return $http.get('/fav')
        .then(function (response) {
          console.log('response', response.data);
          return response.data;
        });
  };
}
