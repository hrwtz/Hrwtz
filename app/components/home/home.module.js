import angular from 'angular';

import canvasAnimationController from './directives/canvas-animation.controller';
import HomeController from './home.controller';
import canvasAnimation from './directives/canvas-animation';
import homeSection from './directives/home-section';
import animationObjBackground from './services/animation-obj-background';
import animationObjParticles from './services/animation-obj-particles';
import animationObjSplit from './services/animation-obj-split';
import animationObjTriStrokes from './services/animation-obj-tri-strokes';
import animationObjTriangle from './services/animation-obj-triangle';
import animationService from './services/animation-service';
import animationSingleParticle from './services/animation-single-particle';
import animationSingleTriStroke from './services/animation-single-tri-stroke';
import animationsTriggeredService from './services/animations-triggered-service';
import { rgb2hex, shadeColor, blendColors } from './filters/colors';

export default angular
	.module('hrwtzApp.home', [])
	.controller('canvasAnimationController', canvasAnimationController)
	.controller('HomeController', HomeController)
	.directive('canvasAnimation', canvasAnimation)
	.directive('homeSection', homeSection)
	.factory('animationObjBackground', animationObjBackground)
	.factory('animationObjParticles', animationObjParticles)
	.factory('animationObjSplit', animationObjSplit)
	.factory('animationObjTriStrokes', animationObjTriStrokes)
	.factory('animationObjTriangle', animationObjTriangle)
	.factory('animationService', animationService)
	.factory('animationSingleParticle', animationSingleParticle)
	.factory('animationSingleTriStroke', animationSingleTriStroke)
	.service('animationsTriggeredService', animationsTriggeredService)
	.filter('rgb2hex', rgb2hex)
	.filter('shadeColor', shadeColor)
	.filter('blendColors', blendColors)
	.name;
