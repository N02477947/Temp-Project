'use strict';
(function() {
	var app = angular.module('cmsExampleMenu', [])
	
	app.directive('wsSimpleMenu', function() {
		return {
			restrict: 'EA',
			controller: 'cmsMenu',
			templateUrl: "templates/ws-cms-ext-menu.html"
		};
	});
	app.controller('cmsMenu',function () {});
})();