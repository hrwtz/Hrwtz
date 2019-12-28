import angular from 'angular';
import 'angular-ui-router';

import routes from './app.routes';
import sharedModule from './shared/shared.module';

angular
	.module('hrwtzApp', [
		'ui.router',
		routes,
		sharedModule
	])
	.run(runBlock);
	
runBlock.$inject = ['$rootScope'];

function runBlock ($rootScope) {
	// Scroll to top of page on state change, not to top of ui-view
	$rootScope.$on('$viewContentLoaded',function(){
		window.scrollTo(0,0);
	});
}
