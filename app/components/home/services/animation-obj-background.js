(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.factory('animationObjBackground', animationObjBackground);

	animationObjBackground.$inject = ['$timeout', '$filter'];

	function animationObjBackground ($timeout, $filter) {
		/* jshint validthis: true */

		var Service = function () {

			this.circles = [];

		};

		Service.prototype.init = init;

		Service.prototype.draw = draw;

		Service.prototype.update = update;

		Service.prototype.addCircle = addCircle;

		return {
			getInstance: getInstance
		};

		function getInstance (element) {
			var serviceInstance = new Service();
			serviceInstance.element = element;
			serviceInstance.can = element[0];
			serviceInstance.ctx = element[0].getContext('2d');
			return serviceInstance;
		}

		function init () {
			this.color = $filter('rgb2hex')(this.element.css('background-color'));
			this.colorOrig = this.color;
		}

		function draw () {
			// Draw background
			this.ctx.save();
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(0, 0, this.can.width, this.can.height);
			this.ctx.restore();

			// Draw circles
			if (this.circles){
				this.circles.forEach(function(el){
					this.ctx.save();
					this.ctx.beginPath();
					this.ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI, false);
					this.ctx.fillStyle = el.fill;
					this.ctx.fill();
					this.ctx.restore();
				}.bind(this));
			}
		}

		function update () {
			var i = 0;
			this.circles.forEach(function(el){
				// If radius is bigger than canvas, remove from array and change bg color
				if (el.radius > this.can.width && el.radius > this.can.height){
					this.color = el.fill;
					this.circles.splice(i--, 1);
				}
				el.radius *= 1.05;
				i++;
			}.bind(this));
			// Gradually bring background color back to the original color
			this.color = $filter('blendColors')(this.color, this.colorOrig, 0.1);
		}

		function addCircle (x, y){
			// Get random shaded color based off of original color
			var colorShaded = $filter('shadeColor')(this.colorOrig, Math.random() - 0.5);

			// Add circle object to circles array
			this.circles.push({
				x: x,
				y: y,
				radius : 1,
				fill: colorShaded,
			});
		}
	}
})();