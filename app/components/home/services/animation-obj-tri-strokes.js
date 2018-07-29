export default animationObjTriStrokes;

animationObjTriStrokes.$inject = ['animationSingleTriStroke'];

function animationObjTriStrokes (animationSingleTriStroke) {
	/* jshint validthis: true */

	var Service = function () {

		this.runShapes = true;

		this.shapesCreated = 0;

		this.triStrokesArray = [];

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
		// Call the function that will draw the triStrokes using a loop
		for (var i = 0; i < this.triStrokesArray.length; i++) {
			this.triStrokesArray[i].draw();
		}
	}

	function update (countAniFrame) {
		// Add new triStroke every 30 frames
		if (countAniFrame % 30 === 0 && this.runShapes) {
			this.triStrokesArray.push(animationSingleTriStroke.getInstance(this));
			this.shapesCreated++;
		}
		
		// Call the function that will update the triStrokes using a loop
		for (var i = 0; i < this.triStrokesArray.length; i++) {
			this.triStrokesArray[i].update();
		}

		// If 4 shapes have been made, animation is finished
		if (this.shapesCreated === 4) {
			this.finished = true;
		}
	}
}
