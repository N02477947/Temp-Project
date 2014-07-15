'use strict';
(function() {
	var app = angular.module('cmsExampleCalendar', [])
	
	app.directive('cmsTempCalendar', function() {
		return {
			restrict: 'EA',
			controller: 'cmsCalendar',
			templateUrl: "templates/ws-cms-ext-calendar.html"
		};
	})
	app.controller('cmsCalendar',function () {}
})();