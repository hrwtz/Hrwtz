(function($) {
    var canvas;

    var can = {
        init: function(){
            var $canvasParentCell;
            
            // Set up canvas object
            canvas = new fabric.Canvas('canvas');

            // Set canvas width/height
            $canvasParentCell = $('#canvas').parents('.cell');
            canvas.setWidth($canvasParentCell.width());
            canvas.setHeight($canvasParentCell.height());

            // Draw background
            background.draw();

            // Initialize triangle
            triangle.init();

            // Animate canvas
            can.animate();
        },
        animate: function(){
            // Animate Triangle
            //triangle.draw();

            // Request animation frame from browser to animate canvas
            fabric.util.requestAnimFrame(can.animate, canvas.getElement());
            canvas.renderAll();
        },
    }
    var triangle = {
        init: function(){
            // Set starting angle for rotating
            triangle.angle = 0;

            // Set triangle side length
            triangle.sideLength = 100;

            // Draw triangle shape for first time
            triangle.shape = triangle.createTriangle();
            canvas.add(triangle.shape);

            triangle.shape.animate('angle', 1440, {
              onChange: canvas.renderAll.bind(canvas),
              duration: 10000,
              //easing: fabric.util.ease.easeOutBounce
            });
        },
        createTriangle: function(){
            var a,
                h,
                triCoords,
                centerY,
                pos,
                shape;

            // Get triangle height and width
            a = triangle.sideLength;
            h = a * (Math.sqrt(3)/2);

            // Get x/y vars
            x = canvas.width/2 - a/2;
            y = canvas.height/2 - h/2;

            // Move points up so triangle is center based on the triangle center
            // not the outlying box center
            triCoords = [
                {x:0,y:-h/2},
                {x:-a / 2,y:h/2},
                {x:a / 2,y:h/2},
            ]
            centerY = (triCoords[0].y + triCoords[1].y + triCoords[2].y) / 3;
            y -= centerY;

            // Rotate points around center
            pos = fabric.util.rotatePoint(
                new fabric.Point(x, y),
                new fabric.Point(x + a / 2, y + h / 3 * 2),
                fabric.util.degreesToRadians(triangle.angle)
            );
            
            // Create shape object and return it
            shape =  new fabric.Triangle(
            {
                width: 100,
                height: 100,
                selectable: false,
                fill: 'white',
                strokeWidth: 2,
                left: canvas.width/2,
                top: canvas.height/2,
                originX: 'center',
                originY: 'center',
                angle: triangle.angle,
            });
            return shape;
        },
        draw: function(){
            canvas.renderAll(); 
            
            // Rotate Triangle
            triangle.angle += 1;
            canvas.remove(triangle.shape);
            triangle.shape = triangle.createTriangle();
            canvas.add(triangle.shape);    
        },

    }
    var background = {
        draw: function(){
            // Add full width/height black background
            var rect = new fabric.Rect({
                left: 0,
                top: 0,
                fill: 'black',
                width: canvas.width,
                height: canvas.height,
                selectable: false,
            });
            canvas.add(rect);
        }
    }



    can.init();


})(jQuery);
/*


(function($) {
	// RequestAnimFrame: a browser API for getting smooth animations
    var countAniFrame = 0;
    var requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     ||  
                function( callback ){
                    window.setTimeout(canvas.draw, 1000 / 60);
                };
    })();

	var canvas = {
		init: function(){
			// Set up canvas variables
        	canvas.can = $('canvas')[0],
            canvas.ctx = canvas.can.getContext('2d');

            // Run resize function
            canvas.resize();

            // Initialize particles
           	particles.init();

            // Kick off animation loop!
            canvas.animloop();
		},
		resize: function(){
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
        },
        draw: function(){
        	// Draw gradient background
        	background.draw();
        	// Draw particles
        	particles.draw();
            // Draw triangle
            triangle.draw();
        },
        // Start the main animation loop using requestAnimFrame
        animloop: function(){
            countAniFrame++;

			canvas.draw();
			
            requestAnimFrame(canvas.animloop);
		},
	}
	var background = {
		draw: function(){
			canvas.ctx.save();
            canvas.ctx.fillStyle = 'black';
            canvas.ctx.fillRect(0, 0, canvas.can.width, canvas.can.height);
            canvas.ctx.restore();
		},
	}
    var triangle = {
        side: 150,
        count: 0,
        rotate: 0,
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
            canvas.ctx.fillStyle = 'rgba(255,255,255,1)';
            canvas.ctx.translate(canvas.can.width/2, canvas.can.height/2);
            canvas.ctx.rotate(triangle.rotate);

            canvas.ctx.beginPath();
            canvas.ctx.moveTo(triCoords[0].x, triCoords[0].y);
            canvas.ctx.lineTo(triCoords[1].x, triCoords[1].y);
            canvas.ctx.lineTo(triCoords[2].x, triCoords[2].y);
            canvas.ctx.lineTo(triCoords[0].x, triCoords[0].y);
            canvas.ctx.fill();
            canvas.ctx.restore();

            triangle.update();
        },
        update: function(){
            //if (triangle.count < 300){
                triangle.rotate = (triangle.count+1) * Math.PI/180;
            //}

            triangle.count++;
        },
    }
    function animateValue(startFrame, endFrame, startValue, endValue){

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
	}

	// On Ready
	$(function(){
		canvas.init();
	});


})(jQuery);
*/