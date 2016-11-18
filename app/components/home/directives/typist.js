(function () {
	'use strict';

	angular
		.module('hrwtzApp')
		.directive('typist', typist);

	typist.$inject = ['$window', '$timeout'];

	function typist ($window, $timeout) {
		var directive = {
			templateUrl: 'components/home/directives/typist.html',
			restrict: 'A',
			scope: {
				sayings: '=typist',
				isMobile: '='
			},
			link: link
		};

		return directive;

		function link (scope, element, attrs) {
			// Set up options
			var options = {
				startDelay: 1000,		// Delay before typist starts
				typeSpeed: 45,			// Delay between tpying each letter
				backSpeed: 30,			// Delay between highlighting previous letter
				backDelay: 3000,		// Delay before starting to highlight phrase
				typeDelay: 100			// Delay before typing phrase
			};

			scope.words = setUpWordsArray();

			scope.highlightedWords = [];

			activate();

			// Set up the words array used in the view
			function setUpWordsArray () {
				var words = [];
				var wordsArray = scope.sayings[0].match(/[\s]|[^\s]+/g);
				wordsArray.forEach(function (word, index) {
					words.push({
						plain: word,
						highlighted: ''
					});
				});
				return words;
			}

			function activate () {

				// Set the height of the typist element on load
				setHeight();

				// After start delay start highlighting phrase
				$timeout(function(){

					backspace();

				}, options.startDelay);

				// Add typist class to element
				element.addClass('typist');

				// On resize, set height of typist element
				angular.element($window).bind('resize', setHeight);

				element.on('$destroy', function () {
					angular.element($window).off('resize', setHeight);
				});
			}

			// Set height of the typist element for the mobile view
			function setHeight(){
				// If on non-mobile sizes, keep height as css set value and exit function
				if (!scope.isMobile){
					element.css('height', '');
					return false;
				}

				// Clone typist and remove inline width / height properties
				var $fakeH2 = element.clone().css({width: element.width(), height: '',}).appendTo('body');
				var typistHeight = 0;

				// For each saying, put it in the fake element and get the greatest height
				scope.sayings.forEach(function(element, index){
					$fakeH2.html(element);
					if ( $fakeH2.height() > typistHeight ){
						typistHeight = $fakeH2.height();
					}
				});

				// Set typist height as the largest the content will make it
				element.css('height', typistHeight);

				// Remove cloned element
				$fakeH2.remove();
			}

			// Controls whether we need to highlight previous text or begin typing 
			// and performs actions based on that
			function backspace(){

				// Slightly randomize highlighting speed to look more human
				var humanize = Math.round(Math.random() * (90)) + options.backSpeed;

				// Contains backspace function in a timeout humanize'd delay
				$timeout(function() {

					// Get the plain text displayed in the view
					var fullText = '';
					scope.words.forEach(function (word, index) {
						fullText += word.plain;
					});

					// Get the next saying's first xx amount of characters
					var nextSayingPartial = scope.sayings[1].substring(0, fullText.length);

					// Compare the two, if the begining of each string is the same, start typing out again
					if (fullText === nextSayingPartial) {

						// After set Delay
						$timeout(function(){

							// Remove the highlighted text
							for (var i = 0; i < scope.words.length; i++) {
								scope.words[i].highlighted = '';
							}

							// Set up the next saying
							scope.sayings.push(scope.sayings.shift());

							// And start type writing function
							typewrite();
						
						}, options.typeDelay);

					} else {
						// Else if we need to highlight more letters

						// Highlight previous letter
						highlightPrevious();

						// Recursion to call this function again
						backspace();

					}

				}, humanize);

			}

			// Highlight the previous letter
			function highlightPrevious(){

				// Loop backwards through the words
				for (var i = scope.words.length - 1; i >= 0; i--) {
					var word = scope.words[i];
					
					// Only continue to do logic if there is non-highlighted text
					if (!scope.words[i].plain) {
						continue;
					}

					// Take a letter from the plain text, and add it to the highlighted
					word.highlighted = word.plain.substring(word.plain.length - 1) + word.highlighted;
					word.plain = word.plain.substring(0, word.plain.length - 1);
					break;
				}

			}


			// Types the next letter, if completed saying is typed call backspace 
			// function, else keep typing
			function typewrite (){

				// Slightly randomize typing speed to look more human
				var humanize = Math.round(Math.random() * (90)) + options.typeSpeed;
				
				// Contains typing function in a timeout humanize'd delay
				$timeout(function() {

					// Break up the current saying into an array to match scope.words
					var sayingArray = scope.sayings[0].match(/[\s]|[^\s]+/g);

					// Loop through the current saying's words
					var isTypingCompleted = true;
					for (var i = 0; i < sayingArray.length; i++) {

						// If the word is empty
						if (scope.words[i] === undefined) {

							// Make the first letter the first letter of the saying's word
							scope.words[i] = {
								plain: sayingArray[i][0],
								highlighted: ''
							};
							isTypingCompleted = false;
							break;

						} else if (scope.words[i].plain !== sayingArray[i]) {

							// If the word in scope.words isn't completed yet, add 
							// the next letter
							scope.words[i].plain += sayingArray[i].charAt(scope.words[i].plain.length);
							isTypingCompleted = false;
							break;

						}
					}

					if (isTypingCompleted){

						// If done typing phrase go to next phrase and start the 
						// highlighting process
						$timeout(function(){
							backspace();
						}, options.backDelay);

					}else{

						// Else keep typing
						typewrite();
						
					}

				}, humanize);
			}
		}
	}
})();