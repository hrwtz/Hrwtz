(function($) {
	var home = {
		init: function(){

		}
	}

	var common = {
		init: function(){


		}
	}

	// On Ready
	$(function(){

		common.init();
		
		if ($('body').hasClass('home')){
			home.init();
		}
		
	});


})(jQuery);