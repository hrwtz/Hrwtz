'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.directive('hoverAll', [function(){
		return {
			restrict: 'A',
			controller : ['$scope', '$rootScope', function($scope, $rootScope) {
				$scope.broadcastHover = function(isHover) {
					$rootScope.$broadcast('hoverAll', {
						index: $scope.$index,
						isHover: isHover
					});
				};

				$rootScope.$on('hoverAll', function (event, data) {
					$scope.changeHoverClass(data);
				});
			}],
			link: function(scope, element, attrs) {
				element.on('mouseover', function () {
					scope.broadcastHover(true);
				});

				element.on('mouseout', function () {
					scope.broadcastHover(false);
				});

				scope.changeHoverClass = function (data) {
					if (data.index === scope.$index) {
						if (data.isHover) {
							element.addClass('is-hover');
						} else {
							element.removeClass('is-hover');
						}
					}
				}
			}
		};
	}]);