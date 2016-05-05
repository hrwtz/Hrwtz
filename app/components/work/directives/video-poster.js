'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.directive('videoPoster', ['$window', function($window){
		return {
			restrict: 'A',
			priority: 99,
			link: function(scope, element, attrs) {
				attrs.$observe('videoPoster', function(value) {
					if (!value) {
						return;
					}
					attrs.$set('poster', value);
				});
			}
		};
	}]);