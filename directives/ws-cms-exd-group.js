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
	
	$scope.id = $attrs.id;
	$scope.maximumResults = $attrs.maximumResults;
	$scope.showFeatured = $attrs.showFeatured;
	$scope.includeSiteId = $attrs.includeSiteId;
	$scope.featuredDisplayTemplate = $attrs.featuredDisplayTemplate;
	$scope.feedDisplayTemplate = $attrs.feedDisplayTemplate;
	
	}]);
})();