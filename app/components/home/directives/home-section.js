export default homeSection;

homeSection.$inject = ['$window'];

function homeSection ($window) {
	var directive = {
		template: require('./home-section.html'),
		restrict: 'A',
		scope: {
			index: '=',
			isWorkSection: '=?',
			sectionTitles: '=',
			container: '=',
			activeSection: '=',
			onPanelSelect: '&'
		},
		transclude: true,
		controller: homeSectionController
	};

	homeSectionController.$inject = ['$scope', '$stateParams'];

	return directive;

	function homeSectionController ($scope, $stateParams) {
		$scope.pageParam = $stateParams.page;
	}
}
