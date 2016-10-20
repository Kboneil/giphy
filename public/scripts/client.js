var app = angular.module('giphyApp', []);

app.controller('MainController', MainController);

var API = 'http://api.giphy.com/v1/gifs';

function MainController($http) {
  var main = this;
  console.log('MainController loaded');
  main.results = [];
  main.random = '';
  main.getRandom = function () {
    main.results = [];
    $http.get(API + '/random?api_key=dc6zaTOxFJmzC')
    .then(function (response) {
      console.log('response', response.data);
      main.random = response.data.data.image_url;
    });
  };

  main.getGif = function () {
    main.results = [];
    $http.get(API + '/search?q=' + main.search + '&api_key=dc6zaTOxFJmzC')
    .then(function (response) {
      console.log(response);
      main.results = response.data.data;
      main.search = null;
    });
  };
}
