export default canvasAnimation;

canvasAnimation.$inject = ['$window', '$timeout', 'animationService', 'animationsTriggeredService'];

function canvasAnimation ($window, $timeout, animationService, animationsTriggeredService) {
	var directive = {
		restrict: 'A',
		scope: {
			index: '=',
			container: '='
		},
		controller: 'canvasAnimationController',
		controllerAs: 'ctrl',
		link: link
	};

	return directive;

	function link (scope, element, attrs, ctrl) {
		var can = element[0];
		var ctx = can.getContext('2d');

		// Service. For each directive, call addCanvasAnimation to get total amount
		scope.animationObj = new animationService(element);

		// Logic to handle resizing
		scope.container.bind('resize', setCanvasDimensions);
		setCanvasDimensions();

		// Logic to handle scrolling
		scope.container.bind('scroll', updateIsVisible);
		updateIsVisible();

		// Start the animation loop
		ctrl.requestAnimFrame(ctrl.animloop);

		// Add circle on canvas click
		element.on('click', addCircle);
		
		function setCanvasDimensions () {
			// Create temp canvas and context. This is so on resize 
			// the canvas doesn't redraw everything and flash a 
			// white screen to the user
			var tempCanvas = angular.element('<canvas></canvas>')[0];
			tempCanvas.width = can.width;
			tempCanvas.height = can.height;
			var tempContext = tempCanvas.getContext('2d');
			//Draw current canvas to temp canvas
			tempContext.drawImage(can, 0, 0);

			// Change canvas width/height attr's to fix canvas 
			// content size/stretching
			var elementComputerStyle = getComputedStyle(element[0]);
			can.width = parseInt(elementComputerStyle.width);
			can.height = parseInt(elementComputerStyle.height);

			ctx.drawImage(tempContext.canvas, 0, 0);
		}

		function updateIsVisible () {
			var docViewTop = $window.pageYOffset;
			var docViewBottom = docViewTop + $window.innerHeight;

			var elemTop = element[0].getBoundingClientRect().top + document.body.scrollTop;
			var elemBottom = elemTop + parseInt(getComputedStyle(element[0]).height);

			// If canvas is in viewport at all, update visible property
			var isElementTopVisible = elemTop >= docViewTop && elemTop < docViewBottom;
			var isElementBottomVisible = elemBottom <= docViewBottom && elemBottom > docViewTop;
			scope.isVisible = isElementTopVisible || isElementBottomVisible;
			// If canvas is completely in viewport, update completely visible property
			scope.isCompletelyVisible = elemTop >= docViewTop && elemBottom <= docViewBottom;
		}

		function addCircle (e) {
			var xPos,
				yPos;
			if (e.offsetX === undefined) { // fix for Firefox
				xPos = e.pageX - element.offset().left;
				yPos = e.pageY - element.offset().top;
			} else {
				xPos = e.offsetX;
				yPos = e.offsetY;
			}
			scope.animationObj.bgService.addCircle(xPos, yPos);
		}

		// Call this in a timeout function so it will run after ng-class in view has run
		$timeout(function() {
			scope.$on('animationFrame', function (event, data) {
				for (var i = 0; i <= scope.index; i++) {
					// Don't continue if previous animation hasn't finished OR 
					// we don't have an animation for this section
					if ( 
						( i !== 0 && scope.animationObj.animations[i-1].finished !== true ) || 
						( !scope.animationObj.animations[i] ) ) {
						break;
					}

					// If current animation hasn't been triggered, the canvas isn't
					// completely in view, and another canvas ahead of us hasn't been 
					// triggered, don't continue
					if ( scope.animationObj.animations[i].triggered === false && !scope.isCompletelyVisible && animationsTriggeredService.triggered.indexOf(i) === -1){
						break;
					}

					// Initalize animation if not already done
					if ( scope.animationObj.animations[i].triggered === false ){
						scope.animationObj.animations[i].init();
						scope.animationObj.animations[i].triggered = true;


						// Add to triggered animation service if not already done
						if (animationsTriggeredService.triggered.indexOf(i) === -1) {
							animationsTriggeredService.triggered.push(i);
						}
					}

					// Only draw on canvas if canvas is in view
					if (scope.isVisible) {
						scope.animationObj.animations[i].draw();
					}

					// Update animation
					scope.animationObj.animations[i].update(data);
				}
				return;
			});
		});
	}
}
