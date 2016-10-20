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
}
