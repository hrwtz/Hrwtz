'use strict';
/*global angular: false */
// http://stackoverflow.com/questions/14968690/sending-event-when-angular-js-finished-loading/19686824#19686824
angular.module('hrwtzApp')
	.directive('initialisation',['$rootScope',function($rootScope) {
		return {
			restrict: 'A',
			link: function($scope) {
				var to;
				var listener = $scope.$watch(function() {
					clearTimeout(to);
					to = setTimeout(function () {
						listener();
						$rootScope.$broadcast('initialised');
					}, 50);
				});
			}
		};
	}]);