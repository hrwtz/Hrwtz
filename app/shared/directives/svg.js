'use strict';
angular.module('hrwtzApp')
	.directive('svg', [function(){
		return {
			templateUrl: "app/shared/directives/svg.html",
			restrict: 'A',
			scope: {
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