'use strict';
angular.module('hrwtzApp')
	.factory('animationObjTriStrokes', [function () {
        function Service (element) {
            var self = this;
            this.element = element;
            this.can = element[0];
            this.ctx = this.can.getContext('2d');
            this.runShapes = true;
            this.shapesCreated = 0;
            this.triStrokesArray = [];

            this.draw = function(){
                
                // Call the function that will draw the triStrokes using a loop
                for (var i = 0; i < self.triStrokesArray.length; i++) {
                    self.triStrokesArray[i].draw();
                }

            };
            this.update = function(countAniFrame){
                
                // Add new triStroke every 30 frames
                if (countAniFrame % 30 == 0 && self.runShapes){
                    self.triStrokesArray.push(new self.triStroke());
                    self.shapesCreated++;
                }
                
                // Call the function that will update the triStrokes using a loop
                for (var i = 0; i < self.triStrokesArray.length; i++) {
                    self.triStrokesArray[i].update();
                }

                // If 4 shapes have been made, animation is finished
                if (self.shapesCreated == 4)
                    self.finished = true;

            };
            this.triStroke = function(){
                // Opacity
                this.opacity = ( Math.random() * .25 ) + .5;

                this.scale = 1;

                this.rotate = 0;

                // Draw triStroke on the canvas
                this.draw = function() {
                    self.ctx.save();
                    self.ctx.translate(self.can.width/2, self.can.height/2);

                    self.ctx.rotate(this.rotate);

                    self.ctx.strokeStyle = 'rgba(255,255,255,'+this.opacity+')';

                    self.ctx.beginPath();

                    self.ctx.lineTo(this.scale * 0, this.scale * -5);
                    self.ctx.lineTo(this.scale * 6, this.scale * 5);
                    self.ctx.lineTo(this.scale * -6, this.scale * 5);
                    self.ctx.lineTo(this.scale * 0, this.scale * -5);
                    self.ctx.lineWidth = 2;
                    self.ctx.closePath();

                    self.ctx.stroke();
                    self.ctx.restore();
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
                        this.x + this.radius > self.can.width || 
                        this.x - this.radius < 0 || 
                        this.y + this.radius > self.can.height || 
                        this.y - this.radius < 0
                        ){
                        for (var key in self.triStrokesArray) {
                            if (self.triStrokesArray[key] == this) {
                                self.triStrokesArray.splice(key, 1);
                            }
                        }
                    }

                }
            }
        };
  		return Service;
	}]);