'use strict';
angular.module('hrwtzApp')
	.directive('homeSection', ['$window', function($window){
		return {
			templateUrl: "app/components/home/directives/home-section.html",
			restrict: 'A',
			scope: {
				index: '=',
				isMobile: '=?'
			},
			transclude: true,
			link: function(scope, element, attrs) {
				// We don't need to set the isMobile variable for every time this reference 
				// is used, just the one time it's used to grab the variable
				if (scope.isMobile !== undefined) {

					// Set isMobile variable
					var setIsMobile = function () {
						scope.isMobile = $('.cell--half').css('float') === 'none';
					};

					// Set the variable on window resize
					angular.element($window).bind('resize', function(){
						setIsMobile();
					});

					// Set the variable when the page loads as well
					setIsMobile();
				}
			}
		}
	}]);