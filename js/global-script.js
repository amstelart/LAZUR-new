/**
 * =================================================================================
 *
 * PLON Component : ScrollParallax
 *
 * @author			Bartosz Perończyk (peronczyk.com)
 * @modified		2017-09-15
 * @repository		https://github.com/peronczyk/plon
 *
 * =================================================================================
 */


(function($) {

	'use strict';

	/** ----------------------------------------------------------------------------
	 * PLUGIN DEFAULT CONFIGURATION
	 */

	var defaults = {
			debug: 0,
			dataSelector: 'data-parallax',
			defaultSpeed: 0.7,
			eventsNamespace: '.plon.scrollparallax',
		},
		$document 		= $(document),
		frameRequested	= false,
		offset, speed;


	/** ----------------------------------------------------------------------------
	 * ADJUST PARALLAX LAYERS
	 */

	function paralaxAdjust(config, layers) {
		for (var n = 0 ; n < layers.length ; n++) {
			offset = $document.scrollTop() * layers[n].speed;
			layers[n].obj.css({transform: 'translate3d(0,' + offset + 'px,0)'});
		}
	}


	/** ----------------------------------------------------------------------------
	 * SET UP JQUERY PLUGIN
	 */

	$.scrollParallax = function(options) {

		// Setup configuration
		var config = $.extend({}, defaults, options);

		// Definitions
		var layers = [],
			_self = $('[' + config.dataSelector + ']'),
			elem,
			layersCount = 0;

		if (config.debug) console.info('Plugin loaded: scrollParallax');

		// Create array of layers
		_self.each(function(index) {
			elem = $(this);
			speed = elem.attr(config.dataSelector);

			layers[index] = {
				'obj'	: elem,
				'speed'	: (speed) ? parseFloat(speed) : config.defaultSpeed,
			}
			layersCount++;
		});

		if (console.debug) console.info('scrollParallax: layers found - ' + layersCount);

		paralaxAdjust(config, layers);

		// Monitor document scrolling
		$(window).on('scroll' + config.eventsNamespace, function() {
			if (frameRequested) return;
			frameRequested = true;
			requestAnimationFrame(function() {
				paralaxAdjust(config, layers);
				frameRequested = false;
			});
		});
	}

})(jQuery);

var debug = 1; // Debug mode

$(function() {

	'use strict';

	$.scrollParallax({
		debug: debug,
	});

});

// Если на проекте jQuery
$( document ).ready(function() {
  // slick
  $(window).on('load resize', function() {
    if ($(window).width() < 768) {
      $('#m-carousel:not(.slick-initialized)').slick({
        centerMode: false,
        variableWidth: true,
        dots: true,
        infinite: false,
        arrows: false,
        speed: 100,
        slidesToShow: 1
      });
    } else {
      $("#m-carousel.slick-initialized").slick("unslick");
    }
  });
  $(window).on('load resize', function() {
    if ($(window).width() < 768) {
      $('#certificates__list:not(.slick-initialized)').slick({
        centerMode: false,
        variableWidth: true,
        dots: true,
        infinite: false,
        arrows: false,
        speed: 100,
		slidesToShow: 3,
		rows: 2
      });
    } else {
      $("#certificates__list.slick-initialized").slick("unslick");
    }
  });
  $(window).on('load resize', function() {
    if ($(window).width() < 768) {
      $('#services-list:not(.slick-initialized)').slick({
        centerMode: false,
        variableWidth: true,
        dots: true,
        infinite: false,
        arrows: false,
        speed: 100,
		slidesToShow: 1
      });
    } else {
      $("#services-list.slick-initialized").slick("unslick");
    }
  });
});

// Изоляция без jQuery
// (function(){
//   // code
// }());
$(function() {
	// init zeynepjs side menu
	var zeynep = $('.zeynep').zeynep({
	  opened: function () {
		// log
		console.log('the side menu opened')
	  },
	  closed: function () {
		// log
		console.log('the side menu closed')
	  }
	})

	// dynamically bind 'closing' event
	zeynep.on('closing', function () {
	  // log
	  console.log('this event is dynamically binded')
	})

	// handle zeynepjs overlay click
	$('.zeynep-overlay').on('click', function () {
	  zeynep.close()
	})

	// open zeynepjs side menu
	$('#main-nav-toggler').on('click', function () {
	  zeynep.open()
	})
  })

// На проекте нет jQuery, но хочется $( document ).ready...
function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
// ready(function(){
//   // code
// });
