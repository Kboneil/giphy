angular.module('giphyApp')
.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'MainController as main'
  }).when('/favorites', {
    templateUrl: 'views/favorites.html',
    controller: 'FavController as fav'
  });
  $locationProvider.html5Mode(true);
});
