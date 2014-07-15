'use strict';
(function() {
	var app = angular.module('cmsExampleFeedViewer', [])
	
	app.directive('wsFeedViewer', function() {
		return {
			restrict: 'EA',
			controller: 'cmsFeed',
			templateUrl: "templates/ws-cms-ext-feed.html"
		};
	});
	app.controller('cmsFeed', ['$attrs', '$scope', function ($attrs, $scope) {
	
	$scope.feedId = $attrs.id;
	$scope.feedMaximumResults = $attrs.maximumResults;
	$scope.feedDisplayTemplate = $attrs.displayTemplate;
	}]);
})();