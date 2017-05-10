angular.module('app.resources')

.factory('Tweet', function($resource) {

	var url = '/api/tweet/:id'

	var defaults = {
		'id': '@id'
	}

	var methods = {
		update: {
			method: 'PUT'
		}
	}

	return $resource(url, defaults, methods);
})
