(function () {
	angular.module('hrwtzApp')
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

			// any unknown URLS go to 404
			$urlRouterProvider.otherwise('/404');

			// no route goes to index
			$urlRouterProvider.when('', '/');

			// use a state provider for routing
			$stateProvider
				.state('home', {
					url: "/",
					templateUrl: "app/components/home/home.view.html",
					controller: 'homeController',
				})
				.state('work', {
					url: "/work/:slug",
					templateUrl: "app/components/work.html",
					controller: 'workController',
				})
				.state('resume', {
					url: "/resume",
					templateUrl: "app/components/resume/resume.view.html",
				})
				.state('404', {
					url: "*path",
					templateUrl: "app/components/404/404.view.html",
				});
		}]);
})();