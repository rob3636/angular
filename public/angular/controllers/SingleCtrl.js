angular.module('app.controllers')

.controller('SingleCtrl', function($scope, Tweet, $data, $routeParams, $location) {

	$data.tweets.$promise.then(function() {
		$scope.tweet = $data.tweets.find(t => t.id == $routeParams.id)
	})

	$scope.deleteTweet = function(tweet) {
		Tweet.delete({id: tweet.id}, function() {
			// find the index in the array of the tweet we want to remove
			var index = $data.tweets.findIndex(t => t.id == tweet.id)

			// remove 1 item from the tweets array, at the index we found above
			$data.tweets.splice(index, 1)

			$location.path('/')
		})
	}

})
