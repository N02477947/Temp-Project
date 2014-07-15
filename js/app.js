'use strict';

//=======================================
// TOP LEVEL APPS
//=======================================
(function() {

// Declare all app-defined dependencies/components
var app = angular.module('cmsTestApp', [
	'cmsExampleCalendar',
	'ngRoute'/*,
	'ngStorage',
	'ui.bootstrap'*/
]);

// Configure page.
app.config(['$routeProvider', function($routeProvider) {
	console.log("CMS Test App is being configured.");
	/*
	 * CMS TEMPLATE CONFIGURATION
	 */
	var CMS_CONFIG = null;
	$.ajax({
		async: false,
		global: false,
		url: "home.json",
		dataType: "json",
		success: function(data) {
			CMS_CONFIG = data;
			console.log("CMS data loaded: ", CMS_CONFIG);
			/*for (var i=0; i<CMS_CONFIG.pages.length; i++) {
				console.log("Compiling CMS page: ", CMS_CONFIG.pages[i]);
				var templ = top;
				for (var j=0; j<CMS_CONFIG.pages[i].content.length; j++){
					console.log("Adding module: ", CMS_CONFIG.pages[i].content[j].module);
					templ = templ+"<"+CMS_CONFIG.pages[i].content[j].module;
					if (CMS_CONFIG.pages[i].content[j].parameters) {
						//appending parameters to html
						$.each(CMS_CONFIG.pages[i].content[j].parameters, function(key, value) {
							templ = templ+" "+key+"=\""+value+"\"" ;
							console.log("Parameter added: "+key+"="+value);
						});
					}
					templ = templ+"> </"+CMS_CONFIG.pages[i].content[j].module+">";
				}
				console.log("Template created: ", templ);
				$routeProvider.when('/'+CMS_CONFIG.pages[i].title, {
					template: templ
				});            	
			}*/
		}
	});

	/*
	 * ROUTING
	 */

	$routeProvider.when('/home', {
		title: CMS_CONFIG.title,
		template: '<div></div>'
	});

	/*$routeProvider.when('/', {
		redirectTo: '/home'
	});*/

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);

app.run(['$location', '$rootScope', function($location, $rootScope) {
	console.log("CMS Test App is running.");
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        try { $rootScope.title = current.$$route.title; }
        catch(TypeError) {}
    });
}]);

app.controller('cmsTestController', ['$scope', function($scope) {
	console.log("CMS Test App controller is active.");
	// ...
}]);

})();