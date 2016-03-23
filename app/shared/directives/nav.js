'use strict';
angular.module('hrwtzApp')
	.directive('nav', [function(){
		return {
			templateUrl: "app/shared/directives/nav.html",
			restrict: 'A',
			scope: {
				inverse: '=',
				colorIndex: '='
			},
			link: function(scope, element, attrs) {
				// Set up classes for links
				var conditional = scope.inverse === true ? (scope.colorIndex % 2 == 0) : (scope.colorIndex % 2);
				scope.listClass = conditional ? 'bc' + scope.colorIndex : 'bcr';
				scope.textLinkClass = conditional ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' + scope.colorIndex;
				scope.hamburgerLinkClass = conditional ? 'bcr navigation-button--bc' + scope.colorIndex : 'bc' + scope.colorIndex + ' navigation-button--bcr';
				scope.logoClass = conditional ? 'bc' + scope.colorIndex + ' navigation-button--bcr' : 'bcr navigation-button--bc' + scope.colorIndex;
				scope.logoFallback = conditional ? 'logo-main-bcr' : 'logo-main-bc' + scope.colorIndex;
			}
		}
		
		
	}]);