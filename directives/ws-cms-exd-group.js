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
	app.controller('cmsGroupViewer',function () {});
})();