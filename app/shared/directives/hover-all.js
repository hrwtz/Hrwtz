(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.directive('hoverAll', hoverAll);

	function hoverAll () {
		var directive = {
			restrict: 'A',
			controller : HoverAllController,
			link: link
		};

		HoverAllController.$inject = ['$scope', '$rootScope'];

		return directive;

		function HoverAllController ($scope, $rootScope) {
			$scope.broadcastHover = broadcastHover;

			$rootScope.$on('hoverAll', function (event, data) {
				$scope.changeHoverClass(data);
			});

			function broadcastHover (isHover) {
				$rootScope.$broadcast('hoverAll', {
					index: $scope.$index,
					isHover: isHover
				});
			}
		}

		function link (scope, element, attrs) {
			scope.changeHoverClass = changeHoverClass;

			element.on('mouseover', function () {
				scope.broadcastHover(true);
			});

			element.on('mouseout', function () {
				scope.broadcastHover(false);
			});

			function changeHoverClass (data) {
				if (data.index === scope.$index) {
					if (data.isHover) {
						element.addClass('is-hover');
					} else {
						element.removeClass('is-hover');
					}
				}
			}
		}
	}
})();