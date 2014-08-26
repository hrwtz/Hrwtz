(function($) {

	// RequestAnimFrame: a browser API for getting smooth animations
    var canvasIni = new Array();
    var countAniFrame = 0;
    var requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     ||  
                function( callback ){
                    window.setTimeout(function(){
                        $.each(canvasIni, function(index, val){
                            val.draw();
                        });
                    }, 1000 / 60);
                };
    })();

	var canvass = function(can, index){
        this.index = index;
        var canvas = this;
		this.init = function(){
			// Set up canvas variables
            canvas.can = can,
            canvas.ctx = canvas.can.getContext('2d');

            // Run resize function
            canvas.resize();

            // Run click event handler
            canvas.click();

            // Initialize Background
            background.init();

            // Initialize particles
           	particles.init();

            // Initialize Triangle
            triangle.init();

            // Kick off animation loop!
            canvas.animloop();
		};

        this.click = function(){
            $(canvas.can).click(function(e){
                background.addCircle(e.offsetX, e.offsetY)
            })
        };
		this.resize = function(){
            $(window).resize(function(){
                // Create temp canvas and context. This is so on resize 
                // the canvas doesn't redraw everything and flash a 
                // white screen to the user
                var tempCanvas = $('<canvas></canvas>').width(canvas.can.width).height(canvas.can.height)[0];
                var tempContext = tempCanvas.getContext("2d");
                //Draw current canvas to temp canvas
                tempContext.drawImage(canvas.can, 0, 0);

                // Change canvas width/height attr's to fix canvas 
                // content size/stretching
                canvas.can.width = $(canvas.can).width();
                canvas.can.height = $(canvas.can).height();

                canvas.ctx.drawImage(tempContext.canvas, 0, 0);
            }).trigger('resize');
        };
        this.draw = function(){
        	// Draw gradient background
        	background.draw();
        	// Draw particles
        	particles.draw();
            // Draw triangle
            triangle.draw();
        }
        // Start the main animation loop using requestAnimFrame
        this.animloop = function(){
            countAniFrame++;

			canvas.draw();
			
            requestAnimFrame(canvas.animloop);
		};

        var background = {
            circles: [],
            colors: ['#25aaca', '#fae075', '#7abaa7', '#845aa5', '#265a71'],
            init: function(){
                // Copy colors to array used for circles
                background.circleColors = this.colors.slice(0);
            }, 
            draw: function(){
                // Draw background
                canvas.ctx.save();
                canvas.ctx.fillStyle = background.colors[0];
                canvas.ctx.fillRect(0, 0, canvas.can.width, canvas.can.height);
                canvas.ctx.restore();

                // Draw circles
                if (background.circles){
                    background.circles.forEach(function(el){
                        canvas.ctx.save();
                        canvas.ctx.beginPath();
                        canvas.ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI, false);
                        canvas.ctx.fillStyle = el.fill;
                        canvas.ctx.fill();
                        canvas.ctx.restore();
                    });
                }

                // Update info
                background.update();
            },
            update: function(){
                var i = 0;
                background.circles.forEach(function(el){
                    // If radius is bigger than canvas, remove from array and change bg color
                    if (el.radius > canvas.can.width  && el.radius > canvas.can.height){
                        background.colors.push(background.colors.shift());
                        background.circles.splice(i--, 1);
                    }
                    el.radius *= 1.05;
                    i++;
                });
            },
            addCircle: function(x, y){
                // Update circle colors
                background.circleColors.push(background.circleColors.shift());
                // Add circle object to circles array
                background.circles.push({
                    x: x,
                    y: y,
                    radius : 1,
                    fill: background.circleColors[0],
                })
            }
        }
        var particles = {
            //particleCount: 100,
            particlesArray: [],
            center: {},
            init: function(){
                // Set up particlesArray
                //for(var i = 0; i < particles.particleCount; i++) {
                    
                //}
            },
            draw: function(){
                // Add new particle every 5 frames
                if (countAniFrame % 3 == 0){
                    particles.particlesArray.push(new particles.particle());
                }
                // Call the function that will draw the particles using a loop
                for (var i = 0; i < particles.particlesArray.length; i++) {
                    particles.particlesArray[i].draw();
                }
            },
            particle: function(){
                // Set up distance from center, skew to farther away to make up for clumping near center
                //this.cenDis = Math.pow(Math.random(), .6) * 50;
                // Starting position
                //this.x = ( Math.random() * 40 ) + canvas.can.width / 2;
                //this.y = ( Math.random() * 40 ) + canvas.can.height / 2;
                // Start Position is a sphere

                //var startPositionDiameter = 20;
                //var theta = Math.random()*2*Math.PI;
                //var phi = Math.acos(Math.random()*2-1);
                //this.x = startPositionDiameter*Math.sin(phi)*Math.cos(theta) + canvas.can.width / 2;
                //this.y = startPositionDiameter*Math.sin(phi)*Math.sin(theta) + canvas.can.height / 2;
                
                this.x = canvas.can.width / 2;
                this.y = canvas.can.height / 2;
                // Velocity
                this.vx = Math.random()*20-10;
                this.vy = Math.random()*20-10;

                // Opacity
                this.opacity = ( Math.random() * .25 ) + .5;

                // Set up particle radius
                this.radius = Math.random() * 1.5 + 1;

                // Draw particle on the canvas
                this.draw = function() {
                    canvas.ctx.save();
                    canvas.ctx.fillStyle = 'rgba(255,255,255,'+this.opacity+')';
                    canvas.ctx.beginPath();
                    canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                    canvas.ctx.fill();
                    canvas.ctx.restore();

                    this.update();
                }
                this.update = function(){
                    // Update position of particle
                    this.x = this.x + this.vx;
                    this.y = this.y + this.vy;

                    // Update velocity to be slower
                    this.vx = this.vx * .96;
                    this.vy = this.vy * .96;

                    // Fade out particle
                    this.opacity = this.opacity * .99;

                    // Remove particle from array if offscreen or opacity is too low
                    if (
                        this.opacity < .1 || 
                        this.x + this.radius > canvas.can.width || 
                        this.x - this.radius < 0 || 
                        this.y + this.radius > canvas.can.height || 
                        this.y - this.radius < 0
                        ){
                        for (var key in particles.particlesArray) {
                            if (particles.particlesArray[key] == this) {
                                particles.particlesArray.splice(key, 1);
                            }
                        }
                    }

                }
            },
        };
        var triangle = {
            side: 150,
            count: 0,
            rotate: 0,
            opacity: 0,
            scale: 0,
            animations: [
                {
                    duration: 80,
                    delta: function(p) {
                        return ease.easeOutQuad(p)
                    },
                    step: function(delta) {
                        triangle.rotate = 600*delta * Math.PI/180;
                        triangle.opacity = delta;
                    }
                },
                {
                    duration: 40,
                    delta: function(p) {return ease.linear(p)},
                    step: function(delta) {
                        triangle.scale = delta;
                    }
                },
                {
                    delay: 40,
                    duration: 75,
                    infinite: true,
                    delta: function(p) {return ease.linear(p)},
                    step: function(delta) {
                        // Scale goes from -1 to 1
                        var variant = .05,
                            scale = Math.cos((Math.PI + (Math.PI * delta*2)));
                        scale = scale / (1 / variant);
                        scale = scale + 1 + variant;
                        triangle.scale = scale ;
                    }
                }
            ],
            init: function(){

            },
            draw: function(){
                var h,
                    triCoords,
                    centerY;
                // Get triangle height
                h = triangle.side * (Math.sqrt(3)/2);
                // Get triangle point coordinates
                triCoords = [
                    {x:0,y:-h/2},
                    {x:-triangle.side / 2,y:h/2},
                    {x:triangle.side / 2,y:h/2},
                ]
                // Fix Y coords to center triangle
                centerY = (triCoords[0].y + triCoords[1].y + triCoords[2].y) / 3;
                triCoords.forEach(function(el){
                    el.y = el.y - centerY;
                });

                canvas.ctx.save();
                canvas.ctx.fillStyle = 'rgba(255,255,255,'+triangle.opacity+')';
                canvas.ctx.translate(canvas.can.width/2, canvas.can.height/2);
                canvas.ctx.rotate(triangle.rotate);
                canvas.ctx.scale(triangle.scale, triangle.scale);

                canvas.ctx.beginPath();
                canvas.ctx.moveTo(triCoords[0].x, triCoords[0].y);
                canvas.ctx.lineTo(triCoords[1].x, triCoords[1].y);
                canvas.ctx.lineTo(triCoords[2].x, triCoords[2].y);
                canvas.ctx.lineTo(triCoords[0].x, triCoords[0].y);
                canvas.ctx.fill();
                canvas.ctx.closePath();
                canvas.ctx.restore();

                triangle.update();
            },
            update: function(){
                // Animations!
                var i = 0;
                triangle.animations.forEach(function(el){
                    // If object is done animating, unset it
                    if (el.finished)
                        triangle.animations.splice(i--, 1);
                    // Animate based off of object
                    animate(el);
                    i++;
                });
            },
        }
	}
    /*function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 8) ];
        }
        return color;
    }*/
	
   var ease = {
      // no easing, no acceleration
      linear: function (t) { return t },
      // accelerating from zero velocity
      easeInQuad: function (t) { return t*t },
      // decelerating to zero velocity
      easeOutQuad: function (t) { return t*(2-t) },
      // acceleration until halfway, then deceleration
      easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
      // accelerating from zero velocity 
      easeInCubic: function (t) { return t*t*t },
      // decelerating to zero velocity 
      easeOutCubic: function (t) { return (--t)*t*t+1 },
      // acceleration until halfway, then deceleration 
      easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
      // accelerating from zero velocity 
      easeInQuart: function (t) { return t*t*t*t },
      // decelerating to zero velocity 
      easeOutQuart: function (t) { return 1-(--t)*t*t*t },
      // acceleration until halfway, then deceleration
      easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
      // accelerating from zero velocity
      easeInQuint: function (t) { return t*t*t*t*t },
      // decelerating to zero velocity
      easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
      // acceleration until halfway, then deceleration 
      easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }
    function animate(el){
        var timePassed, 
            progress;
        // Set up start time
        if (!el.start)
            el.start = countAniFrame;
        timePassed = countAniFrame - el.start;
        // Add delay if one set
        if (el.delay)
            timePassed -= el.delay;
        // Get percentage done
        progress = timePassed / el.duration;
        if (progress > 1) progress = 1;
        if ((progress <= 1 && progress >= 0)){
            var delta = el.delta(progress)
            el.step(delta)
        }
        if (progress == 1){
            if (el.infinite) { 
                // If infinite, start over
                el.delay = 0;
                el.start = countAniFrame; 
            }else{
                // Tell animation we're done when it runs through
                el.finished = true;
            }
        }
    }
	

    var common = { // Rename me?
        init: function(){
            // Header functionality
            $('.navigation-menu').click(function(e){
                $('.navigation').toggleClass('is-open')

                e.preventDefault();
            });

            common.resize();
        },
        resize: function(){
            $(window).resize(function(){
                // Make all window size sections window sizes
                $('.row--window').css('height', $(window).height());
            });
        },
    };

	// On Ready
	$(function(){
        common.init();

        // I probably want to do this differently
        // Set up each canvas
        $('canvas').each(function(index){
            canvasIni[index] = new canvass($(this)[0], index);
        })
        $.each(canvasIni, function(index, val){
            canvasIni[index].init();
        });

	});


})(jQuery);
