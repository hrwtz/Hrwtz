(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.factory('animationSingleTriStroke', animationSingleTriStroke);

	function animationSingleTriStroke () {
		/* jshint validthis: true */

		var Service = function () {

			this.opacity = ( Math.random() * 0.25 ) + 0.5;

			this.scale = 1;

			this.rotate = 0;
			
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
			return serviceInstance;
		}

		// Draw particle on the canvas
		function draw () {
			this.animationObject.ctx.save();
			this.animationObject.ctx.translate(this.animationObject.can.width/2, this.animationObject.can.height/2);

			this.animationObject.ctx.rotate(this.rotate);

			this.animationObject.ctx.strokeStyle = 'rgba(255,255,255,'+this.opacity+')';

			this.animationObject.ctx.beginPath();

			this.animationObject.ctx.lineTo(this.scale * 0, this.scale * -5);
			this.animationObject.ctx.lineTo(this.scale * 6, this.scale * 5);
			this.animationObject.ctx.lineTo(this.scale * -6, this.scale * 5);
			this.animationObject.ctx.lineTo(this.scale * 0, this.scale * -5);
			this.animationObject.ctx.lineWidth = 2;
			this.animationObject.ctx.closePath();

			this.animationObject.ctx.stroke();
			this.animationObject.ctx.restore();
		}

		// Update values for next round
		function update (){
			this.scale += 0.1;
			this.scale *= 1.02;

			this.rotate += 0.001;

			// Update position of triStroke
			this.x = this.x + this.vx;
			this.y = this.y + this.vy;

			// Update velocity to be slower
			this.vx = this.vx * 0.96;
			this.vy = this.vy * 0.96;

			// Fade out triStroke
			this.opacity = this.opacity * 0.99;

			// Remove triStroke from array if offscreen or opacity is too low
			if (
				this.opacity < 0.1 || 
				this.x + this.radius > this.animationObject.can.width || 
				this.x - this.radius < 0 || 
				this.y + this.radius > this.animationObject.can.height || 
				this.y - this.radius < 0
				){
				for (var key in this.animationObject.triStrokesArray) {
					if (this.animationObject.triStrokesArray[key] === this) {
						this.animationObject.triStrokesArray.splice(key, 1);
					}
				}
			}
		}
	}

})();