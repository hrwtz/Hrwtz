(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.factory('animationObjBackground', animationObjBackground);

	animationObjBackground.$inject = ['$timeout'];

	function animationObjBackground ($timeout) {
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
			this.color = rgb2hex(this.element.css('background-color'));
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
			this.color = blendColors(this.color, this.colorOrig, 0.1);
		}

		function addCircle (x, y){
			// Get random shaded color based off of original color
			var colorShaded = shadeColor(this.colorOrig, Math.random() - 0.5);

			// Add circle object to circles array
			this.circles.push({
				x: x,
				y: y,
				radius : 1,
				fill: colorShaded,
			});
		}

		// These can all be filters
		// http://stackoverflow.com/a/3627747/1552042
		function rgb2hex(rgb) {
			if (/^#[0-9A-F]{6}$/i.test(rgb)) {
				return rgb;
			}

			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			function hex(x) {
				return ('0' + parseInt(x).toString(16)).slice(-2);
			}
			return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
		// http://stackoverflow.com/a/13542669/1552042
		function shadeColor (color, percent) {
			/*jslint bitwise: true */
			var f = parseInt(color.slice(1), 16),
				t = percent < 0 ? 0 : 255,
				p = percent < 0 ? percent *-1 : percent, 
				R = f >> 16,
				G = f >> 8 & 0x00FF,
				B = f & 0x0000FF,
				r = Math.round((t - R) * p) + R,
				g = Math.round((t - G) * p) + G,
				b = Math.round((t - B) * p) + B;
			return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
		}
		function blendColors (c0, c1, p) {
			/*jslint bitwise: true */
			var f = parseInt(c0.slice(1), 16),
				t = parseInt(c1.slice(1), 16),
				R1 = f >> 16,
				G1 = f >> 8 & 0x00FF,
				B1 = f & 0x0000FF,
				R2 = t >> 16,
				G2 = t >> 8 & 0x00FF,
				B2 = t & 0x0000FF,
				r = Math.round((R2 - R1) * p) + R1,
				g = Math.round((G2 - G1) * p) + G1,
				b = Math.round((B2 - B1) * p) + B1;
			return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
		}
	}
})();