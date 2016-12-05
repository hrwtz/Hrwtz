(function () {
	'use strict';
	angular
		.module('hrwtzApp', ['ui.router', 'ngSanitize'])
		.run(runBlock);
		
	runBlock.$inject = ['$rootScope'];

	function runBlock ($rootScope) {
		// Scroll to top of page on state change, not to top of ui-view
		$rootScope.$on('$viewContentLoaded',function(){
			window.scrollTo(0,0);
		});
	}
})();