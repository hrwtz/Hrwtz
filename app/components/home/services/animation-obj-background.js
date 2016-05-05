'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.factory('animationObjBackground', ['$timeout', function ($timeout) {
		// These can all be filters

		// http://stackoverflow.com/a/3627747/1552042
		function rgb2hex(rgb) {
			if (/^#[0-9A-F]{6}$/i.test(rgb)) {
				return rgb;
			}

			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
		// http://stackoverflow.com/a/13542669/1552042
		function shadeColor (color, percent) {
			var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
			return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		}
		function blendColors (c0, c1, p) {
			var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
			return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
		}

		function Service (element) {
			this.element = element;
			this.can = element[0];
			this.ctx = this.can.getContext('2d');
			this.circles = [];
		}

		Service.prototype.init = function() {
			var self = this;

			self.color = rgb2hex(self.element.css('background-color'));
			self.colorOrig = self.color;
		};

		Service.prototype.draw = function() {
			var self = this;

			// Draw background
			self.ctx.save();
			self.ctx.fillStyle = self.color;
			self.ctx.fillRect(0, 0, self.can.width, self.can.height);
			self.ctx.restore();

			// Draw circles
			if (self.circles){
				self.circles.forEach(function(el){
					self.ctx.save();
					self.ctx.beginPath();
					self.ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI, false);
					self.ctx.fillStyle = el.fill;
					self.ctx.fill();
					self.ctx.restore();
				});
			}
		};
		Service.prototype.update = function() {
			var self = this;

			var i = 0;
			self.circles.forEach(function(el){
				// If radius is bigger than canvas, remove from array and change bg color
				if (el.radius > self.can.width && el.radius > self.can.height){
					self.color = el.fill;
					self.circles.splice(i--, 1);
				}
				el.radius *= 1.05;
				i++;
			});
			// Gradually bring background color back to the original color
			self.color = blendColors(self.color, self.colorOrig, 0.1);
		};
		Service.prototype.addCircle = function(x, y){
			var self = this;

			// Get random shaded color based off of original color
			var colorShaded = shadeColor(self.colorOrig, Math.random() - 0.5);

			// Add circle object to circles array
			self.circles.push({
				x: x,
				y: y,
				radius : 1,
				fill: colorShaded,
			});
		};

		return Service;
	}]);