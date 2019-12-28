export default angular
	.module('hrwtzApp.routes', [])
	.config(routes)
	.name;

routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

function routes ($locationProvider, $stateProvider, $urlRouterProvider) {
	// any unknown URLS go to 404
	$urlRouterProvider.otherwise('/404');

	// no route goes to index
	$urlRouterProvider.when('', '/');

	// use a state provider for routing
	$stateProvider
		.state('home', {
			url: '/',
			template: require('./components/home.view.html'),
		})
		.state('resume', {
			url: '/resume',
			template: require('./components/resume.view.html')
		})
		.state('404go', {
			template: require('./components/404.view.html')
		})
		.state('404', {
			url: '*path',
			template: require('./components/404.view.html')
		});

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('');
}
