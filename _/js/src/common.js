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
/*
            // Initialize particles
            particles.init();

            // Initialize Triangle
            triangle.init();

            // Initialize Split
            split.init();
*/
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
                animation[i].update()
;            };
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
        /*
        this.draw = function(){
            // Only draw on canvas if canvas is in view
            if (!canvas.visible)
                return;

            // Draw gradient background
            background.draw();
            // Draw particles
            particles.draw();
            // Draw triangle
            triangle.draw();
            // Draw split
            triangle.draw();
        };
        this.update = function(){
            // Update gradient background
            background.update();
            // Update particles
            particles.update();
            // Update triangle
            triangle.update();
            // Update split
            split.update();
        };*/

        var background = {
            circles: [],
            //colors: ['#F29727', '#E05723', '#B0382F', '#982E4B', '#713045', ],

            init: function(){

                //background.colors.reverse();
                // Copy colors to array used for circles
                //background.circleColors = background.colors;

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
                // Update circle colors
                //background.circleColors.push(background.circleColors.shift());

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
            //particleCount: 100,
            particlesArray: [],
            center: {},
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
                if (countAniFrame % 3 == 0){
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
                //canvas.ctx.rotate(split.triangle.rotate);
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
                   // return false;
                })

                canvas.ctx.restore();
            },
            update: function(){
                $.each(split.split, function(index, splitValue){
                    $.each(splitValue.Coords, function(index, Coords){
                        Coords.x +=  splitValue.vx;
                        Coords.y +=  splitValue.vy;
                    })
                    splitValue.vx *= .9995;
                    splitValue.vy *= .9995;
                    splitValue.rotate += splitValue.vrotate;
                })

/*
                split.split[1].Coords[0].x += 1;
                split.split[1].Coords[1].x += 1;
                split.split[1].Coords[2].x += 1;
*/

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
            }
        ]
    }



    
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
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= $(window).height() &&
            rect.right <= $(window).width()
        );
    }

    var common = { // Rename me?
        init: function(){

            // Header functionality
            $('.navigation-menu').click(function(e){
                e.preventDefault();

                $('.navigation').toggleClass('is-open')
            });

            // Panel Snap
            if ($('section[data-panel]').length){
                $('body').panelSnap({
                    $menu: $('.navigationSide-list, .navigation-list'),
                    menuSelector: 'li[data-panel]',
                    onSnapFinish: function($target){
                        var historySection = $('.cell--half').css('float') == 'none' || ($target.index() == 0) ? pagebase : $target.attr('data-panel').toLowerCase();
                        history.replaceState({data: $('html').html()}, historySection, historySection);

                        $.each(canvasIni, function(index){
                            if ( $target.index() > canvasIni[index].triggerAnimation || !canvasIni[index].triggerAnimation ){
                                canvasIni[index].triggerAnimation = $target.index();
                            }
                        });
                    }
                });
                $('.navigation-button.ajax').click(function(e){
                    e.preventDefault();
                    $('body').panelSnap('snapToPanel', $('section:first'));
                });

            }

            // Side navigation hover / Click
            $('.navigationSide-item').hover(function(){
                $('.navigationSide-list .navigationSide-item:nth-of-type('+ ($(this).index()+1) +')').addClass('is-hover');
            }, function(){
                $('.navigationSide-list .navigationSide-item:nth-of-type('+ ($(this).index()+1) +')').removeClass('is-hover');
            });

            // Set up each canvas
            $('canvas').each(function(index){
                canvasIni[index] = new canvass($(this)[0], index);
                canvasIni[index].init();
            })

            //
            $(window).on('resize', function(){
                if ($('section[data-panel]').length){
                    // Start / Destroy panelSnap depending on window size
                    if ( $('.cell--half').css('float') == 'none' ){
                        $('body').panelSnap('disable');
                        
                    }else{
                        $('body').panelSnap('enable');
                    }
                }
            });
            $(window).on('resize scroll', function(){
                 if ($('section[data-panel]').length){
                    if ( $('.cell--half').css('float') == 'none' ){
                        // If canvas is in full view, show animation
                        $('.canvas').each(function(){
                            if ( isElementInViewport($(this)) ) {
                                $target = $(this).parents('section[data-panel]');
                                $.each(canvasIni, function(index){
                                    if ( $target.index() > canvasIni[index].triggerAnimation || !canvasIni[index].triggerAnimation ){
                                        canvasIni[index].triggerAnimation = $target.index();
                                    }
                                });
                            }
                        });
                    }
                }
            }).trigger('resize');
        },
    };

    // On Ready
    $(function(){
        common.init();
        

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

        // Kick off animation loop!
        requestAnimationFrame(animloop);
    });


})(jQuery);
