'use strict';
angular.module('hrwtzApp')
	.directive('homeSection', [function(){
		return {
			templateUrl: "app/components/home/directives/home-section.html",
			restrict: 'A',
			scope: {
				index: '='
			},
			transclude: true,
			link: function(scope, element, attrs) {
			}
		}
	}]);