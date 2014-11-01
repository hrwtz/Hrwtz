(function($) {
    // RequestAnimFrame: a browser API for getting smooth animations
    var canvasIni = new Array();
    var countAniFrame = 0;
    // Start the main animation loop using requestAnimFrame
    var animloop = function(){
        // Update frame count
        countAniFrame++;

        // Call draw and update methods on each canvas
        $.each(canvasIni, function(index){
            canvasIni[index].controller();
            //canvasIni[index].update();
        });
        
        // Recursion
        requestAnimFrame(animloop);

    }
    var requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     ||  
                function( callback ){
                    window.setTimeout(function(){
                        animloop();
                    }, 1000 / 60);
                };
    })();

    var canvass = function(can, index){
        var canvas = this;
        canvas.index = index;
        //canvas.triggerAnimation = 0;
        this.init = function(){
            // Set up canvas variables
            canvas.can = can,
            canvas.ctx = canvas.can.getContext('2d');

            // Run resize function
            canvas.resize();

            // Run scroll function
            canvas.scroll();

            // Run click event handler
            canvas.click();

            // Initialize Background
            background.init();

        };
        this.controller = function(){
            // Run n amount of animation for n panels that have been triggered
            for (var i = 0; i < canvas.triggerAnimation+1; i++) {

                // If previous animation is finished or if not in correct section or if no animation
                if ( ( i != 0 && animation[i-1].finished != true )  || ( i > canvas.index ) || ( !animation[i] ) )
                    break;

                // Initalize animation if not already done
                if ( animation[i].triggered == false ){
                    animation[i].init();
                    animation[i].triggered = true;
                }

                // Only draw on canvas if canvas is in view
                if (canvas.visible)
                    animation[i].draw();

                // Update animation
                animation[i].update();
            };
        };
        this.click = function(){
            // On canvas click get mouse position and run addCircle method
            $(canvas.can).click(function(e){
                var xPos,
                    yPos;
                if ( e.offsetX == undefined ) { // fix for Firefox
                    xPos = e.pageX - $(canvas.can).offset().left;
                    yPos = e.pageY - $(canvas.can).offset().top;
                }else{
                    xPos = e.offsetX;
                    yPos = e.offsetY;
                }
                background.addCircle(xPos, yPos)
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
        this.scroll = function(){
            $(window).scroll(function(){
                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();

                var elemTop = $(canvas.can).offset().top;
                var elemBottom = elemTop + $(canvas.can).height();

                // If canvase is in viewport at all, update visible property
                if  ( ( elemTop >= docViewTop && elemTop < docViewBottom ) || ( elemBottom <= docViewBottom && elemBottom > docViewTop ) ){
                    canvas.visible = true;
                }else{
                    canvas.visible = false;
                }
            }).trigger('scroll');
        };
        var background = {
            circles: [],
            init: function(){
                // Set up background console
                background.color = rgb2hex($(canvas.can).css('background-color'));
                background.colorOrig = background.color;
            }, 
            draw: function(){
                // Draw background
                canvas.ctx.save();
                canvas.ctx.fillStyle = background.color;
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
            },
            update: function(){
                var i = 0;
                background.circles.forEach(function(el){
                    // If radius is bigger than canvas, remove from array and change bg color
                    if (el.radius > canvas.can.width  && el.radius > canvas.can.height){
                        background.color = el.fill;
                        background.circles.splice(i--, 1);
                    }
                    el.radius *= 1.05;
                    i++;
                });
                // Gradually bring background color back to the original color
                background.color = blendColors(background.color, background.colorOrig, .1);
            },
            addCircle: function(x, y){
                // Get random shaded color based off of original color
                var colorShaded =  shadeColor(background.colorOrig, Math.random() * (.5 - -.5) + -.5);

                // Add circle object to circles array
                background.circles.push({
                    x: x,
                    y: y,
                    radius : 1,
                    fill: colorShaded,
                })
            }
        }
        var particles = {
            particlesArray: [],
            center: {},
            runparticles: true,
            init: function(){

            },
            draw: function(){
                
                // Call the function that will draw the particles using a loop
                for (var i = 0; i < particles.particlesArray.length; i++) {
                    particles.particlesArray[i].draw();
                }

            },
            update: function(){
                
                // Add new particle every 5 frames
                if (countAniFrame % 3 == 0 && particles.runparticles == true){
                    particles.particlesArray.push(new particles.particle());
                }
                
                // Call the function that will update the particles using a loop
                for (var i = 0; i < particles.particlesArray.length; i++) {
                    particles.particlesArray[i].update();
                }

            },
            particle: function(){
                
                // Location is set to middle of canvas                
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
                }

                // Update values for next round
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
            finished: false,
            animations: [
                {
                    duration: 80,
                    delta: function(p) {
                        return ease.easeOutQuad(p)
                    },
                    step: function(delta) {
                        triangle.rotate = 600*delta * Math.PI/180;
                        triangle.opacity = delta;
                    },
                    complete: function(){
                        triangle.finished = true;
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
                var h,
                    centerY;
                // Get triangle height
                h = triangle.side * (Math.sqrt(3)/2);
                
                // Get triangle point coordinates
                triangle.triCoords = [
                    {x:0,y:-h/2},
                    {x:-triangle.side / 2,y:h/2},
                    {x:triangle.side / 2,y:h/2},
                ]

                // Fix Y coords to center triangle
                centerY = (triangle.triCoords[0].y + triangle.triCoords[1].y + triangle.triCoords[2].y) / 3;
                triangle.triCoords.forEach(function(el){
                    el.y = el.y - centerY;
                });
            },
            draw: function(){
                // Draw triangle
                canvas.ctx.save();
                canvas.ctx.fillStyle = 'rgba(255,255,255,'+triangle.opacity+')';
                canvas.ctx.translate(canvas.can.width/2, canvas.can.height/2);
                canvas.ctx.rotate(triangle.rotate);
                canvas.ctx.scale(triangle.scale, triangle.scale);

                canvas.ctx.beginPath();
                canvas.ctx.moveTo(triangle.triCoords[0].x, triangle.triCoords[0].y);
                canvas.ctx.lineTo(triangle.triCoords[1].x, triangle.triCoords[1].y);
                canvas.ctx.lineTo(triangle.triCoords[2].x, triangle.triCoords[2].y);
                canvas.ctx.lineTo(triangle.triCoords[0].x, triangle.triCoords[0].y);
                canvas.ctx.fill();
                canvas.ctx.closePath();
                canvas.ctx.restore();
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
            destroy: function(){
                this.draw = function(){return false};
            }
        };
        var split = {
            split: [],
            init: function(){
                // Set up vars
                split.start = countAniFrame;

                split.split[0] = {Coords: {}};
                split.split[1] = {Coords: {}};
                split.triangle = jQuery.extend(true, {}, triangle);
                triangle.destroy();
                
                // Get split shape 0 coords
                split.split[0].Coords[0] = split.triangle.triCoords[2];
                split.split[0].Coords[1] = split.triangle.triCoords[0];
                split.split[0].Coords[2] = getMidPoint(split.triangle.triCoords[0], split.triangle.triCoords[1], .3);
                split.split[0].Coords[3] = getMidPoint(split.triangle.triCoords[1], split.triangle.triCoords[2], .6);
                split.split[0].vx = -.5;
                split.split[0].vy = -1.3;
                split.split[0].vrotate = .002;
                split.split[0].rotate = 0;

                // Get split shape 1 coords
                split.split[1].Coords[0] = split.triangle.triCoords[1];
                split.split[1].Coords[1] = getMidPoint(split.triangle.triCoords[0], split.triangle.triCoords[1], .3);
                split.split[1].Coords[2] = getMidPoint(split.triangle.triCoords[1], split.triangle.triCoords[2], .6);
                split.split[1].vx = .5;
                split.split[1].vy = 1.3;
                split.split[1].vrotate = .0005;
                split.split[1].rotate = 0;
            },
            draw: function(){
                canvas.ctx.save();
                canvas.ctx.fillStyle = 'rgba(255,255,255,'+1+')';
                canvas.ctx.translate(canvas.can.width/2, canvas.can.height/2);
                canvas.ctx.scale(split.triangle.scale, split.triangle.scale);

                $.each(split.split, function(index, splitValue){
                    canvas.ctx.rotate(splitValue.rotate);

                    canvas.ctx.beginPath();
                    canvas.ctx.lineTo(splitValue.Coords[0].x, splitValue.Coords[0].y);
                    $.each(splitValue.Coords, function(index, Coords){
                        if (index == 0)
                            return;
                        canvas.ctx.lineTo(Coords.x, Coords.y);    
                    })
                    canvas.ctx.lineTo(splitValue.Coords[0].x, splitValue.Coords[0].y);
                    canvas.ctx.fill();
                    canvas.ctx.closePath();
                })

                canvas.ctx.restore();
            },
            update: function(){
                $.each(split.split, function(index, splitValue){
                    $.each(splitValue.Coords, function(index, Coords){
                        Coords.x +=  splitValue.vx;
                        Coords.y +=  splitValue.vy;

                        // If coordinates are off screen and they are going slow enough, stop them
                        if (!split.superCharged &&
                            (!(splitValue.vx > .04 || splitValue.vx < -.04)) && 
                            ((Coords.x > $(canvas.can).width() / 2 || Coords.x < -$(canvas.can).width() / 2) ||
                                (Coords.y > $(canvas.can).height() / 2 || Coords.y < -$(canvas.can).height() / 2))){
                            splitValue.vx = 0;
                            splitValue.vy = 0;
                        }
                    })
                    if (!split.superCharged){
                        if ( countAniFrame - split.start >= 40){
                            

                            if (splitValue.vx > .04 || splitValue.vx < -.04){
                                splitValue.vx *= .985;
                            }
                            if (splitValue.vy > .04 || splitValue.vy < -.04){
                                splitValue.vy *= .985;
                            }

                            if ( countAniFrame - split.start > 60){
                                splitValue.vrotate *= .99;
                            }

                        }else{
                            // Slowly slow down shapes for first 40 frames
                            splitValue.vx *= .9995;
                            splitValue.vy *= .9995;
                        }
                    }
                    splitValue.rotate += splitValue.vrotate;
                })
            },
        };
         var triStrokes = {
            runShapes: true,
            shapesCreated: 0,
            triStrokesArray: [],
            init: function(){

            },
            draw: function(){
                
                // Call the function that will draw the triStrokes using a loop
                for (var i = 0; i < triStrokes.triStrokesArray.length; i++) {
                    triStrokes.triStrokesArray[i].draw();
                }

            },
            update: function(){
                
                // Add new triStroke every 30 frames
                if (countAniFrame % 30 == 0 && triStrokes.runShapes){
                    triStrokes.triStrokesArray.push(new triStrokes.triStroke());
                    triStrokes.shapesCreated++;
                }
                
                // Call the function that will update the triStrokes using a loop
                for (var i = 0; i < triStrokes.triStrokesArray.length; i++) {
                    triStrokes.triStrokesArray[i].update();
                }

                // If 4 shapes have been made, animation is finished
                if (triStrokes.shapesCreated == 4)
                    triStrokes.finished = true;

            },
            triStroke: function(){
                // Opacity
                this.opacity = ( Math.random() * .25 ) + .5;

                this.scale = 1;

                this.rotate = 0;

                // Draw triStroke on the canvas
                this.draw = function() {
                    canvas.ctx.save();
                    canvas.ctx.translate(canvas.can.width/2, canvas.can.height/2);

                    canvas.ctx.rotate(this.rotate);

                    canvas.ctx.strokeStyle = 'rgba(255,255,255,'+this.opacity+')';

                    canvas.ctx.beginPath();

                    canvas.ctx.lineTo(this.scale * 0, this.scale * -5);
                    canvas.ctx.lineTo(this.scale * 6, this.scale * 5);
                    canvas.ctx.lineTo(this.scale * -6, this.scale * 5);
                    canvas.ctx.lineTo(this.scale * 0, this.scale * -5);
                    canvas.ctx.lineWidth = 2;
                    canvas.ctx.closePath();

                    canvas.ctx.stroke();
                    canvas.ctx.restore();
                }

                // Update values for next round
                this.update = function(){
                    this.scale += .1;
                    this.scale *= 1.02;

                    this.rotate += .001;

                    // Update position of triStroke
                    this.x = this.x + this.vx;
                    this.y = this.y + this.vy;

                    // Update velocity to be slower
                    this.vx = this.vx * .96;
                    this.vy = this.vy * .96;

                    // Fade out triStroke
                    this.opacity = this.opacity * .99;

                    // Remove triStroke from array if offscreen or opacity is too low
                    if (
                        this.opacity < .1 || 
                        this.x + this.radius > canvas.can.width || 
                        this.x - this.radius < 0 || 
                        this.y + this.radius > canvas.can.height || 
                        this.y - this.radius < 0
                        ){
                        for (var key in triStrokes.triStrokesArray) {
                            if (triStrokes.triStrokesArray[key] == this) {
                                triStrokes.triStrokesArray.splice(key, 1);
                            }
                        }
                    }

                }
            },
        };
        var animation = [
            {
                finished: true,
                triggered: false,
                init: function(){
                    background.init();
                    particles.init();
                },
                draw: function(){
                    // Draw background
                    background.draw();

                    // Draw Particles
                    particles.draw();
                },
                update: function(){
                    background.update();
                    particles.update();
                },
            },
            {
                finished: false,
                triggered: false,
                init: function(){
                    triangle.init();
                },
                draw: function(){
                    triangle.draw();
                },
                update: function(){
                    triangle.update();
                    this.finished = triangle.finished;
                },
            },
            {
                finished: true,
                triggered: false,
                init: function(){
                    split.init();
                },
                draw: function(){
                    split.draw();
                },
                update: function(){
                    split.update();
                },
            },
            {
                finished: true,
                triggered: false,
                init: function(){
                    // Get split shapes moving along
                    split.superCharged = true;
                    split.split[1].vx = .5;
                    split.split[1].vy = 1.3;
                    split.split[1].vrotate = .0005;
                    split.split[0].vx = -.5;
                    split.split[0].vy = -1.3;
                    split.split[0].vrotate = .002;

                    triStrokes.init();
                },
                draw: function(){
                    triStrokes.draw();
                },
                update: function(){
                    triStrokes.update();
                    this.finished = triStrokes.finished;
                },
            },
            {
                finished: true,
                triggered: false,
                init: function(){
                    triStrokes.runShapes = false;
                    particles.runparticles = false;
                },
                draw: function(){

                },
                update: function(){

                },
            }
        ]
    }

    var panelSnap = {
        init: function(){

            if (!$('section[data-panel]').length)
                return;

            // Side navigation show title on hover 
            this.sideNavHover();

            // Set up panelsnap jquery plugin
            this.initPlugin();

            // Start / Destroy panelSnap depending on window size
            this.toggleStatus();

        },
        initPlugin: function(){
            // Panel Snap
            $('body').panelSnap({
                $menu: $('.navigationSide-list, .navigation-list'),
                menuSelector: 'li[data-panel]',
                onSnapFinish: function($target){
                    // Update URL / History State
                    if (history.replaceState){
                        var historySection = $('.cell--half').css('float') == 'none' || ($target.index() == 1) ? pagebase : $target.attr('data-panel').toLowerCase();
                        history.replaceState({data: $('html').html()}, historySection, historySection);
                    }

                    // Trigger animation for next section
                    canvases.triggerAnimation($target);
                }
            });
        },
        toggleStatus: function(){
            // Start / Destroy panelSnap depending on window size
            $(window).on('resize', function(){
                if ($('section[data-panel]').length){
                    if ( $('.cell--half').css('float') == 'none' ){
                        $('body').panelSnap('disable');
                        common.isMobile = true;
                    }else{
                        $('body').panelSnap('enable');
                        common.isMobile = false;
                    }
                }
            });
        },
        sideNavHover: function(){   
            // Side navigation show title on hover 
            $('.navigationSide-item').hover(function(){
                $('.navigationSide-list .navigationSide-item:nth-of-type('+ ($(this).index()+1) +')').addClass('is-hover');
            }, function(){
                $('.navigationSide-list .navigationSide-item:nth-of-type('+ ($(this).index()+1) +')').removeClass('is-hover');
            });
        }

    }

    var canvases = {
        init: function(){

            // Set up each canvas
            $('canvas').each(function(index){
                canvasIni[index] = new canvass($(this)[0], index);
                canvasIni[index].init();
            })

            // Trigger animations on mobile sizes
            $(window).on('resize scroll', function(){
                if (common.isMobile)
                    canvases.triggerAnimationMobile();
            }).trigger('resize');

            // Kick off animation loop!
            requestAnimFrame(animloop);
        },
        triggerAnimation: function($target){
            // Trigger animation for next section
            $.each(canvasIni, function(index){
                if ( $target.index() - 2 > canvasIni[index].triggerAnimation || !canvasIni[index].triggerAnimation ){
                    canvasIni[index].triggerAnimation = $target.index() - 2;
                }
            });
        },
        triggerAnimationMobile: function(){
            // If canvas is in full view, show animation
            $('.canvas').each(function(){
                if ( isElementInViewport($(this)) ) {
                    $target = $(this).parents('section[data-panel]');
                    $.each(canvasIni, function(index){
                        if ( $target.index() - 2 > canvasIni[index].triggerAnimation || !canvasIni[index].triggerAnimation ){
                            canvasIni[index].triggerAnimation = $target.index() - 2;
                        }
                    });
                }
            });
        }
    }

    var work = {
        init: function(){
            // Set correct video source based on device width
            this.videoSrc();
        },
        videoSrc: function(){
            // Set correct video source based on device width
            var $video = $('video'),
                videoSrc = '';

            if (screen.width < 600) {
                videoSrc += "<source type='video/mp4' src='" + $video.data('mp4-600') + "' />";
                videoSrc += "<source type='video/webm' src='" + $video.data('webm-600') + "' />";
                $video.html(videoSrc);
            } else {
                videoSrc += "<source type='video/mp4' src='" + $video.data('mp4-1050') + "' />";
                videoSrc += "<source type='video/webm' src='" + $video.data('webm-1050') + "' />";
                $video.html(videoSrc);
            }
        }
    }

    var common = { // Rename me?
        init: function(){
            // Open / Close main navigation on click
            this.navigationMainToggle();
        },
        navigationMainToggle: function(){
            // Open / Close main navigation on click
            $('.navigation-menu').click(function(e){
                e.preventDefault();

                $('.navigation').toggleClass('is-open')
            });
        },
    };

    // Based off of typed.js
    typist = {
        sayings: [
            'I Am A Professional Problem Solver', 
            'I Am A Maker of the Interwebs', 
            'I Am An Amateur Beer Maker', 
            'I Am A 300 Ring Owner', 
            'I Am Based in Orlando, Florida', 
            'I Am A Front End Developer'],
        el: $('.typist'),
        startDelay: 1000,       // Delay before typist starts
        typeSpeed: 45,          // Delay between tpying each letter
        backSpeed: 30,          // Delay between highlighting previous letter
        backDelay: 3000,        // Delay before starting to highlight phrase
        typeDelay: 100,         // Delay before typing phrase
        plainText: '',          // Non highlighted text
        init: function(){
            // Create reference for timeouts
            var self = this;

            // Update non-highlighted text
            this.plainText = this.el.text();

            // On resize, set height of typist element
            $(window).bind('resize', function(){self.setHeight()}).trigger('resize');

            // After start delay start highlighting phrase
            setTimeout(function(){

                self.backspace();

            }, self.startDelay)
        },
        // pass current string state to each function, types 1 char per call
        typewrite: function(curString, curStrPos){
            // Slightly randomize typing speed to look more human
            var humanize = Math.round(Math.random() * (90)) + this.typeSpeed;
            
            // Create reference for timeouts
            var self = this;

            // Contains typing function in a timeout humanize'd delay
            self.timeout = setTimeout(function() {

                // Make text of element without extra spans or non-space characters
                self.el.text(self.el.text().replace(/\s+/g, ' '));

                // Get next letter to type
                var length = self.el.text().length;
                var nextLetter = self.sayings[0].substring(length, length+1);

                // Update DOM and object with next letter
                self.el.html(self.el.text() + nextLetter)
                self.plainText = self.el.text() + nextLetter;

                if (self.el.text() == self.sayings[0]){
                    // If done typing phrase go to next phrase and start the highlighting process
                    setTimeout(function(){
                        self.sayings.push(self.sayings.shift());
                        self.backspace();
                    }, self.backDelay);
                }else{
                    // Else keep typing
                    self.typewrite();
                }

            }, humanize);
        },
        backspace: function(){
            // Slightly randomize highlighting speed to look more human
            var humanize = Math.round(Math.random() * (90)) + this.backSpeed;

            // Create reference for timeouts
            var self = this;

            // Contains backspace function in a timeout humanize'd delay
            self.timeout = setTimeout(function() {
                // Get the current saying with a length the same of what's typed out
                var currentSaying = self.sayings[0].substring(0, self.plainText.length)

                // If current saying part is the same as the plain text showing
                if (currentSaying == self.plainText.replace(/\s+/g, ' ')){
                    // After set Delay
                    setTimeout(function(){

                        // Remove highlighted text
                        $('.typist-highlight').remove();

                        // And start type writing function
                        self.typewrite();

                    }, self.typeDelay)
                    return false;
                }

                // Highlight previous letter
                self.highlightPrevious();

                // Recursion to call this function again
                self.backspace();

            }, humanize);
        },
        highlightPrevious: function(){
            var self = this;

            // Get highlighted text
            var highlightedText = self.el.find('.typist-highlight').text();

            // Get full text
            var fullText = self.el.text();

            // Get new highlighted text
            self.plainText = fullText.substring(0, fullText.length - highlightedText.length - 1)

            // Wrap each word in a span
            var fullWordArray = fullText.match(/[\s]|[^\s]+/g);

            // Get new html / text
            var fullTextNew = '';

            var count = 0;

            // For each word in typist wrap in a span
            fullWordArray.forEach(function(element, index){
                fullTextNew += '<span class="typist-word">';
                // For each character in word
                for (var i = 0, len = element.length; i < len; i++) {
                    // If letter is a space, make it a non breaking space
                    var letter = (element[i] == ' ') ? '&nbsp;' : element[i];

                    // Add highlight span if not plaintext
                    if (count < self.plainText.length){
                        fullTextNew += letter;
                    }else{
                        fullTextNew += "<span class='typist-highlight'>"+letter +"</span>"
                    }
                    count++;
                }
                fullTextNew += '</span>';
            });

            // Throw updated HTML into DOM
            self.el.html(fullTextNew);

        },
        setHeight: function(){
            // If on non-mobile sizes, keep height as css set value and exit function
            if (!common.isMobile){
                this.el.css('height', '');
                return false;
            }

            // Clone typist and remove inline width / height properties
            var $fakeH2 = this.el.clone().css({width: this.el.width(), height: '',}).appendTo('body');
            var typistHeight = 0;

            // For each saying, put it in the fake element and get the greatest height
            this.sayings.forEach(function(element, index){
                $fakeH2.html(element);
                if ( $fakeH2.height() > typistHeight ){
                    typistHeight = $fakeH2.height();
                }
            });

            // Set typist height as the largest the content will make it
            this.el.css('height', typistHeight);

            // Remove cloned element
            $fakeH2.remove();
        }
    }

    // Multiple easing functions
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
    // Animate function for canvas animations
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
                if (el.complete)
                    el.complete();
            }
        }
    }
    // http://stackoverflow.com/a/13542669/1552042
    function shadeColor(color, percent) {   
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }
    function blendColors(c0, c1, p) {
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
    }
    // http://stackoverflow.com/a/3627747/1552042
    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    // Get mid point of a line given two points and midpoint percentage position
    // http://stackoverflow.com/a/1934226/1552042
    function getMidPoint(point1, point2, r){
        var point3 = {};

        point3.x = r * point2.x + (1 - r) * point1.x //find point that divides the segment
        point3.y = r * point2.y + (1 - r) * point1.y //into the ratio (1-r):r

        return point3;
    }
    // Resturn if element is in viewport
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    function isElementInViewport (el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();
        return (
            Math.floor(rect.top) >= 0 &&
            Math.floor(rect.left) >= 0 &&
            Math.floor(rect.bottom) <= $(window).height() &&
            Math.floor(rect.right) <= $(window).width()
        );
    }

    // On Ready
    $(function(){
        // Common functions 
        common.init();

        // Set up panelSnap
        panelSnap.init();

        // Set up panel animations
        canvases.init();

        // Set up typist element
        typist.init();

        // Set up work pages
        work.init();
    });


})(jQuery);
