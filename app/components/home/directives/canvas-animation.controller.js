'use strict';
angular.module('hrwtzApp')
	.controller('canvasAnimationController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout){

		// Set up isDestroyed variable to check when the controller gets destroyed
		var isDestroyed = false;
		$scope.$on('$destroy', function () {
			isDestroyed = true;
		});

		// Start the main animation loop using requestAnimFrame
		var self = {
			countAniFrame: 0,
			animloop:  function (){
				// Don't run if the controller was destroyed
				if (isDestroyed) {
					return;
				}

				// Update frame count
				self.countAniFrame++;

				// Broadcast the event so we can run update functions within our directive
				$scope.$broadcast('animationFrame', self.countAniFrame);
				
				// Recursion
				self.requestAnimFrame(self.animloop);
			},
			requestAnimFrame:  (function(){
				return  $window.requestAnimationFrame.bind(window)   || 
					$window.webkitRequestAnimationFrame.bind(window) || 
					$window.mozRequestAnimationFrame.bind(window)    || 
					$window.oRequestAnimationFrame.bind(window)      || 
					$window.msRequestAnimationFrame.bind(window)     ||  
					function( callback ){
						$timeout(function () {
							callback();
						}, 1000 / 60);
					};
			})()
		};
		return self;
		
	}]);