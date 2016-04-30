'use strict';
angular.module('hrwtzApp')
	.controller('homeController', ['$scope', function($scope){
		// Array of sayings for typist directive
		$scope.typistSayings = [
			'I Am A Web Developer',
			'I Am A 300 Ring Owner', 
			'I Am A Professional Problem Solver', 
			'I Am A Maker of the Interwebs', 
			'I Am Based in Orlando, Florida'
		];

		// Set this to null so the directive knows that isMobile is set and to update the value
		$scope.isMobile = null;

		// Set up panelSnap jQuery plugin
		jQuery('body').panelSnap({
			directionThreshold: 25,
			panelSelector: '[home-section]',
			onSnapFinish: function($target){

            }
		});

		// On destroy, unhook panelSnap
		$scope.$on("$destroy", function(){
			jQuery('body').panelSnap('destroy');
		});

		$scope.$watch('isMobile', function (isMobile) {
			if (isMobile){
                jQuery('body').panelSnap('disable');
            }else {
                jQuery('body').panelSnap('enable');
            }
		});
		
	}]);