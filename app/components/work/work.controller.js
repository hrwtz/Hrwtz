(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.controller('workController', WorkController);

	WorkController.$inject = ['$scope', '$state', '$stateParams', 'workDataSet'];

	function WorkController ($scope, $state, $stateParams, workDataSet){

		$scope.screenWidth = screen.width;

		$scope.work = workDataSet.getWork($stateParams.slug);

		$scope.prevPage = workDataSet.getPrevWork($stateParams.slug);

		$scope.nextPage = workDataSet.getNextWork($stateParams.slug);

		activate();

		function activate () {
			
			if (!$scope.work) {
				$state.go('404go');
			}

		}

	}
})();