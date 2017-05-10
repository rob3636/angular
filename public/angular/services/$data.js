angular.module('app.services')

.factory('$data', function(Tweet) { 

	return {
		tweets: Tweet.query()
	}

})