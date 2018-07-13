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
				isWorkSection: '=?',
				sectionTitles: '='
			},
			transclude: true,
			controller: homeSectionController
		};

		homeSectionController.$inject = ['$scope', '$stateParams'];

		return directive;

		function homeSectionController ($scope, $stateParams) {
			$scope.pageParam = $stateParams.page;
		}
	}
})();