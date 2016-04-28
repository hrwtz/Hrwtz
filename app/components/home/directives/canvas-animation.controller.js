'use strict';
angular.module('hrwtzApp')
	.controller('canvasAnimationController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout){

	    // Start the main animation loop using requestAnimFrame
	    var self = {};
    	self.countAniFrame =  0;
    	self.animloop =  function(){
	        // Update frame count
	        self.countAniFrame++;

	        // Broadcast the event so we can run update functions within our directive
			$scope.$broadcast('animationFrame', self.countAniFrame);
	        
	        // Recursion
	        self.requestAnimFrame(self.animloop);

	    };
	    self.requestAnimFrame =  (function(){
	    	return  $window.requestAnimationFrame.bind(window)       || 
	                $window.webkitRequestAnimationFrame.bind(window) || 
	                $window.mozRequestAnimationFrame.bind(window)    || 
	                $window.oRequestAnimationFrame.bind(window)      || 
	                $window.msRequestAnimationFrame.bind(window)     ||  
	                function( callback ){
	                    $window.setTimeout(function(){
	                        callback();
	                    }, 1000 / 60);
	                };
	    })();
	    return self;
		
	}]);