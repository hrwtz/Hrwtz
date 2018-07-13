(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.config(config);
			
	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config ($stateProvider, $urlRouterProvider) {
		// any unknown URLS go to 404
		$urlRouterProvider.otherwise('/404');

		// no route goes to index
		$urlRouterProvider.when('', '/');

		// use a state provider for routing
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'components/home/home.view.html',
				controller: 'HomeController',
				controllerAs: 'vm'
			})
			.state('resume', {
				url: '/resume',
				templateUrl: 'components/resume/resume.view.html',
			})
			.state('404go', {
				templateUrl: 'components/404/404.view.html',
			})
			.state('404', {
				url: '*path',
				templateUrl: 'components/404/404.view.html',
			});
	}
})();