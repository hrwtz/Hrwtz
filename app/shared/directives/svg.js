(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.directive('svg', svg);

	function svg () {
		var directive = {
			templateUrl: 'shared/directives/svg.html',
			restrict: 'A',
			scope: {
				// Probably should change this to something else
				id: '@',
				title: '@?',
				fallback: '=?'
			},
			link: link
		};

		return directive;

		function link (scope, element, attrs) {
			scope.fallbackValue = scope.fallback;
			if (scope.fallbackValue === true) {
				scope.fallbackValue = scope.id;
			}
		}
	}
})();