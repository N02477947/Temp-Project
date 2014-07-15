'use strict';
(function() {
	var app = angular.module('cmsExampleCalendar', [])
	
	app.directive('feedCalendarViewer', function() {
		return {
			restrict: 'EA',
			controller: 'cmsCalendar',
			templateUrl: "templates/ws-cms-ext-calendar.html"
		};
	});
	app.controller('cmsCalendar', ['$attrs', '$scope', function ($attrs, $scope) {
	
	$scope.calTitle=$attrs.title;
	$scope.calDisplayTemplate = $attrs.displayTemplate;
	
	}]);
})();