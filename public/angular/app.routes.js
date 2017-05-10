angular.module('app.routes')

.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('')

	$routeProvider
		.when('/', {
			controller: 'HomeCtrl',
			templateUrl: 'angular/views/home.html'
		})
		.when('/newtweet', {
			controller: 'TweetCtrl',
			templateUrl: 'angular/views/tweetform.html'
		})
    
    .when('/view/:id', {
			controller: 'SingleCtrl',
			templateUrl: 'angular/views/single.html'
		})
    
    .when('/edit/:id', {
			controller: 'EditCtrl',
			templateUrl: 'angular/views/edit.html'
		})
		.otherwise('/')
})
