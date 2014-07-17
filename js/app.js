'use strict';

//=======================================
// TOP LEVEL APPS
//=======================================
(function() {

// Declare all app-defined dependencies/components
var app = angular.module('cmsTestApp', [
	'ngRoute',
	'cmsCalendar',
	'cmsFeedViewer',
	'cmsFeedGroup',
	'cmsMenu',
	'cmsQuicklinks'
]);

// Configure page.
app.config(['$routeProvider', function($routeProvider) {
	console.log("CMS Test App is being configured.");

	// Default Home Page
	$routeProvider.when('/', {
		title: 'HOME!',
		template: 	'<div>' + 
						'<center>This is the HOME page!</center><br><br>' +
						'Try the below test links:<br>' +
						'<a href="#/site/TEST/page/home">#/site/TEST/page/home</a><br>' +
						'<a href="#/site/TEST/page/28"  >#/site/TEST/page/28</a><br>' +
						'<a href="#/site/TEST/page/"    >#/site/TEST/page/</a><br>' +
					'</div>'
	});

	// Site-level Routing
	$routeProvider.when('/site/:SITE_ID', {
		title: 'SITE!',
		template: 	'<cms-site>' + 
						'Site ID: {{SITE_ID || "n/a"}}<br>' +
					'</cms-site>',
		controller: 'cmsAppController'
	});
	$routeProvider.when('/site/', {
		title: 'SITE!',
		template: 	'<cms-site>' + 
						'Site ID: {{SITE_ID || "n/a"}}<br>' +
						'This is the SITE with no parameter!' +
					'</cms-site>',
		controller: 'cmsAppController'
	});

	// Page-level Routing
	$routeProvider.when('/site/:SITE_ID/page/:PAGE_ID', {
		title: 'PAGE!',
		template: 	'<cms-site>' + 
						'Site ID: {{SITE_ID}}<br>' +
						'<cms-page>' + 
							'Page ID: {{PAGE_ID}}<br>' +
						'</cms-page>' + 
					'</cms-site>',
		controller: 'cmsAppController'
	});
	$routeProvider.when('/site/:SITE_ID/page/', {
		title: 'PAGE!',
		template: 	'<cms-site>' + 
						'Site ID: {{SITE_ID}}<br>' +
						'<cms-page>' + 
							'Page ID: {{PAGE_ID || "n/a"}}<br>' +
							'This is the PAGE with no parameter!' +
						'</cms-page>' + 
					'</cms-site>',
		controller: 'cmsAppController'
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});

}]);

app.directive('cmsSite', ['$location', '$routeParams', function($location, $routeParams) {
	return {
		restrict: 'EA',
		transclude: true,
		template: function() {
			var CMS_SITE_CONFIG = null;
			var CMS_SITE_TEMPLATE = "";

			// Get container
			var CONTAINER = ((($location.absUrl()).split('#')[0]).split('.htm')[0]).split('/');
			CONTAINER = CONTAINER[CONTAINER.length-2];
			//console.log("CONTAINER: ", CONTAINER);

			// Route parameters
			var SITE_ID = $routeParams.SITE_ID;
			//console.log("SITE_ID: ", SITE_ID);

			$.ajax({
				async: false,
				global: false,
				url: "json/site.json",
				dataType: "json",
				success: function(data) {
					CMS_SITE_CONFIG = data;
					console.log("CMS site data loaded: ", CMS_SITE_CONFIG);

					/*
					 * SITE HEADER
					 */
					if(CMS_SITE_CONFIG.header.display == true) {
						CMS_SITE_TEMPLATE += "<div class=\"cmsHeader container-fluid\">";
						// Do stuff here...
						CMS_SITE_TEMPLATE += "<center><h1>This is the Header!</h1></center><hr>";
						CMS_SITE_TEMPLATE += CMS_SITE_CONFIG.header.content;
						// ................
						CMS_SITE_TEMPLATE += "</div>";

						/*
						 * SITE MENU
						 */
						if(CMS_SITE_CONFIG.header.type == 'html-and-menu-composite') {
							if(CMS_SITE_CONFIG.header.menu.display == true) { // <-- Redundant check?
								CMS_SITE_TEMPLATE += "<div class=\"cmsMenu container-fluid\">";
								// Do stuff here...
								CMS_SITE_TEMPLATE += "<center><h3>This is the Menu!</h3></center><hr>";

								// Menu's open tag.
								CMS_SITE_TEMPLATE += "<"+CMS_SITE_CONFIG.header.menu.component;

								// Append any menu parameters to HTML.
								if(CMS_SITE_CONFIG.header.menu.componentParams) {
									$.each(CMS_SITE_CONFIG.header.menu.componentParams, function(_key, _value) {
										// Convert key name from camelCase to hyphen-conjoined.
										_key = _key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
										_value = JSON.stringify(_value) + "";
										// Clean value for JSON.stringify()
										try{
											if(_value.slice(0, 1) == "\"")
												_value = _value.slice(1, _value.length-1);
										    if(_value.slice(_value.length-2, _value.length-1) == "\"")
												_value = _value.slice(0, _value.length-1);
										}
										catch(TypeError) { console.warn("Parameter couldn't be cleaned.", TypeError); }
										// Stringify and encode value.
										_value = encodeURIComponent(_value);
										// Add attribute
										CMS_SITE_TEMPLATE += " "+_key+"=\""+_value+"\"" ;
										//console.log("Parameter added: "+_key+" = "+_value);
									});
								}

								// Menu's close tag.
								CMS_SITE_TEMPLATE += "></"+CMS_SITE_CONFIG.header.menu.component+">";

								// ................
								CMS_SITE_TEMPLATE += "</div>";
							}
						}
					}

					/*
					 * SITE CONTENT
					 */
					CMS_SITE_TEMPLATE += "<div class=\"cmsContent container-fluid\">";
					// Do stuff here...
					CMS_SITE_TEMPLATE += "<center><h4>This is the Content!</h4></center><hr>";
					CMS_SITE_TEMPLATE += "<div ng-transclude></div>";
					// ................
					CMS_SITE_TEMPLATE += "</div>";

					/*
					 * SITE FOOTER
					 */
					if(CMS_SITE_CONFIG.footer.display == true) {
						CMS_SITE_TEMPLATE += "<div class=\"cmsFooter container-fluid\">";
						// Do stuff here...
						CMS_SITE_TEMPLATE += "<center><h5>This is the Footer!</h5></center><hr>";
						CMS_SITE_TEMPLATE += CMS_SITE_CONFIG.footer.content;
						// ................
						CMS_SITE_TEMPLATE += "</div>";
					}

					//console.log("Site created: ", CMS_SITE_TEMPLATE);

					/*$routeProvider.when('/'+(CMS_SITE_CONFIG.title.toLowerCase()), {
						//title: CMS_SITE_CONFIG.title,
						template: CMS_SITE_TEMPLATE,
						controller: 'cmsAppController'
					});
					$routeProvider.when('/site/'+(CMS_SITE_CONFIG.section), {
						title: CMS_SITE_CONFIG.title,
						template: CMS_SITE_TEMPLATE,
						controller: 'cmsAppController'
					});
					$routeProvider.when('/site/'+(CMS_SITE_CONFIG.id), {
						title: CMS_SITE_CONFIG.title,
						template: CMS_SITE_TEMPLATE,
						controller: 'cmsAppController'
					});*/
				},
				error: function(error) {
					console.error("Could not retrieve site data!");
					CMS_SITE_TEMPLATE = '<br>The SITE with this parameter does not exist!';
				}
			});

			return CMS_SITE_TEMPLATE;
		}/*,
		controller: 'cmsBodyController'*/
	}
}]);

app.directive('cmsPage', ['$routeParams', function($routeParams) {
	return {
		restrict: 'EA',
		transclude: true,
		template: function() {
			var CMS_LAYOUTS = null;
			var CMS_PAGE_CONFIG = null;
			var CMS_PAGE_TEMPLATE = "";

			// Route parameters
			var SITE_ID = $routeParams.SITE_ID;
			var PAGE_ID = $routeParams.PAGE_ID;
			//console.log("PAGE_ID: ", PAGE_ID);

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
						//console.log("Success retrieving layout data!\n", CMS_LAYOUTS);
					},
					error: function(error) {
						console.error("Could not retrieve layout data!");
					}
				});
			})();

			$.ajax({
				async: false,
				global: false,
				url: "json/home.json",
				dataType: "json",
				success: function(data) {
					CMS_PAGE_CONFIG = data;
					console.log("CMS page data loaded: ", CMS_PAGE_CONFIG);

					// Set layout
					var BASE_CSS_CLASS = CMS_PAGE_CONFIG.layout.baseCssClass;
					//console.log("CMS layout: ", BASE_CSS_CLASS);
					CMS_PAGE_TEMPLATE += "<div class=\""+BASE_CSS_CLASS+" container-fluid\">";

					// DEBUG TRANSCLUSION
					CMS_PAGE_TEMPLATE += "<div ng-transclude></div>";

					// Add first row tags.
					CMS_PAGE_TEMPLATE += "<div class=\"row\"><div class=\"row-content\">";
					//console.log("CMS row added.");

					// Add component(s).
					var row = 0;
					var col = 0;
					for(var i = 0; i < CMS_PAGE_CONFIG.components.length; i++) {

						// Column tags.
						CMS_PAGE_TEMPLATE += "<div class=\"col-md-" + CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column[col].weight + "\">"
							+ "<div class=\"column-content\">";
						//console.log("CMS col-md-"+CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column[col].weight+" added.");

						//console.log("Compiling CMS component: ", CMS_PAGE_CONFIG.components[i]);

						// Component's open tag.
						CMS_PAGE_TEMPLATE += "<"+CMS_PAGE_CONFIG.components[i].component;

						// Append any component parameters to HTML.
						if(CMS_PAGE_CONFIG.components[i].componentParams) {
							$.each(CMS_PAGE_CONFIG.components[i].componentParams, function(_key, _value) {
								// Convert key name from camelCase to hyphen-conjoined.
								_key = _key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
								_value = JSON.stringify(_value) + "";
								// Clean value for JSON.stringify()
								try{
									if(_value.slice(0, 1) == "\"")
										_value = _value.slice(1, _value.length-1);
								    if(_value.slice(_value.length-2, _value.length-1) == "\"")
										_value = _value.slice(0, _value.length-1);
								}
								catch(TypeError) { console.warn("Parameter couldn't be cleaned.", TypeError); }
								// Stringify and encode value.
								_value = encodeURIComponent(_value);
								// Add attribute
								CMS_PAGE_TEMPLATE += " "+_key+"=\""+_value+"\"" ;
								//console.log("Parameter added: "+_key+" = "+_value);
							});
						}

						// Component's close tag.
						CMS_PAGE_TEMPLATE += "></"+CMS_PAGE_CONFIG.components[i].component+">";

						// Close column tags.
						CMS_PAGE_TEMPLATE += "</div></div>";
						//console.log("CMS col-md-"+CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column[col].weight+" closed.");

						// Determine new row/col.
						if(++col == CMS_LAYOUTS[BASE_CSS_CLASS].row[row].column.length) {
							row++;
							col = 0;

							// Close row tag.
							CMS_PAGE_TEMPLATE += "</div></div>";
							//console.log("CMS row closed.");

							// Add next row tag.
							if(i < CMS_PAGE_CONFIG.components.length - 1) {
								CMS_PAGE_TEMPLATE += "<div class=\"row\"><div class=\"row-content\">";
								//console.log("CMS row added.");
							}
						}
					}

					// Close outer DIV.
					CMS_PAGE_TEMPLATE += "</div>";

					//console.log("Template created: ", CMS_PAGE_TEMPLATE);

					/*$routeProvider.when('/'+(CMS_PAGE_CONFIG.title.toLowerCase()), {
						//title: CMS_PAGE_CONFIG.title,
						template: CMS_PAGE_TEMPLATE,
						controller: 'cmsAppController'
					});* /
					$routeProvider.when('/site/:SITE_ID/page/'+(CMS_PAGE_CONFIG.title.toLowerCase()), {
						title: CMS_PAGE_CONFIG.title,
						template: CMS_PAGE_TEMPLATE,
						controller: 'cmsAppController'
					});
					$routeProvider.when('/site/:SITE_ID/page/'+(CMS_PAGE_CONFIG.id), {
						title: CMS_PAGE_CONFIG.title,
						template: CMS_PAGE_TEMPLATE,
						controller: 'cmsAppController'
					});*/
				},
				error: function(error) {
					console.error("Could not retrieve template data!");
					CMS_PAGE_TEMPLATE = '<br>The PAGE with this parameter does not exist!';
				}
			});

			return CMS_PAGE_TEMPLATE;
		}
	}
}]);

app.run(['$location', '$rootScope', function($location, $rootScope) {
	console.log("CMS Test App is running.");
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        try { $rootScope.title = current.$$route.title; }
        catch(TypeError) {}
    });
}]);

app.controller('cmsAppController', ['$scope', '$routeParams', function($scope, $routeParams) {
	console.log("CMS Test App controller is active.");
	// ...
	$scope.SITE_ID = $routeParams.SITE_ID;
	$scope.PAGE_ID = $routeParams.PAGE_ID;
}]);

/*app.controller('cmsBodyController', ['$scope', '$routeParams', function($scope, $routeParams) {
	// ...
}]);*/

})();