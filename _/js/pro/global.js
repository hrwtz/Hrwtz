// Utility for creating objects in older browsers
if ( typeof Object.create !== 'function' ) {
  Object.create = function( obj ) {

    function F() {}
    F.prototype = obj;
    return new F();

  };
}

/*!
 * jQuery panelSnap
 * Version 0.12.0
 *
 * Requires:
 * - jQuery 1.7 or higher (no jQuery.migrate needed)
 *
 * https://github.com/guidobouman/jquery-panelsnap
 *
 * Copyright 2013, Guido Bouman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Date: Wed Feb 13 16:05:00 2013 +0100
 */
(function($, window, document, undefined) {

  var pluginName = 'panelSnap';
  var storageName = 'plugin_' + pluginName;

  var pluginObject = {

    isMouseDown: false,
    isSnapping: false,
    enabled: true,
    scrollInterval: 0,
    scrollOffset: 0,

    init: function(options, container) {

      var self = this;

      self.container = container;
      self.$container = $(container);

      self.$eventContainer = self.$container;
      self.$snapContainer = self.$container;

      if(self.$container.is('body')) {
        self.$eventContainer = $(document);
        self.$snapContainer = $(document.documentElement);

        var ua = navigator.userAgent;
        if(~ua.indexOf('WebKit')) {
          self.$snapContainer = $('body');
        }
      }

      self.scrollInterval = self.$container.height();

      self.options = $.extend(true, {}, $.fn.panelSnap.options, options);

      self.bind();

      if(self.options.$menu !== false && $('.active', self.options.$menu).length > 0) {
        $('.active', self.options.$menu).click();
      } else {
        var $target = self.getPanel(':first');
        self.activatePanel($target);
      }

      return self;

    },

    bind: function() {

      var self = this;

      self.bindProxied(self.$eventContainer, 'scrollstop', self.scrollStop);
      self.bindProxied(self.$eventContainer, 'mousewheel', self.mouseWheel);
      self.bindProxied(self.$eventContainer, 'mousedown', self.mouseDown);
      self.bindProxied(self.$eventContainer, 'mouseup', self.mouseUp);

      self.bindProxied($(window), 'resizestop', self.resize);

      if(self.options.keyboardNavigation.enabled) {
        self.bindProxied($(window), 'keydown', self.keyDown, self.$eventContainer);
      }

      if(self.options.$menu !== false) {
        self.bindProxied($(self.options.$menu), 'click', self.captureMenuClick, self.options.menuSelector);
      }

    },

    bindProxied: function($element, event, method, selector) {

      var self = this;

      selector = typeof selector === 'string' ? selector : null;

      $element.on(event + self.options.namespace, selector, $.proxy(function(e) {

        return method.call(self, e);

      }, self));

    },

    destroy: function() {

      var self = this;

      // Gotta love namespaced events!
      self.$eventContainer.off(self.options.namespace);

      $(window).off(self.options.namespace);

      if(self.options.$menu !== false) {
        $(self.options.menuSelector, self.options.$menu).off(self.options.namespace);
      }

      self.$container.removeData(storageName);

    },

    scrollStop: function(e) {

      var self = this;

      e.stopPropagation();

      if(!self.enabled) {
        return;
      }

      if(self.isMouseDown) {
        self.$eventContainer.one('mouseup' + self.options.namespace, self.processScroll);
        return;
      }

      if(self.isSnapping) {
        return;
      }

      var offset = self.$snapContainer.scrollTop();
      var scrollDifference = offset - self.scrollOffset;
      var maxOffset = self.$container[0].scrollHeight - self.scrollInterval;
      var panelCount = self.getPanel().length;

      var childNumber;
      if(
        scrollDifference < -self.options.directionThreshold &&
        scrollDifference > -self.scrollInterval
      ) {
        childNumber = Math.floor(offset / self.scrollInterval);
      } else if(
        scrollDifference > self.options.directionThreshold &&
        scrollDifference < self.scrollInterval
      ) {
        childNumber = Math.ceil(offset / self.scrollInterval);
      } else {
        childNumber = Math.round(offset / self.scrollInterval);
      }

      childNumber = Math.max(0, Math.min(childNumber, panelCount));

      var $target = self.getPanel(':eq(' + childNumber + ')');

      if(scrollDifference === 0) {
        // Do nothing
      } else if (offset <= 0 || offset >= maxOffset) {
        // Only activate, prevent stuttering
        self.activatePanel($target);
        // Set scrollOffset to a sane number for next scroll
        self.scrollOffset = offset < 0 ? 0 : maxOffset;
      } else {
        self.snapToPanel($target);
      }

    },

    mouseWheel: function(e) {

      var self = this;

      // This event only fires when the user actually scrolls with their input device.
      // Be it a trackpad, legacy mouse or anything else.

      self.$container.stop(true);
      self.isSnapping = false;

    },

    mouseDown: function(e) {

      var self = this;

      self.isMouseDown = true;

    },

    mouseUp: function(e) {

      var self = this;

      self.isMouseDown = false;

      if(self.scrollOffset !== self.$snapContainer.scrollTop()) {
        self.scrollStop(e);
      }

    },

    keyDown: function(e) {

      var self = this;

      var nav = self.options.keyboardNavigation

      if (self.isSnapping) {
        if(e.which == nav.previousPanelKey || e.which == nav.nextPanelKey) {
          e.preventDefault();
          return false;
        }

        return;
      }

      switch(e.which) {
        case nav.previousPanelKey:
          e.preventDefault();
          self.snapTo('prev', nav.wrapAround);
          break;
        case nav.nextPanelKey:
          e.preventDefault();
          self.snapTo('next', nav.wrapAround);
          break;
      }

    },

    resize: function(e) {

      var self = this;

      self.scrollInterval = self.$container.height();

      if(!self.enabled) {
        return;
      }

      var $target = self.getPanel('.active');

      self.snapToPanel($target);

    },

    captureMenuClick: function(e) {

      var self = this;

      var panel = $(e.currentTarget).data('panel');
      var $target = self.getPanel('[data-panel="' + panel + '"]');

      self.snapToPanel($target);

      return false;

    },

    snapToPanel: function($target) {

      var self = this;

      if (!($target instanceof jQuery)) {
        return;
      }

      self.isSnapping = true;

      self.options.onSnapStart.call(self, $target);
      self.$container.trigger('panelsnap:start', [$target]);

      var scrollTarget = 0;
      if(self.$container.is('body')) {
        scrollTarget = $target.offset().top;
      } else {
        scrollTarget = self.$snapContainer.scrollTop() + $target.position().top;
      }

      self.$snapContainer.stop(true).animate({
        scrollTop: scrollTarget
      }, self.options.slideSpeed, function() {

        self.scrollOffset = scrollTarget;
        self.isSnapping = false;

        // Call callback
        self.options.onSnapFinish.call(self, $target);
        self.$container.trigger('panelsnap:finish', [$target]);

      });

      self.activatePanel($target);

    },

    activatePanel: function($target) {

      var self = this;

      self.getPanel('.active').removeClass('active');
      $target.addClass('active');

      if(self.options.$menu !== false) {
        var activeItemSelector = '> ' + self.options.menuSelector + '.active';
        $(activeItemSelector, self.options.$menu).removeClass('active');

        var attribute = '[data-panel="' + $target.data('panel') + '"]';
        var itemSelector = '> ' + self.options.menuSelector + attribute;
        var $itemToActivate = $(itemSelector, self.options.$menu);
        $itemToActivate.addClass('active');
      }

      self.options.onActivate.call(self, $target);
      self.$container.trigger('panelsnap:activate', [$target]);

    },

    getPanel: function(selector) {

      var self = this;

      if(typeof selector === 'undefined') {
        selector = '';
      }

      var panelSelector = '> ' + self.options.panelSelector + selector;
      return $(panelSelector, self.$container);

    },

    snapTo: function(target, wrap) {

      var self = this;

      if(typeof wrap !== 'boolean') {
        wrap = true;
      }

      var $target;

      switch(target) {
        case 'prev':

          $target = self.getPanel('.active').prev(self.options.panelSelector);
          if($target.length < 1 && wrap)
          {
            $target = self.getPanel(':last');
          }
          break;

        case 'next':

          $target = self.getPanel('.active').next(self.options.panelSelector);
          if($target.length < 1 && wrap)
          {
            $target = self.getPanel(':first');
          }
          break;

        case 'first':

          $target = self.getPanel(':first');
          break;

        case 'last':

          $target = self.getPanel(':last');
          break;
      }

      if($target.length > 0) {
        self.snapToPanel($target);
      }

    },

    enable: function() {

      var self = this;

      // Gather scrollOffset for next scroll
      self.scrollOffset = self.$container[0].scrollHeight;

      self.enabled = true;

    },

    disable: function() {

      var self = this;

      self.enabled = false;

    },

    toggle: function() {

      var self = this;

      if(self.enabled) {
        self.disable();
      } else {
        self.enable();
      }

    }

  };

  $.fn[pluginName] = function(options) {

    var args = Array.prototype.slice.call(arguments);

    return this.each(function() {

      var pluginInstance = $.data(this, storageName);
      if(typeof options === 'object' || options === 'init' || ! options) {
        if(!pluginInstance) {
          if(options === 'init') {
            options = args[1] || {};
          }

          pluginInstance = Object.create(pluginObject).init(options, this);
          $.data(this, storageName, pluginInstance);
        } else {
          $.error('Plugin is already initialized for this object.');
          return;
        }
      } else if(!pluginInstance) {
        $.error('Plugin is not initialized for this object yet.');
        return;
      } else if(pluginInstance[options]) {
        var method = options;
        options = args.slice(1);
        pluginInstance[method].apply(pluginInstance, options);
      } else {
        $.error('Method ' +  options + ' does not exist on jQuery.panelSnap.');
        return;
      }

    });

  };

  $.fn[pluginName].options = {
    $menu: false,
    menuSelector: 'a',
    panelSelector: 'section',
    namespace: '.panelSnap',
    onSnapStart: function(){},
    onSnapFinish: function(){},
    onActivate: function(){},
    directionThreshold: 50,
    slideSpeed: 200,
    keyboardNavigation: {
      enabled: false,
      nextPanelKey: 40,
      previousPanelKey: 38,
      wrapAround: true
    }
  };

})(jQuery, window, document);

/*!
 * Special flavoured jQuery Mobile scrollstart & scrollstop events.
 * Version 0.1.3
 *
 * Requires:
 * - jQuery 1.7.1 or higher (no jQuery.migrate needed)
 *
 * Copyright 2013, Guido Bouman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Date: Wed Feb 13 16:05:00 2013 +0100
 */
(function($) {

  // Also handles the scrollstop event
  $.event.special.scrollstart = {

    enabled: true,

    setup: function() {

      var thisObject = this;
      var $this = $(thisObject);
      var scrolling;
      var timer;

      $this.data('scrollwatch', true);

      function trigger(event, scrolling) {

        event.type = scrolling ? "scrollstart" : "scrollstop";
        $this.trigger(event);

      }

      $this.on("touchmove scroll", function(event) {

        if(!$.event.special.scrollstart.enabled) {
          return;
        }

        if(!$.event.special.scrollstart.scrolling) {
          $.event.special.scrollstart.scrolling = true;
          trigger(event, true);
        }

        clearTimeout(timer);
        timer = setTimeout(function() {
          $.event.special.scrollstart.scrolling = false;
          trigger(event, false);
        }, 50);

      });

    }

  };

  // Proxies scrollstart when needed
  $.event.special.scrollstop = {

    setup: function() {

      var thisObject = this;
      var $this = $(thisObject);

      if(!$this.data('scrollwatch')) {
        $(this).on('scrollstart', function(){});
      }

    }

  };

})(jQuery);

/*!
 * Resizestart and resizestop events.
 * Version 0.0.1
 *
 * Requires:
 * - jQuery 1.7.1 or higher (no jQuery.migrate needed)
 *
 * Copyright 2013, Guido Bouman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Date: Fri Oct 25 15:05:00 2013 +0100
 */
(function($) {

  // Also handles the resizestop event
  $.event.special.resizestart = {

    enabled: true,

    setup: function() {

      var thisObject = this;
      var $this = $(thisObject);
      var resizing;
      var timer;

      $this.data('resizewatch', true);

      function trigger(event, resizing) {

        event.type = resizing ? "resizestart" : "resizestop";
        $this.trigger(event);

      }

      $this.on("resize", function(event) {

        if(!$.event.special.resizestart.enabled) {
          return;
        }

        if(!$.event.special.resizestart.resizing) {
          $.event.special.resizestart.resizing = true;
          trigger(event, true);
        }

        clearTimeout(timer);
        timer = setTimeout(function() {
          $.event.special.resizestart.resizing = false;
          trigger(event, false);
        }, 200);

      });

    }

  };

  // Proxies resizestart when needed
  $.event.special.resizestop = {

    setup: function() {

      var thisObject = this;
      var $this = $(thisObject);

      if(!$this.data('resizewatch')) {
        $(this).on('resizestart', function(){});
      }

    }

  };

})(jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
(function($) {

  var types = ['DOMMouseScroll', 'mousewheel'];

  if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
      $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
  }

  $.event.special.mousewheel = {
    setup: function() {
      if ( this.addEventListener ) {
        for ( var i=types.length; i; ) {
          this.addEventListener( types[--i], handler, false );
        }
      } else {
        this.onmousewheel = handler;
      }
    },

    teardown: function() {
      if ( this.removeEventListener ) {
        for ( var i=types.length; i; ) {
          this.removeEventListener( types[--i], handler, false );
        }
      } else {
        this.onmousewheel = null;
      }
    }
  };

  $.fn.extend({
    mousewheel: function(fn) {
      return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },

    unmousewheel: function(fn) {
      return this.unbind("mousewheel", fn);
    }
  });

  function handler(event) {
    var orgEvent = event || window.event,
        args = [].slice.call( arguments, 1 ),
        delta = 0,
        returnValue = true,
        deltaX = 0,
        deltaY = 0;

    event = $.event.fix(orgEvent);
    event.type = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
      deltaY = 0;
      deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    return ($.event.dispatch || $.event.handle).apply(this, args);
  }

})(jQuery);
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

            // Use ajax to pull in svg file and enable caching
            $(document.body).prepend($('<div>').hide().load(pagebase + '_/img/svg-defs.svg', function(){}));

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
                            if ( $target.index()-1 > canvasIni[index].triggerAnimation || !canvasIni[index].triggerAnimation ){
                                canvasIni[index].triggerAnimation = $target.index()-1;
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

            // Block section cubing
            $(window).resize(function(){
                $('.block-face').each(function(){
                    if ($(this).hasClass('block-face--top')){
                        $(this).css('transform', 'translateZ(' + $(this).outerHeight() / 2 + 'px)')
                    }else{
                        $(this).css('transform', 'rotateX(-90deg)  translateZ(' + -$(this).outerHeight() / 2 + 'px)')
                    }
                });
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
                                    if ( $target.index() - 1 > canvasIni[index].triggerAnimation || !canvasIni[index].triggerAnimation ){
                                        canvasIni[index].triggerAnimation = $target.index() - 1;
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
