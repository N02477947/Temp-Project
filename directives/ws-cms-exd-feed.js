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
	app.controller('cmsFeed',function () {});
})();