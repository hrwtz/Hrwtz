(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.service('animationsTriggeredService', animationsTriggeredService);

	function animationsTriggeredService () {
		/* jshint validthis: true */
		
		this.triggered = [];
	}
})();