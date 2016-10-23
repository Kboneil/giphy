angular.module('giphyApp')
       .service('gif', gifService);

function gifService($http) {
  var API = 'http://api.giphy.com/v1/gifs';

  //gets random image url
  this.getRandom = function () {
    return $http.get(API + '/random?api_key=dc6zaTOxFJmzC')
        .then(function (response) {
          return response.data.data.image_url;
        });
  };

  //gets search images urls
  this.getGif = function (image) {
    return $http.get(API + '/search?q=' + image.search + '&api_key=dc6zaTOxFJmzC')
      .then(function (response) {
        return response.data.data;
      });
  };

  //sends a post function of favorited GIFs to be added to the database
  this.favorite = function (favorite) {
    return $http({
      method: 'POST',
      url: '/fav',

      //I had to add this to get the data to send correctly
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function (obj) {
        var str = [];
        for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }, data: { comment: favorite.comment, image: favorite.image }
    }).then(function (result) {
        return result;
      });
  };

  //gets the number of entries in database
  this.updateNumber = function () {
    return $http.get('/fav')
        .then(function (response) {
          console.log('response', response.data);
          return response.data;
        });
  };
}
