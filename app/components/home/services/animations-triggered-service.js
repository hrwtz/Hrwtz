'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.service('animationsTriggeredService', [function () {
		this.triggered = [];
	}]);