'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.filter('nbsp', function () {
		return function(string) {
			return string.replace(' ', '\u00A0');
		};
	});