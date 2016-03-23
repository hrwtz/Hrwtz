'use strict';
angular.module('hrwtzApp')
	.directive('deviceFade', ['$window', function($window){
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var checkShowDevice = function() {
					var windowBottom = $window.pageYOffset + $window.innerHeight;
				    var offsetTop = element[0].getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
                    if (offsetTop < windowBottom - ($window.innerHeight * .10) ){
                        element.addClass('is-showing');
                    }
				};

				angular.element($window).bind('scroll', function() {
					checkShowDevice();
	            });
	            checkShowDevice();
			}
		}
	}]);