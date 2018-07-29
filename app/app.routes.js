export default angular
	.module('hrwtzApp.routes', [
		
	])
	.config(routes)
	.name;

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes ($stateProvider, $urlRouterProvider) {
	// any unknown URLS go to 404
	$urlRouterProvider.otherwise('/404');

	// no route goes to index
	$urlRouterProvider.when('', '/');

	// use a state provider for routing
	$stateProvider
		.state('home', {
			url: '/',
			template: require('./components/home/home.view.html'),
			controller: 'HomeController',
			controllerAs: 'vm'
		})
		.state('resume', {
			url: '/resume',
			template: require('./components/resume/resume.view.html')
		})
		.state('404go', {
			template: require('./components/404/404.view.html')
		})
		.state('404', {
			url: '*path',
			template: require('./components/404/404.view.html')
		});
}