'use strict';
(function() {
	var app = angular.module('cmsMenu', []);
	
	app.directive('wsSimpleMenu', function() {
		return {
			restrict: 'EA',
			controller: 'cmsMenu',
			templateUrl: "templates/ws-cms-ext-menu.html"
		};
	});
	app.controller('cmsMenuCtrl',['$attrs', '$scope', function ($attrs, $scope) {
		$scope.menuId = $attrs.id;
		$scope.menuDisplayTemplate = $attrs.displayTemplate;
	}]);
})();