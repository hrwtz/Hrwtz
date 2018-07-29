import angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize'

import routes from './app.routes';
import sharedModule from './shared/shared.module';
import homeModule from './components/home/home.module';

angular
	.module('hrwtzApp', [
		'ui.router',
		'ngSanitize',
		routes,
		sharedModule,
		homeModule
	])
	.run(runBlock);
	
runBlock.$inject = ['$rootScope'];

function runBlock ($rootScope) {
	// Scroll to top of page on state change, not to top of ui-view
	$rootScope.$on('$viewContentLoaded',function(){
		window.scrollTo(0,0);
	});
}
