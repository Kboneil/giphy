angular.module('giphyApp')
       .service('gif', gifService);

function gifService($http) {
  var API = 'http://api.giphy.com/v1/gifs';
  var KEY = 'dc6zaTOxFJmzC';

  //gets random image url
  this.getRandom = function () {
    return $http.get(API + '/random', {
  params: {
    api_key: KEY,
    rating: 'y'
      }
    }).then(function (response) {
          return response.data.data.image_url;
        });
  };

  //gets search images urls
  this.getGif = function (image) {
    return $http.get(API + '/search', {
      params: {
        api_key: KEY,
        rating: 'y',
        limit: 5,
        q: image.search
      }
    }).then(function (response) {
      return response.data.data;
    });
  };

  //sends a post function of favorited GIFs to be added to the database
  this.favorite = function (favorite) {
    return $http.post('/fav', favorite)
    .then(function (result) {
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
