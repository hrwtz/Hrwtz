export default unNotify;

function unNotify () {
	var directive = {
		restrict: 'A',
		scope: {
			
		},
		controller : UnNotifyController,
		link: link
	};

	UnNotifyController.$inject = ['$scope', '$rootScope', '$state'];

	return directive;

	function UnNotifyController ($scope, $rootScope, $state) {

		$scope.isHome = $state.current.name === 'home';

		$scope.go = go;

		function go (state) {
			var to = state.match(/^[^\(]+/g)[0];
			var toParams = JSON.parse(state.match(/[a-z]+\((.*?)\)/)[1]);
			var options = {
				notify: false
			};
			$state.go(to, toParams, options);
		}
	}

	function link (scope, element, attrs) {
		
		if (scope.isHome) {
			element.on('click', function (e) {
				e.preventDefault();
				scope.go(attrs.uiSref);
			});
		}

	}
}
