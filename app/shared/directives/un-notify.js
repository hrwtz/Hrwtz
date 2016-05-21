'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.directive('unNotify', [function(){
		return {
			restrict: 'A',
			scope: {
				
			},
			controller : ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
				$scope.isHome = $state.current.name === 'home';

				$scope.go = function (state) {
					var to = state.match(/^[^\(]+/g)[0];
					var toParams = JSON.parse(state.match(/[a-z]+\((.*?)\)/)[1]);
					var options = {
						notify: false
					};
					$state.go(to, toParams, options);
				};
			}],
			link: function(scope, element, attrs) {
				if (scope.isHome) {
					element.on('click', function (e) {
						e.preventDefault();
						scope.go(attrs.uiSref);
					});
				}
			}
		};
	}]);