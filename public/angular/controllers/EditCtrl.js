angular.module('app.controllers')

.controller('EditCtrl', function($scope, Tweet, $data, $routeParams, $location) {

	// if and when the tweets are loaded...
	// then find the tweet with the id in the url
	$data.tweets.$promise.then(function() {
		$scope.tweet = $data.tweets.find(t => t.id == $routeParams.id)
	})

	$scope.updateTweet = function() {
		console.log($scope.tweet)

		Tweet.update({id: $scope.tweet.id}, $scope.tweet, function(response) {
			$location.path('/view/' + $scope.tweet.id)
		})
	}

})