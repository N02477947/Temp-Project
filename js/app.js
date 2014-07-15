'use strict';

//=======================================
// TOP LEVEL APPS
//=======================================
(function() {

// Declare all app-defined dependencies/components
var app = angular.module('cmsTestApp', [
	'ngRoute',
	'cmsExampleCalendar',
	'cmsExampleFeedViewer',
	'cmsFeedGroup',
	'cmsExampleMenu'
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

			// Set layout
			var BASE_CSS_CLASS = CMS_CONFIG.layout.baseCssClass
			console.log("CMS layout: ", BASE_CSS_CLASS);
			var templ = "<div class=\""+BASE_CSS_CLASS+"\">";

			// Add components
			for (var i=0; i<CMS_CONFIG.components.length; i++) {
				console.log("Compiling CMS component: ", CMS_CONFIG.components[i]);

				// Row tag.
				if(i%2==0) templ += "<div class=\"row\">";

				// Column tag.
				if(i%2==0) templ += "<div class=\"col1\">";
				else templ += "<div class=\"col2\">";

				// Component's open tag.
				templ += "<"+CMS_CONFIG.components[i].component;

				// Append any component parameters to HTML.
				if(CMS_CONFIG.components[i].componentParams) {
					$.each(CMS_CONFIG.components[i].componentParams, function(_key, _value) {
						// Convert key name from camelCase to hyphen-conjoined.
						_key = _key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
						// Add attribute
						templ += " "+_key+"=\""+_value+"\"" ;
						//console.log("Parameter added: "+_key+"="+_value);
					});
				}

				// Coponent's close tag.
				templ += "> </"+CMS_CONFIG.components[i].component+">";

				// Close column tag.
				templ += "</div>";
			}

			// Close row tag.
			if(i%2==0) templ += "</div>";

			// Close outer DIV.
			templ += "</div>";

			console.log("Template created: ", templ);
			$routeProvider.when('/'+(CMS_CONFIG.title.toLowerCase()), {
				title: CMS_CONFIG.title,
				template: templ
			});
		}
	});

	/*
	 * ROUTING
	 */

	// Landing page?
	$routeProvider.when('/', {
		title: 'HOME!',
		template: '<div></div>'
	});

	/*$routeProvider.when('/', {
		redirectTo: '/home'
	});*/

	$routeProvider.otherwise({
		redirectTo: '/'
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