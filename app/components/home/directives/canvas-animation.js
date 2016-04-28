'use strict';
angular.module('hrwtzApp')
	.controller('canvasAnimationController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout){

	    // Start the main animation loop using requestAnimFrame
	    var self = {};
    	self.countAniFrame =  0;
    	self.animloop =  function(){
	        // Update frame count
	        self.countAniFrame++;

	        // Broadcast the event so we can run update functions within our directive
			$scope.$broadcast('animationFrame', self.countAniFrame);
	        
	        // Recursion
	        self.requestAnimFrame(self.animloop);

	    };
	    self.requestAnimFrame =  (function(){
	    	return  $window.requestAnimationFrame.bind(window)       || 
	                $window.webkitRequestAnimationFrame.bind(window) || 
	                $window.mozRequestAnimationFrame.bind(window)    || 
	                $window.oRequestAnimationFrame.bind(window)      || 
	                $window.msRequestAnimationFrame.bind(window)     ||  
	                function( callback ){
	                    $window.setTimeout(function(){
	                        callback();
	                    }, 1000 / 60);
	                };
	    })();
	    return self;
		
	}]);

// Canvas Pieces:
// Animation Loop itself - Service
// resize/scroll/click handlers - Link Function
// Controller that controls when animations start / stop / triggers animations
// Animation Objects (init, draw, update) - Each a service
	// Background
	// Particles
	// Triangle
	// Split
	// Tri Strokes
// Animation Settings - Home section?




'use strict';
angular.module('hrwtzApp')
	.directive('canvasAnimation', ['$window', '$timeout', 'animationObjBackground', 'animationObjParticles', 'test', function($window, $timeout, animationObjBackground, animationObjParticles, test){
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
	                bgService.addCircle(xPos, yPos)
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



            	// scope.animation = {
            	// 	finished: true,
	            //     triggered: false,
	            //     init: function(){
	            //         bgService.init();
	            //     },
	            //     draw: function(){
	            //         // Draw background
	            //         bgService.draw();

	            //         // Draw Particles
	            //         particlesService.draw();
	            //     },
	            //     update: function(countAniFrame){
	            //         bgService.update();
	            //         particlesService.update(countAniFrame);
	            //     }
            	// };
            	// test.setElement(element);
            	// scope.animation = test.animations[scope.index - 1];

				ctrl.requestAnimFrame(ctrl.animloop);

				// Service. For each directive, call addCanvasAnimation to get total amount
				// 
				var aa = new test(element);

				// Call this in a timeout function so it will run after ng-class in view has run
				$timeout(function() {
					scope.$on('animationFrame', function (event, data) {
						for (var i = 0; i < aa.animations.length; i++) {
							if ( 
								( i != 0 && aa.animations[i-1].finished != true )  || 
								( i > scope.index - 1 ) || ( !aa.animations[i] ) ) {
								break;
							}

							// console.log(i)
							if ( aa.animations[i].triggered === false && !scope.visible){
								break;
							}
							// console.log(scope.index);



							// var animation = aa.animations[i];
							// Initalize animation if not already done
			                if ( aa.animations[i].triggered === false ){
			                	// for (var k = i; k < aa.animations.length; k++) {
			                	// 	console.log(k);
		                		aa.animations[i].init();
			                    aa.animations[i].triggered = true;
			                	// };
			                }

			                // Only draw on canvas if canvas is in view
			                if (scope.visible) {
			                	aa.animations[i].draw();
			                }

			                // Update animation
			                aa.animations[i].update(data);

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


'use strict';
angular.module('hrwtzApp')
	.factory('test', ['animationObjBackground', 'animationObjParticles', 'animationObjTriangle', 'animationObjSplit', function (animationObjBackground, animationObjParticles, animationObjTriangle, animationObjSplit) {
		function Service (element) {
			var self = this;

			this.bgService = new animationObjBackground(element);
	    	this.particlesService = new animationObjParticles(element);
	    	this.triangleService = new animationObjTriangle(element);
	    	this.splitService = new animationObjSplit(element);

	    	this.animations = [
				{
					finished: true,
	                triggered: false,
	                init: function(){
	                    self.bgService.init();
	                },
	                draw: function(){
	                    // Draw background
	                    self.bgService.draw();

	                    // Draw Particles
	                    self.particlesService.draw();
	                },
	                update: function(countAniFrame){
	                    self.bgService.update();
	                    self.particlesService.update(countAniFrame);
	                }
	            },
	            {
	                finished: false,
	                triggered: false,
	                init: function(){
	                    self.triangleService.init();
	                },
	                draw: function(){
	                    self.triangleService.draw();
	                },
	                update: function(countAniFrame){
	                    self.triangleService.update(countAniFrame);
	                    this.finished = self.triangleService.finished;
	                },
	            },
	            {
	                finished: true,
	                triggered: false,
	                init: function(){
	                    self.splitService.init(self.triangleService);
	                },
	                draw: function(){
	                    self.splitService.draw();
	                },
	                update: function(countAniFrame){
	                    self.splitService.update(countAniFrame);
	                },
	            },
			];
		};
		Service.prototype.setElement = function (element) {
			this.bgService = new animationObjBackground(element);
    		this.particlesService = new animationObjParticles(element);
    		console.log(this.bgService);
		};
		return Service;
	}]);