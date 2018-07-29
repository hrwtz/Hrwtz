export default animationObjSplit;

function animationObjSplit() {
	/* jshint validthis: true */

	var Service = function () {

		this.split = [];

	};

	Service.prototype.init = init;

	Service.prototype.draw = draw;

	Service.prototype.update = update;

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

	function init (triangleService) {
		var triangle = triangleService;
		// Set up vars
		this.start = 100;

		this.split[0] = {Coords: {}};
		this.split[1] = {Coords: {}};
		this.triangle = angular.copy(triangle);
		triangle.destroy();
		
		// Get split shape 0 coords
		this.split[0].Coords[0] = this.triangle.triCoords[2];
		this.split[0].Coords[1] = this.triangle.triCoords[0];
		this.split[0].Coords[2] = getMidPoint(this.triangle.triCoords[0], this.triangle.triCoords[1], 0.3);
		this.split[0].Coords[3] = getMidPoint(this.triangle.triCoords[1], this.triangle.triCoords[2], 0.6);
		this.split[0].vx = -0.5;
		this.split[0].vy = -1.3;
		this.split[0].vrotate = 0.002;
		this.split[0].rotate = 0;

		// Get split shape 1 coords
		this.split[1].Coords[0] = this.triangle.triCoords[1];
		this.split[1].Coords[1] = getMidPoint(this.triangle.triCoords[0], this.triangle.triCoords[1], 0.3);
		this.split[1].Coords[2] = getMidPoint(this.triangle.triCoords[1], this.triangle.triCoords[2], 0.6);
		this.split[1].vx = 0.5;
		this.split[1].vy = 1.3;
		this.split[1].vrotate = 0.0005;
		this.split[1].rotate = 0;
	}

	function draw () {
		var computedStyle = getComputedStyle(this.can);

		this.ctx.save();
		this.ctx.fillStyle = 'rgba(255,255,255,'+1+')';
		this.ctx.translate(parseInt(computedStyle.width)/2, parseInt(computedStyle.height)/2);
		this.ctx.scale(this.triangle.scale, this.triangle.scale);

		angular.forEach(this.split, function (splitValue, index) {
			this.ctx.rotate(splitValue.rotate);

			this.ctx.beginPath();
			this.ctx.lineTo(splitValue.Coords[0].x, splitValue.Coords[0].y);
			angular.forEach(splitValue.Coords, function (Coords, index) {
				if (index === 0) {
					return;
				}
				this.ctx.lineTo(Coords.x, Coords.y);
			}.bind(this));
			this.ctx.lineTo(splitValue.Coords[0].x, splitValue.Coords[0].y);
			this.ctx.fill();
			this.ctx.closePath();
		}.bind(this));

		this.ctx.restore();
	}

	function update (countAniFrame) {
		var computedStyle = getComputedStyle(this.can);

		angular.forEach(this.split, function (splitValue, index) {
			angular.forEach(splitValue.Coords, function (Coords, index) {
				Coords.x += splitValue.vx;
				Coords.y += splitValue.vy;

				// If coordinates are off screen and they are going slow enough, stop them
				if (!this.superCharged &&
					(!(splitValue.vx > 0.04 || splitValue.vx < -0.04)) && 
					((Coords.x > parseInt(computedStyle.width) / 2 || Coords.x < -parseInt(computedStyle.width) / 2) ||
					(Coords.y > parseInt(computedStyle.height) / 2 || Coords.y < -parseInt(computedStyle.height) / 2))) {
					splitValue.vx = 0;
					splitValue.vy = 0;
				}
			}.bind(this));
			if (!this.superCharged) {
				if (countAniFrame - this.start >= 40) {
					

					if (splitValue.vx > 0.04 || splitValue.vx < -0.04) {
						splitValue.vx *= 0.985;
					}
					if (splitValue.vy > 0.04 || splitValue.vy < -0.04) {
						splitValue.vy *= 0.985;
					}

					if ( countAniFrame - this.start > 60) {
						splitValue.vrotate *= 0.99;
					}

				}else{
					// Slowly slow down shapes for first 40 frames
					splitValue.vx *= 0.9995;
					splitValue.vy *= 0.9995;
				}
			}
			splitValue.rotate += splitValue.vrotate;
		}.bind(this));
	}

	// Get mid point of a line given two points and midpoint percentage position
	// http://stackoverflow.com/a/1934226/1552042
	function getMidPoint(point1, point2, r) {
		var point3 = {};

		// Find point that divides the segment into the ratio (1-r):r
		point3.x = r * point2.x + (1 - r) * point1.x;
		point3.y = r * point2.y + (1 - r) * point1.y;

		return point3;
	}

}
