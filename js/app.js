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
	var CMS_CONFIG = null;
	var CMS_LAYOUTS = null;

	/*
	 * CMS LAYOUTS
	 */
	(function getLayouts() {
		$.ajax({
			async: false,
			global: false,
			url: "json/layouts.json",
			dataType: "json",
			success: function(data) {
				CMS_LAYOUTS = data;
				console.log("Success retrieving layout data!\n", CMS_LAYOUTS);
				getTemplate();
			},
			error: function(error) {
				console.error("Could not retrieve layout data!");
			}
		});
	})();

	/*
	 * CMS TEMPLATE CONFIGURATION
	 */
	function getTemplate() {
		return $.ajax({
			async: false,
			global: false,
			url: "home.json",
			dataType: "json",
			success: function(data) {
				CMS_CONFIG = data;
				console.log("CMS data loaded: ", CMS_CONFIG);

				// Set layout
				var BASE_CSS_CLASS = CMS_CONFIG.layout.baseCssClass/*"four-row"*/
				console.log("CMS layout: ", BASE_CSS_CLASS);
				var templ = "<div class=\""+BASE_CSS_CLASS+" container-fluid\">";

				// Add first row tags.
				console.log("CMS row added.");
				templ += "<div class=\"row\"><div class=\"row-content\">";

				// Add component(s).
				var row = 0;
				var col = 0;
				for(var i = 0; i < CMS_CONFIG.components.length; i++) {

					// Column tags.
					console.log("CMS col-md-"+CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column[col].weight+" added.");
					templ += "<div class=\"col-md-" + CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column[col].weight + "\">"
						+ "<div class=\"column-content\">";

					console.log("Compiling CMS component: ", CMS_CONFIG.components[i]);

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

					// Component's close tag.
					templ += "></"+CMS_CONFIG.components[i].component+">";

					// Close column tags.
					console.log("CMS col-md-"+CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column[col].weight+" closed.");
					templ += "</div></div>";

					// Determine new row/col.
					if(++col == CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column.length) {
						row++;
						col = 0;

						// Close row tag.
						console.log("CMS row closed.");
						templ += "</div></div>";

						// Add next row tag.
						if(i < CMS_CONFIG.components.length - 1) {
							console.log("CMS row added.");
							templ += "<div class=\"row\"><div class=\"row-content\">";
						}
					}
				}

				// Close outer DIV.
				templ += "</div>";

				console.log("Template created: ", templ);
				$routeProvider.when('/'+(CMS_CONFIG.title.toLowerCase()), {
					title: CMS_CONFIG.title,
					template: templ
				});
			},
			error: function(error) {
				console.error("Could not retrieve template data!");
			}
		});
	}

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