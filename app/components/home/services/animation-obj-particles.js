export default animationObjParticles;

animationObjParticles.$inject = ['animationSingleParticle'];

function animationObjParticles (animationSingleParticle) {
	/* jshint validthis: true */

	var Service = function () {

		this.particlesArray = [];

		this.center = {};

		this.runparticles = true;

	};

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

	function draw () {	
		// Call the function that will draw the particles using a loop
		for (var i = 0; i < this.particlesArray.length; i++) {
			this.particlesArray[i].draw();
		}
	}

	function update (countAniFrame) {
		// Add new particle every 5 frames
		if (countAniFrame % 3 === 0 && this.runparticles === true){
			this.particlesArray.push(animationSingleParticle.getInstance(this));
		}
		
		// Call the function that will update the particles using a loop
		for (var i = 0; i < this.particlesArray.length; i++) {
			this.particlesArray[i].update();
		}
	}
}
