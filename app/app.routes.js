'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		// any unknown URLS go to 404
		$urlRouterProvider.otherwise('/404');

		// no route goes to index
		$urlRouterProvider.when('', '/');

		// use a state provider for routing
		$stateProvider
			.state('home', {
				url: "/{page: about|skills|work|contact}",
				templateUrl: "components/home/home.view.html",
				controller: 'homeController',
			})
			.state('work', {
				url: "/work/:slug",
				templateUrl: "components/work/work.view.html",
				controller: 'workController',
			})
			.state('resume', {
				url: "/resume",
				templateUrl: "components/resume/resume.view.html",
			})
			.state('404go', {
				templateUrl: "components/404/404.view.html",
			})
			.state('404', {
				url: "*path",
				templateUrl: "components/404/404.view.html",
			});
	}]);