'use strict';
angular.module('hrwtzApp')
	.controller('workController', ['$scope', '$state', '$stateParams', 'workDataSet', function($scope, $state, $stateParams, workDataSet){
		$scope.screenWidth = screen.width;

		$scope.work = workDataSet.getWork($stateParams.slug);

		if (!$scope.work) {
			$state.go('404go');
		}

		$scope.prevPage = workDataSet.getPrevWork($stateParams.slug);
		$scope.nextPage = workDataSet.getNextWork($stateParams.slug);
		
	}]);