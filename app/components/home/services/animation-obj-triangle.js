export default animationObjTriangle;

animationObjTriangle.$inject = ['easeFactory'];

function animationObjTriangle (easeFactory) {
	/* jshint validthis: true */

	var Service = function () {

		this.side = 150;

		this.count = 0;
		
		this.rotate = 0;
		
		this.opacity = 0;
		
		this.scale = 0;
		
		this.finished = false;

		this.triCoords = [];

		this.animations = [
			{
				duration: 80,
				delta: easeFactory.easeOutQuad,
				step: step1.bind(this),
				complete: complete1.bind(this)
			},
			{
				duration: 40,
				delta: easeFactory.linear,
				step: step2.bind(this),
			},
			{
				delay: 40,
				duration: 75,
				infinite: true,
				delta: easeFactory.linear,
				step: step3.bind(this),
			}
		];

	};

	Service.prototype.init = init;

	Service.prototype.draw = draw;

	Service.prototype.update = update;

	Service.prototype.destroy = destroy;

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

	function init (){
		var h,
			centerY;

		// Get triangle height
		h = this.side * (Math.sqrt(3)/2);
		
		// Get triangle point coordinates
		this.triCoords.push(
			{x: 0, y: -h / 2},
			{x: -this.side / 2, y: h / 2},
			{x: this.side / 2, y: h / 2}
		);

		// Fix Y coords to center triangle
		centerY = (this.triCoords[0].y + this.triCoords[1].y + this.triCoords[2].y) / 3;
		this.triCoords.forEach(function(el){
			el.y = el.y - centerY;
		});
	}

	function draw (){
		var computedStyle = getComputedStyle(this.can);

		// Draw triangle
		this.ctx.save();
		this.ctx.fillStyle = 'rgba(255,255,255,'+this.opacity+')';
		this.ctx.translate(parseInt(computedStyle.width)/2, parseInt(computedStyle.height)/2);
		this.ctx.rotate(this.rotate);
		this.ctx.scale(this.scale, this.scale);

		this.ctx.beginPath();
		this.ctx.moveTo(this.triCoords[0].x, this.triCoords[0].y);
		this.ctx.lineTo(this.triCoords[1].x, this.triCoords[1].y);
		this.ctx.lineTo(this.triCoords[2].x, this.triCoords[2].y);
		this.ctx.lineTo(this.triCoords[0].x, this.triCoords[0].y);
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore();
	}

	function update (countAniFrame){
		// Animations!
		var i = 0;
		this.animations.forEach(function(el){
			// If object is done animating, unset it
			if (el.finished) {
				this.animations.splice(i--, 1);
			}
			// Animate based off of object
			animate.call(this, el, countAniFrame);
			i++;
		}.bind(this));
	}

	function destroy (){
		this.draw = function(){
			return false;
		};
	}

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
			el.step.call(this, delta);
		}
		if (progress === 1) {
			if (el.infinite) { 
				// If infinite, start over
				el.delay = 0;
				el.start = countAniFrame; 
			} else {
				// Tell animation we're done when it runs through
				el.finished = true;
				if (el.complete) {
					el.complete.call(this);
				}
			}
		}
	}

	function step1 (delta) {
		this.rotate = 600 * delta * Math.PI / 180;
		this.opacity = delta;
	}

	function complete1 () {
		this.finished = true;
	}

	function step2 (delta) {
		this.scale = delta;
	}

	function step3 (delta) {
		// Scale goes from -1 to 1
		var variant = 0.05,
			scale = Math.cos((Math.PI + (Math.PI * delta*2)));
		scale = scale / (1 / variant);
		scale = scale + 1 + variant;
		this.scale = scale ;
	}

}
