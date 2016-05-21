'use strict';
/*global angular: false */
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

		var initPanelSnap = function () {
			angular.element('body').panelSnap({
				$menu: angular.element('.navigationSide-list, .navigation-list'),
				menuSelector: 'li[data-panel]',
				directionThreshold: 25,
				panelSelector: '[home-section]'
			});

			// On destroy, unhook panelSnap
			$scope.$on("$destroy", function(){
				angular.element('body').panelSnap('destroy');
			});

			// Disable/enable panelsnap based on if screen is mobile
			$scope.$watch('isMobile', function (isMobile) {
				if (isMobile){
					angular.element('body').panelSnap('disable');
				}else {
					angular.element('body').panelSnap('enable');
				}
			});
		};

		// Set up panelSnap jQuery plugin
		$scope.$on('initialised', initPanelSnap);
		
	}]);