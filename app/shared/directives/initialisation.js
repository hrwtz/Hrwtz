(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.directive('initialisation', initialisation);

	initialisation.$inject = ['$rootScope', '$timeout'];

	// http://stackoverflow.com/questions/14968690/sending-event-when-angular-js-finished-loading/19686824#19686824
	function initialisation ($rootScope, $timeout) {
		var directive = {
			restrict: 'A',
			link: link
		};

		return directive;

		function link (scope, element, attrs) {
			var to;
			var listener = scope.$watch(function() {
				clearTimeout(to);
				to = setTimeout(function () {
					listener();
					$rootScope.$broadcast('initialised');
				}, 50);
			});
		}
	}
})();