(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.directive('deviceFade', deviceFade);

	deviceFade.$inject = ['$window', '$timeout'];

	function deviceFade ($window, $timeout) {
		var directive = {
			restrict: 'A',
			link: link
		};

		return directive;
		
		function link (scope, element, attrs) {
			
			angular.element($window).bind('scroll', checkShowDevice);

			$timeout(checkShowDevice);

			function checkShowDevice () {
				var windowBottom = $window.pageYOffset + $window.innerHeight;
				var elementTopPosition = element[0].getBoundingClientRect().top;
				var offsetTop = elementTopPosition + window.pageYOffset - document.documentElement.clientTop;
				if (offsetTop < windowBottom - ($window.innerHeight * 0.10) ){
					element.addClass('is-showing');
				}
			}
		}
	}
})();