(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.factory('animationService', animationService);
		
	animationService.$inject = ['animationObjBackground', 'animationObjParticles', 'animationObjTriangle', 'animationObjSplit', 'animationObjTriStrokes'];

	function animationService (animationObjBackground, animationObjParticles, animationObjTriangle, animationObjSplit, animationObjTriStrokes) {
		function Service (element) {
			var self = this;

			this.bgService = new animationObjBackground(element);
			this.particlesService = animationObjParticles.getInstance(element);
			this.triangleService = new animationObjTriangle.getInstance(element);
			this.splitService = new animationObjSplit(element);
			this.triStrokesService = new animationObjTriStrokes(element);

			this.animations = [
				{
					finished: true,
					triggered: false,
					init: function(){
						self.bgService.init();
					},
					draw: function(){
						// Draw background
						self.bgService.draw();

						// Draw Particles
						self.particlesService.draw();
					},
					update: function(countAniFrame){
						self.bgService.update();
						self.particlesService.update(countAniFrame);
					}
				},
				{
					finished: false,
					triggered: false,
					init: function(){
						self.triangleService.init();
					},
					draw: function(){
						self.triangleService.draw();
					},
					update: function(countAniFrame){
						self.triangleService.update(countAniFrame);
						this.finished = self.triangleService.finished;
					}
				},
				{
					finished: true,
					triggered: false,
					init: function(){
						self.splitService.init(self.triangleService);
					},
					draw: function(){
						self.splitService.draw();
					},
					update: function(countAniFrame){
						self.splitService.update(countAniFrame);
					}
				},
				{
					finished: true,
					triggered: false,
					init: function(){
						// Get split shapes moving along
						self.splitService.superCharged = true;
						self.splitService.split[1].vx = 0.5;
						self.splitService.split[1].vy = 1.3;
						self.splitService.split[1].vrotate = 0.0005;
						self.splitService.split[0].vx = -0.5;
						self.splitService.split[0].vy = -1.3;
						self.splitService.split[0].vrotate = 0.002;
					},
					draw: function(){
						self.triStrokesService.draw();
					},
					update: function(countAniFrame){
						self.triStrokesService.update(countAniFrame);
						this.finished = self.triStrokesService.finished;
					}
				},
				{
					finished: true,
					triggered: false,
					init: function(){
						self.triStrokesService.runShapes = false;
						self.particlesService.runparticles = false;
					},
					draw: function(){

					},
					update: function(){

					}
				}
			];
		}
		return Service;
	}
})()