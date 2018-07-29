export default nav;

function nav () {
	var directive = {
		template: require('./nav.html'),
		restrict: 'A',
		scope: {
			inverse: '=',
			colorIndex: '='
		},
		controller : NavController,
		link: link
	};

	NavController.$inject = ['$scope', '$rootScope'];

	return directive;

	function NavController ($scope, $rootScope) {
		$scope.toggleMenu = toggleMenu;

		$rootScope.$on('toggle_menu', flipNavigationStatus);

		function toggleMenu () {
			$rootScope.$broadcast('toggle_menu');
		}

		function flipNavigationStatus () {
			$scope.isNavigationOpen = !$scope.isNavigationOpen;
		}
	}

	function link (scope, element, attrs) {
		// Set up classes for links
		if (scope.inverse === true ? (scope.colorIndex % 2 === 0) : (scope.colorIndex % 2)) {
			scope.listClass = 'bc' + scope.colorIndex;
			scope.textLinkClass = 'navigation-item-link--tcr';
			scope.hamburgerLinkClass = 'bcr navigation-button--bc' + scope.colorIndex;
			scope.logoClass = 'bc' + scope.colorIndex + ' navigation-button--bcr';
		} else {
			scope.listClass = 'bcr';
			scope.textLinkClass = 'navigation-item-link--tc' + scope.colorIndex;
			scope.hamburgerLinkClass = 'bc' + scope.colorIndex + ' navigation-button--bcr';
			scope.logoClass = 'bcr navigation-button--bc' + scope.colorIndex;
		}
	}
}
