(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.directive('homeSection', homeSection);

	homeSection.$inject = ['$window'];

	function homeSection ($window) {
		var directive = {
			templateUrl: 'components/home/directives/home-section.html',
			restrict: 'A',
			scope: {
				index: '=',
				isMobile: '=?',
				isWorkSection: '=?',
				sectionTitles: '='
			},
			transclude: true,
			controller: homeSectionController,
			link: link
		};

		homeSectionController.$inject = ['$scope', '$stateParams'];

		return directive;

		function link (scope, element, attrs) {
			// We don't need to set the isMobile variable for every time this reference 
			// is used, just the one time it's used to grab the variable
			if (scope.isMobile !== undefined) {

				// Set the variable on window resize
				angular.element($window).bind('resize', setIsMobile);

				// Set the variable when the page loads as well
				setIsMobile();
			}

			function setIsMobile () {
				scope.isMobile = element.children().children('.cell--half').css('float') === 'none';
			}
		}

		function homeSectionController ($scope, $stateParams) {
			$scope.pageParam = $stateParams.page;
		}
	}
})();