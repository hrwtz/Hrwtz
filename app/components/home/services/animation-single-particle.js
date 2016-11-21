(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.factory('animationSingleParticle', animationSingleParticle);

	function animationSingleParticle () {
		/* jshint validthis: true */

		var Service = function () {

			// Velocity
			this.vx = Math.random()*20-10;
			this.vy = Math.random()*20-10;

			// Opacity
			this.opacity = ( Math.random() * 0.25 ) + 0.5;

			// Set up particle radius
			this.radius = Math.random() * 1.5 + 1;
			
		};

		Service.prototype.draw = draw;

		Service.prototype.update = update;

		return {
			getInstance: getInstance
		};

		function getInstance (animationObject) {
			var serviceInstance = new Service();
			serviceInstance.animationObject = animationObject;
			serviceInstance.can = animationObject.can;
			serviceInstance.ctx = animationObject.ctx;
			serviceInstance.x = animationObject.can.width / 2;
			serviceInstance.y = animationObject.can.height / 2;
			return serviceInstance;
		}

		// Draw particle on the canvas
		function draw () {
			this.animationObject.ctx.save();
			this.animationObject.ctx.fillStyle = 'rgba(255,255,255,'+this.opacity+')';
			this.animationObject.ctx.beginPath();
			this.animationObject.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			this.animationObject.ctx.fill();
			this.animationObject.ctx.restore();
		}

		// Update values for next round
		function update (){
			// Update position of particle
			this.x = this.x + this.vx;
			this.y = this.y + this.vy;

			// Update velocity to be slower
			this.vx = this.vx * 0.96;
			this.vy = this.vy * 0.96;

			// Fade out particle
			this.opacity = this.opacity * 0.99;

			// Remove particle from array if offscreen or opacity is too low
			if (
				this.opacity < 0.1 || 
				this.x + this.radius > this.animationObject.can.width || 
				this.x - this.radius < 0 || 
				this.y + this.radius > this.animationObject.can.height || 
				this.y - this.radius < 0
				){
				for (var key in this.animationObject.particlesArray) {
					if (this.animationObject.particlesArray[key] === this) {
						this.animationObject.particlesArray.splice(key, 1);
					}
				}
			}

		}
	}

})();