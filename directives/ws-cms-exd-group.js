'use strict';
(function() {
	var app = angular.module('cmsFeedGroup', [])
	
	app.directive('wsFeedGroupViewer', function() {
		return {
			restrict: 'EA',
			controller: 'cmsGroupViewer',
			templateUrl: "templates/ws-cms-ext-group.html"
		};
	});
	app.controller('cmsGroupViewer',['$attrs', '$scope', function ($attrs, $scope) {
	
	$scope.groupId = $attrs.id;
	$scope.groupMaximumResults = $attrs.maximumResults;
	$scope.groupShowFeatured = $attrs.showFeatured;
	$scope.groupIncludeSiteId = $attrs.includeSiteId;
	$scope.groupFeaturedDisplayTemplate = $attrs.featuredDisplayTemplate;
	$scope.groupFeedDisplayTemplate = $attrs.feedDisplayTemplate;
	
	}]);
})();