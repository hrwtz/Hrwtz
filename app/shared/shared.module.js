import angular from 'angular';

import hoverAll from './directives/hover-all';
import initialisation from './directives/initialisation';
import nav from './directives/nav';
import svg from './directives/svg';
import unNotify from './directives/un-notify';
import easeFactory from './services/ease-factory';

export default angular
	.module('hrwtzApp.shared', [])
	.directive('hoverAll', hoverAll)
	.directive('initialisation', initialisation)
	.directive('nav', nav)
	.directive('svg', svg)
	.directive('unNotify', unNotify)
	.factory('easeFactory', easeFactory)
	.name;
