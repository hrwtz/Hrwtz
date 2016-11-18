(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.filter('nbsp', nbsp);

	function nbsp () {
		return function(string) {
			return string.replace(' ', '\u00A0');
		};
	}
})();