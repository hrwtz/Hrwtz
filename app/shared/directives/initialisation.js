export default initialisation;

initialisation.$inject = ['$parse', '$rootScope', '$timeout'];

// http://stackoverflow.com/questions/14968690/sending-event-when-angular-js-finished-loading/19686824#19686824
function initialisation ($parse, $rootScope, $timeout) {
	var directive = {
		restrict: 'A',
		link: link
	};

	return directive;

	function link (scope, element, attrs) {
		var to,
			listener,
			called;

		if ($parse(attrs.initialisation)(scope)) {
			listener = scope.$watch(sendEvent);
		}

		function sendEvent() {
			clearTimeout(to);
			to = $timeout(function () {
				if (called) {
					return;
				}
				listener();
				$rootScope.$broadcast('initialised');
				called = true;
			}, 50);
		}
	}
}