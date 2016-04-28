'use strict';
angular.module('hrwtzApp')
	.directive('canvasAnimation', ['$window', '$timeout', 'animationObjBackground', 'animationObjParticles', 'animationService', function($window, $timeout, animationObjBackground, animationObjParticles, animationService){
		return {
			restrict: 'A',
			scope: {
				index: '='
			},
			controller: 'canvasAnimationController',
			controllerAs: 'ctrl',
			link: function(scope, element, attrs, ctrl) {
				var can = element[0];
				var ctx = can.getContext('2d');
				
				var setCanvasDimensions = function () {
					// Create temp canvas and context. This is so on resize 
	                // the canvas doesn't redraw everything and flash a 
	                // white screen to the user
	                var tempCanvas = angular.element('<canvas></canvas>').width(can.width).height(can.height)[0];
	                var tempContext = tempCanvas.getContext("2d");
	                //Draw current canvas to temp canvas
	                tempContext.drawImage(can, 0, 0);

	                // Change canvas width/height attr's to fix canvas 
	                // content size/stretching
	                can.width = element.width();
	                can.height = element.height();

	                ctx.drawImage(tempContext.canvas, 0, 0);
				};

				var updateIsVisible = function () {
					var docViewTop = $window.pageYOffset;
	                var docViewBottom = docViewTop + $window.innerHeight;

	                var elemTop = element.offset().top;
	                var elemBottom = elemTop + element.height();

	                // If canvase is in viewport at all, update visible property
	                if  ( ( elemTop >= docViewTop && elemTop < docViewBottom ) || ( elemBottom <= docViewBottom && elemBottom > docViewTop ) ){
	                    scope.visible = true;
	                }else{
	                    scope.visible = false;
	                }
				};

				element.on('click', function(e){
	                var xPos,
	                    yPos;
	                if ( e.offsetX == undefined ) { // fix for Firefox
	                    xPos = e.pageX - element.offset().left;
	                    yPos = e.pageY - element.offset().top;
	                }else{
	                    xPos = e.offsetX;
	                    yPos = e.offsetY;
	                }
	                scope.animationObj.bgService.addCircle(xPos, yPos);
	            })


				// Logic to handle resizing
				angular.element($window).bind('resize', function () {
	            	setCanvasDimensions();    
	            });
	            setCanvasDimensions();

	            // Logic to handle scrolling
				angular.element($window).bind('scroll', function () {
	            	updateIsVisible();
	            });
	            updateIsVisible();

	            // scope.triggered = true;

	            var bgService = new animationObjBackground(element);
	            var particlesService = new animationObjParticles(element);

				ctrl.requestAnimFrame(ctrl.animloop);

				// Service. For each directive, call addCanvasAnimation to get total amount
				scope.animationObj = new animationService(element);

				// Call this in a timeout function so it will run after ng-class in view has run
				$timeout(function() {
					scope.$on('animationFrame', function (event, data) {
						for (var i = 0; i < scope.animationObj.animations.length; i++) {
							if ( 
								( i != 0 && scope.animationObj.animations[i-1].finished != true )  || 
								( i > scope.index - 1 ) || ( !scope.animationObj.animations[i] ) ) {
								break;
							}

							// console.log(i)
							if ( scope.animationObj.animations[i].triggered === false && !scope.visible){
								break;
							}
							// console.log(scope.index);



							// var animation = scope.animationObj.animations[i];
							// Initalize animation if not already done
			                if ( scope.animationObj.animations[i].triggered === false ){
			                	// for (var k = i; k < scope.animationObj.animations.length; k++) {
			                	// 	console.log(k);
		                		scope.animationObj.animations[i].init();
			                    scope.animationObj.animations[i].triggered = true;
			                	// };
			                }

			                // Only draw on canvas if canvas is in view
			                if (scope.visible) {
			                	scope.animationObj.animations[i].draw();
			                }

			                // Update animation
			                scope.animationObj.animations[i].update(data);

						};
						return;




						if (!scope.animation || scope.animation.triggered === false && !scope.visible) {
							return;
						}

						// Or if service says this should be initialized
						if (scope.animation.triggered === false && scope.visible) {
							// Initialize for this and future canvases
							scope.animation.init(element);
		                    scope.animation.triggered = true;
						}


						// If previous animation is finished or if not in correct section or if no animation
		                // if ( ( i != 0 && animation[i-1].finished != true )  || ( i > scope.index ) || ( !scope.animation ) )
		                //     break;

		                // Only draw on canvas if canvas is in view
		                if (scope.visible) {
		                	scope.animation.draw();
		                }

		                // Initalize animation if not already done
		                if (scope.animation.triggered === false){
		                    
		                }

		                // Update animation
		                scope.animation.update(data);
					});
				});
			}
		}
	}]);