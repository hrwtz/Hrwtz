'use strict';
angular.module('hrwtzApp')
	.directive('svg', [function(){
		return {
			templateUrl: "shared/directives/svg.html",
			restrict: 'A',
			scope: {
				// Probably should change this to something else
				id: '@',
				title: '@?',
				fallback: '=?'
			},
			link: function(scope, element, attrs) {
				scope.fallbackValue = scope.fallback;
				if (scope.fallbackValue === true) {
					scope.fallbackValue = scope.id;
				}
			}
		}
	}]);