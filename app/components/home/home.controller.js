'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.controller('homeController', ['$scope', '$state', 'workDataSet', function($scope, $state, workDataSet){
		// Array of sayings for typist directive
		$scope.typistSayings = [
			'I Am A Web Developer',
			'I Am A 300 Ring Owner', 
			'I Am A Professional Problem Solver', 
			'I Am A Maker of the Interwebs'
		];

		$scope.sectionTitles = ['I&nbsp;Am', 'About', 'Experience', 'Work', 'Contact'];

		$scope.works = workDataSet.getWorks();

		// Set this to null so the directive knows that isMobile is set and to update the value
		$scope.isMobile = null;

		var toggleEnablePanelSnap = function () {
			if ($scope.isMobile){
				angular.element('body').panelSnap('disable');
			}else {
				angular.element('body').panelSnap('enable');
			}
		}

		var initPanelSnap = function () {
			angular.element('body').panelSnap({
				$menu: angular.element('.navigationSide-list, .navigation-list'),
				menuSelector: 'li[data-panel]',
				directionThreshold: 25,
				panelSelector: '[home-section]',
				onSnapFinish: function ($target) {
					if ($scope.isMobile) {
						return;
					}
					var homePage = $scope.isMobile || $target.index() == 0 ? '' : $target.attr('data-panel').toLowerCase();
					$state.go('home', {
						page: homePage
					}, {
						notify: false
					});
				}
			});

			// On destroy, unhook panelSnap
			$scope.$on("$destroy", function(){
				angular.element('body').panelSnap('destroy');
			});

			// Disable/enable panelsnap based on if screen is mobile
			$scope.$watch('isMobile', toggleEnablePanelSnap);

			toggleEnablePanelSnap();

		};

		// Set up panelSnap jQuery plugin
		$scope.$on('initialised', initPanelSnap);
		
	}]);