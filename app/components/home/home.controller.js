(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'workDataSet'];

	function HomeController ($scope, $state, workDataSet) {
		/*jshint validthis: true */
		
		var vm = this;

		// Array of sayings for typist directive
		vm.typistSayings = [
			'I Am A Web Developer',
			'I Am A 300 Ring Owner', 
			'I Am A Professional Problem Solver', 
			'I Am A Maker of the Interwebs'
		];

		vm.sectionTitles = ['I&nbsp;Am', 'About', 'Experience', 'Work', 'Contact'];

		vm.works = workDataSet.getWorks();

		// Set this to null so the directive knows that isMobile is set and to update the value
		vm.isMobile = null;

		// Set up panelSnap jQuery plugin
		$scope.$on('initialised', initPanelSnap);

		function initPanelSnap () {
			angular.element('body').panelSnap({
				$menu: angular.element('.navigationSide-list, .navigation-list'),
				menuSelector: 'li[data-panel]',
				directionThreshold: 25,
				panelSelector: '[home-section]',
				onSnapFinish: finishPanelSnap
			});

			// On destroy, unhook panelSnap
			$scope.$on('$destroy', function(){
				angular.element('body').panelSnap('destroy');
			});

			// Disable/enable panelsnap based on if screen is mobile
			$scope.$watch('vm.isMobile', toggleEnablePanelSnap);

			toggleEnablePanelSnap();

		}

		function finishPanelSnap ($target) {
			if (vm.isMobile) {
				return;
			}
			var homePage = vm.isMobile || $target.index() === 0 ? '' : $target.attr('data-panel').toLowerCase();
			$state.go('home', {
				page: homePage
			}, {
				notify: false
			});
		}

		function toggleEnablePanelSnap () {
			var panelAction = vm.isMobile ? 'disable' : 'enable';
			angular.element('body').panelSnap(panelAction);
		}
	}
})();