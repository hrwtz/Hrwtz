'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.factory('animationObjSplit', [function () {
        // Get mid point of a line given two points and midpoint percentage position
        // http://stackoverflow.com/a/1934226/1552042
        function getMidPoint(point1, point2, r){
            var point3 = {};

            // Find point that divides the segment into the ratio (1-r):r
            point3.x = r * point2.x + (1 - r) * point1.x;
            point3.y = r * point2.y + (1 - r) * point1.y;

            return point3;
        }


        function Service (element) {
            var self = this;
            this.element = element;
            this.can = element[0];
            this.ctx = this.can.getContext('2d');
            this.split = [];

            this.init = function (triangleService){
                var triangle = triangleService;
                // Set up vars
                // self.start = countAniFrame;
                self.start = 100;

                self.split[0] = {Coords: {}};
                self.split[1] = {Coords: {}};
                self.triangle = jQuery.extend(true, {}, triangle);
                triangle.destroy();
                
                // Get split shape 0 coords
                self.split[0].Coords[0] = self.triangle.triCoords[2];
                self.split[0].Coords[1] = self.triangle.triCoords[0];
                self.split[0].Coords[2] = getMidPoint(self.triangle.triCoords[0], self.triangle.triCoords[1], 0.3);
                self.split[0].Coords[3] = getMidPoint(self.triangle.triCoords[1], self.triangle.triCoords[2], 0.6);
                self.split[0].vx = -0.5;
                self.split[0].vy = -1.3;
                self.split[0].vrotate = 0.002;
                self.split[0].rotate = 0;

                // Get split shape 1 coords
                self.split[1].Coords[0] = self.triangle.triCoords[1];
                self.split[1].Coords[1] = getMidPoint(self.triangle.triCoords[0], self.triangle.triCoords[1], 0.3);
                self.split[1].Coords[2] = getMidPoint(self.triangle.triCoords[1], self.triangle.triCoords[2], 0.6);
                self.split[1].vx = 0.5;
                self.split[1].vy = 1.3;
                self.split[1].vrotate = 0.0005;
                self.split[1].rotate = 0;
            };
            this.draw = function () {
                self.ctx.save();
                self.ctx.fillStyle = 'rgba(255,255,255,'+1+')';
                self.ctx.translate(self.can.width/2, self.can.height/2);
                self.ctx.scale(self.triangle.scale, self.triangle.scale);

                $.each(self.split, function (index, splitValue){
                    self.ctx.rotate(splitValue.rotate);

                    self.ctx.beginPath();
                    self.ctx.lineTo(splitValue.Coords[0].x, splitValue.Coords[0].y);
                    $.each(splitValue.Coords, function (index, Coords){
                        if (index === 0) {
                            return;
                        }
                        self.ctx.lineTo(Coords.x, Coords.y);    
                    });
                    self.ctx.lineTo(splitValue.Coords[0].x, splitValue.Coords[0].y);
                    self.ctx.fill();
                    self.ctx.closePath();
                });

                self.ctx.restore();
            };
            this.update = function (countAniFrame) {
                $.each(self.split, function (index, splitValue){
                    $.each(splitValue.Coords, function (index, Coords){
                        Coords.x +=  splitValue.vx;
                        Coords.y +=  splitValue.vy;

                        // If coordinates are off screen and they are going slow enough, stop them
                        if (!self.superCharged &&
                            (!(splitValue.vx > 0.04 || splitValue.vx < -0.04)) && 
                            ((Coords.x > $(self.can).width() / 2 || Coords.x < -$(self.can).width() / 2) ||
                                (Coords.y > $(self.can).height() / 2 || Coords.y < -$(self.can).height() / 2))){
                            splitValue.vx = 0;
                            splitValue.vy = 0;
                        }
                    });
                    if (!self.superCharged){
                        if ( countAniFrame - self.start >= 40){
                            

                            if (splitValue.vx > 0.04 || splitValue.vx < -0.04){
                                splitValue.vx *= 0.985;
                            }
                            if (splitValue.vy > 0.04 || splitValue.vy < -0.04){
                                splitValue.vy *= 0.985;
                            }

                            if ( countAniFrame - self.start > 60){
                                splitValue.vrotate *= 0.99;
                            }

                        }else{
                            // Slowly slow down shapes for first 40 frames
                            splitValue.vx *= 0.9995;
                            splitValue.vy *= 0.9995;
                        }
                    }
                    splitValue.rotate += splitValue.vrotate;
               });
            };
  		}

  		return Service;
	}]);