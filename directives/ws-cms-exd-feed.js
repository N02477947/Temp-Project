'use strict';
(function() {
	var app = angular.module('cmsExampleFeedViewer', [])
	
	app.directive('wsFeedViewer', function() {
		return {
			restrict: 'EA',
			controller: 'cmsCalendar',
			templateUrl: "templates/ws-cms-ext-feed.html"
		};
	});
	app.controller('cmsFeed', ['$attrs', '$scope', function ($attrs, $scope) {
	
	$scope.id = $attrs.id;
	$scope.maximumResults = $attrs.maximumResults;
	$scope.displayTemplate = $attrs.displayTemplate;
	}]);
})();