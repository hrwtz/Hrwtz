import angular from 'angular';

import svg from './directives/svg';

export default angular
	.module('hrwtzApp.shared', [])
	.directive('svg', svg)
	.name;
