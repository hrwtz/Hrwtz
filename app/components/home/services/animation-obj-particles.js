(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.factory('animationObjParticles', animationObjParticles);

	function animationObjParticles () {
		return {
			particlesArray: [],
			center: {},
			runparticles: true,
			setElement: setElement,
			draw: draw,
			update: update
		};

		function setElement (element) {
			return angular.extend({
				element: element,
				can: element[0],
				ctx: element[0].getContext('2d')
			}, this);
		}

		function draw () {	
			// Call the function that will draw the particles using a loop
			for (var i = 0; i < this.particlesArray.length; i++) {
				this.particlesArray[i].draw();
			}
		}

		function update (countAniFrame) {
			// Add new particle every 5 frames
			if (countAniFrame % 3 === 0 && this.runparticles === true){
				this.particlesArray.push(new Particle(this));
			}
			
			// Call the function that will update the particles using a loop
			for (var i = 0; i < this.particlesArray.length; i++) {
				this.particlesArray[i].update();
			}
		}

		function Particle (Service) {
			var self = Service;
			
			// Location is set to middle of canvas
			this.x = self.can.width / 2;
			this.y = self.can.height / 2;
			
			// Velocity
			this.vx = Math.random()*20-10;
			this.vy = Math.random()*20-10;

			// Opacity
			this.opacity = ( Math.random() * 0.25 ) + 0.5;

			// Set up particle radius
			this.radius = Math.random() * 1.5 + 1;

			// Draw particle on the canvas
			this.draw = function() {
				self.ctx.save();
				self.ctx.fillStyle = 'rgba(255,255,255,'+this.opacity+')';
				self.ctx.beginPath();
				self.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				self.ctx.fill();
				self.ctx.restore();
			};

			// Update values for next round
			this.update = function(){
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
					this.x + this.radius > self.can.width || 
					this.x - this.radius < 0 || 
					this.y + this.radius > self.can.height || 
					this.y - this.radius < 0
					){
					for (var key in self.particlesArray) {
						if (self.particlesArray[key] === this) {
							self.particlesArray.splice(key, 1);
						}
					}
				}

			};
		}	
	}
})();

(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.factory('animationSingleParticle', animationSingleParticle);

	function animationSingleParticle () {
		var self = Service;
			
			// Location is set to middle of canvas
			this.x = self.can.width / 2;
			this.y = self.can.height / 2;
			
			// Velocity
			this.vx = Math.random()*20-10;
			this.vy = Math.random()*20-10;

			// Opacity
			this.opacity = ( Math.random() * 0.25 ) + 0.5;

			// Set up particle radius
			this.radius = Math.random() * 1.5 + 1;

			// Draw particle on the canvas
			this.draw = function() {
				self.ctx.save();
				self.ctx.fillStyle = 'rgba(255,255,255,'+this.opacity+')';
				self.ctx.beginPath();
				self.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				self.ctx.fill();
				self.ctx.restore();
			};

			// Update values for next round
			this.update = function(){
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
					this.x + this.radius > self.can.width || 
					this.x - this.radius < 0 || 
					this.y + this.radius > self.can.height || 
					this.y - this.radius < 0
					){
					for (var key in self.particlesArray) {
						if (self.particlesArray[key] === this) {
							self.particlesArray.splice(key, 1);
						}
					}
				}

			};
	}

})();