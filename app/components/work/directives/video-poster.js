(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.directive('videoPoster', videoPoster);

	videoPoster.$inject = ['$window'];

	function videoPoster ($window) {
		var directive = {
			restrict: 'A',
			priority: 99,
			link: link
		};	

		return directive;

		function link (scope, element, attrs) {
			
			attrs.$observe('videoPoster', setPosterAttr);

			function setPosterAttr (newVal) {
				if (!newVal) {
					return;
				}
				attrs.$set('poster', newVal);
			}
		}
	}
})();