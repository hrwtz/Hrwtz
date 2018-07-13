(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', '$window'];

	function HomeController ($scope, $state, $window) {
		/*jshint validthis: true */
		
		var vm = this;

		vm.sectionTitles = [0,1,2,3,4];

		// Set this to null so the directive knows that isMobile is set and to update the value
		vm.isMobile = null;

		// Set up panelSnap jQuery plugin
		$scope.$on('initialised', initPanelSnap);

		function initPanelSnap () {
			angular.element('body').panelSnap({
				$menu: angular.element('.navigationSide-list, .navigation-list'),
				menuSelector: 'li[data-panel]',
				directionThreshold: 25,
				panelSelector: '[home-section]'
			});

			// On destroy, unhook panelSnap
			$scope.$on('$destroy', function(){
				angular.element('body').panelSnap('destroy');
			});

			// Disable/enable panelsnap based on if screen is mobile
			angular.element($window).bind('resize', toggleEnablePanelSnap);
			toggleEnablePanelSnap();
		}

		function toggleEnablePanelSnap() {
			vm.isMobile = angular.element('body').css('overflow') === 'auto';
			var panelAction = vm.isMobile ? 'disable' : 'enable';
			angular.element('body').panelSnap(panelAction);
		}
	}
})();