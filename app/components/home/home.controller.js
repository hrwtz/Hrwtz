import PanelSnap from 'panelsnap';

export default HomeController;

HomeController.$inject = ['$element', '$scope', '$state', '$window', 'animationsTriggeredService'];

function HomeController ($element, $scope, $state, $window, animationsTriggeredService) {
	/*jshint validthis: true */
	
	var vm = this,
		panelsSnapInstance,
		inDigestCycle;

	vm.onPanelSelect = onPanelSelect;

	vm.container = $element;

	vm.sectionTitles = [0,1,2,3];

	// Set this to null so the directive knows that isMobile is set and to update the value
	vm.isMobile = null;

	// Set up panelSnap jQuery plugin
	$scope.$on('initialised', initPanelSnap);

	$scope.$on('$destroy', function(){
		animationsTriggeredService.triggered = [];
		panelsSnapInstance && panelsSnapInstance.disable();
		angular.element($window).off('resize', toggleEnablePanelSnap);
	});

	function onPanelSelect(index) {
		var element = document.querySelectorAll('[home-section]')[index];

		inDigestCycle = true;
		panelsSnapInstance.snapToPanel(element);
	}

	function initPanelSnap () {
		// Set the panel, set up the menu manually, store instance somewhere so we can
		// visit the home page multiple times without getting an error
		panelsSnapInstance = new PanelSnap({
			container: $element[0],
			directionThreshold: 25,
			panelSelector: '[home-section]'
		});

		panelsSnapInstance.on('activatePanel', function (panelItem) {
			vm.activeSection = angular.element(panelItem).isolateScope().index;
			if (!inDigestCycle) {
				$scope.$apply();
			}
			inDigestCycle = false;
		});

		// Disable/enable panelsnap based on if screen is mobile
		angular.element($window).bind('resize', toggleEnablePanelSnap);
		toggleEnablePanelSnap();
	}

	function toggleEnablePanelSnap() {
		vm.isMobile = getComputedStyle(document.body).overflow === 'auto';

		if (vm.isMobile) {
			panelsSnapInstance.disable();
		} else {
			panelsSnapInstance.enable();
		}
	}
}
