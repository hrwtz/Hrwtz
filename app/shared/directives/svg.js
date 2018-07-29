export default svg;

svg.$inject = ['$sce'];

function svg ($sce) {
	var directive = {
		template: require('./svg.html'),
		restrict: 'A',
		scope: {
			id: '@',
			title: '@?'
		},
		link: function (scope, element, attrs) {
			scope.svg = $sce.trustAsHtml(require('!svg-inline-loader!../../assets/img/svg/' + scope.id + '.svg'));
		}
	};

	return directive;
}
