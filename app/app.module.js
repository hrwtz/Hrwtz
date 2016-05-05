'use strict';
/*global angular: false */
angular
	.module('hrwtzApp', ['ui.router'])
	.run(['$rootScope', function ($rootScope) {
		// Scroll to top of page on state change, not to top of ui-view
		$rootScope.$on('$viewContentLoaded',function(){
			window.scrollTo(0,0);
		});
	}]);