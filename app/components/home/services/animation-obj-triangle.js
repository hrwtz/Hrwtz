'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.factory('animationObjTriangle', [function () {
		// Multiple easing functions
		var ease = {
			// no easing, no acceleration
			linear: function (t) { return t; },
			// accelerating from zero velocity
			easeInQuad: function (t) { return t*t; },
			// decelerating to zero velocity
			easeOutQuad: function (t) { return t*(2-t); },
			// acceleration until halfway, then deceleration
			easeInOutQuad: function (t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; },
			// accelerating from zero velocity 
			easeInCubic: function (t) { return t*t*t; },
			// decelerating to zero velocity 
			easeOutCubic: function (t) { return (--t)*t*t+1; },
			// acceleration until halfway, then deceleration 
			easeInOutCubic: function (t) { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
			// accelerating from zero velocity 
			easeInQuart: function (t) { return t*t*t*t; },
			// decelerating to zero velocity 
			easeOutQuart: function (t) { return 1-(--t)*t*t*t; },
			// acceleration until halfway, then deceleration
			easeInOutQuart: function (t) { return t<0.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
			// accelerating from zero velocity
			easeInQuint: function (t) { return t*t*t*t*t; },
			// decelerating to zero velocity
			easeOutQuint: function (t) { return 1+(--t)*t*t*t*t; },
			// acceleration until halfway, then deceleration 
			easeInOutQuint: function (t) { return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
		};
		
		// Animate function for canvas animations
		function animate(el, countAniFrame){
			var timePassed, 
				progress;
			// Set up start time
			if (!el.start) {
				el.start = countAniFrame;
			}
			timePassed = countAniFrame - el.start;
			// Add delay if one set
			if (el.delay) {
				timePassed -= el.delay;
			}
			// Get percentage done
			progress = timePassed / el.duration;
			if (progress > 1) {
				progress = 1;
			}
			if ((progress <= 1 && progress >= 0)) {
				var delta = el.delta(progress);
				el.step(delta);
			}
			if (progress == 1){
				if (el.infinite) { 
					// If infinite, start over
					el.delay = 0;
					el.start = countAniFrame; 
				}else{
					// Tell animation we're done when it runs through
					el.finished = true;
					if (el.complete) {
						el.complete();
					}
				}
			}
		}



		function Service (element) {
			var self = this;

			this.element = element;
			this.can = element[0];
			this.ctx = this.can.getContext('2d');
			this.side = 150;
			this.count = 0;
			this.rotate = 0;
			this.opacity = 0;
			this.scale = 0;
			this.finished = false;
			this.animations = [
				{
					duration: 80,
					delta: function(p) {
						return ease.easeOutQuad(p);
					},
					step: function(delta) {
						self.rotate = 600*delta * Math.PI/180;
						self.opacity = delta;
					},
					complete: function(){
						self.finished = true;
					}
				},
				{
					duration: 40,
					delta: function(p) {return ease.linear(p);},
					step: function(delta) {
						self.scale = delta;
					}
				},
				{
					delay: 40,
					duration: 75,
					infinite: true,
					delta: function(p) {return ease.linear(p);},
					step: function(delta) {
						// Scale goes from -1 to 1
						var variant = 0.05,
							scale = Math.cos((Math.PI + (Math.PI * delta*2)));
						scale = scale / (1 / variant);
						scale = scale + 1 + variant;
						self.scale = scale ;
					}
				}
			];
			this.init = function(){
				var h,
					centerY;
				// Get triangle height
				h = self.side * (Math.sqrt(3)/2);
				
				// Get triangle point coordinates
				self.triCoords = [
					{x:0,y:-h/2},
					{x:-self.side / 2,y:h/2},
					{x:self.side / 2,y:h/2},
				];

				// Fix Y coords to center triangle
				centerY = (self.triCoords[0].y + self.triCoords[1].y + self.triCoords[2].y) / 3;
				self.triCoords.forEach(function(el){
					el.y = el.y - centerY;
				});
			};
			this.draw = function(){
				// Draw triangle
				self.ctx.save();
				self.ctx.fillStyle = 'rgba(255,255,255,'+self.opacity+')';
				self.ctx.translate(self.can.width/2, self.can.height/2);
				self.ctx.rotate(self.rotate);
				self.ctx.scale(self.scale, self.scale);

				self.ctx.beginPath();
				self.ctx.moveTo(self.triCoords[0].x, self.triCoords[0].y);
				self.ctx.lineTo(self.triCoords[1].x, self.triCoords[1].y);
				self.ctx.lineTo(self.triCoords[2].x, self.triCoords[2].y);
				self.ctx.lineTo(self.triCoords[0].x, self.triCoords[0].y);
				self.ctx.fill();
				self.ctx.closePath();
				self.ctx.restore();
			};
			this.update = function(countAniFrame){
				// Animations!
				var i = 0;
				self.animations.forEach(function(el){
					// If object is done animating, unset it
					if (el.finished) {
						self.animations.splice(i--, 1);
					}
					// Animate based off of object
					animate(el, countAniFrame);
					i++;
				});
			};
			this.destroy = function(){
				this.draw = function(){
					return false;
				};
			};
		}
		return Service;
	}]);