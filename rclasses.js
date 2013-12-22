/** 
 * rclasses - A plugin that sets classes on elements depending on their width.
 *
 * @class		ResponsiveClasses;
 * @version		1.0
 * @author		Vincent Maglione <vincent@bigsweaterdesign.com>
 * @license		http://www.wtfpl.net/ WTFPL - Do what you want with this here code
 * @description	I built this because respond.js, despite being amazing, seems to 
 *              stop paying attention to @media queries in linked files. To get
 *              around this limitation in browsers that don't support @media queries,
 *              this simply applies a class to the element you need to change at 
 *              whatever breakpoints you define.
 *              
 *              NOTE: This goes by the _element's_ width, not the browser window (unless
 *              you use it on $(window)).
 *              
 *              Just hook this into whichever element you'd like to style 
 * 				responsively. Its only option is an object called 'breakpoints'.
 */
;(function( $, window, document, undefined ) { 
	var ResponsiveClasses = function( el, options ) {
		this.el			= el;
		this.$el		= $(el);
		this.options	= options;
		that			= this;
	}

	ResponsiveClasses.prototype = {
		defaults: {
			breakpoints: {
				'rclass-small':		480,
				'rclass-medium':	640,
				'rclass-large':		960,
				'rclass-xlarge':	1200
			}
		},

		init: function() {
			// Set config options
			this.config = $.extend({}, this.defaults, this.options);

			// Set up initial variables
			this.classIsSet		= false;
			this.classes		= [];
			this.breakpoints	= [];

			// Get all the breakpoints from this.config
			this.getBreakpoints();

			this.resize();

			$(window).on('resize', function(){
				that.resize();
			});

			return this;
		},

		getBreakpoints: function(){
			// Iterates through the {breakpoints} object and stores each 
			// key and value in two separate arrays
			$.each(that.config.breakpoints, function(key, value){
				that.classes.push(key);
				that.breakpoints.push(value);
			});
		},

		getDims: function() {
			// Gets the dimensions of the element's width
			this.elWidth = this.$el.outerWidth();

			return this.elWidth;
		},

		compareDims: function(arr, val) {
			// Compares current width against each value in {breakpoints}.
			// Returns the key of the nearest breakpoint.
			// Thanks to RobG:
			// http://stackoverflow.com/a/19718370/343520
			var i = arr.length;
			while (arr[--i] > val);
			return i;
		},

		getCurrentBreakpoint: function(){
			// Returns the value of the nearest breakpoint.
			this.nextLowest		= this.compareDims(this.breakpoints, this.elWidth);
			this.nextLowest		= this.breakpoints[this.nextLowest];

			return this.nextLowest;
		},

		getOldClass: function(el, arr) {
			// Checks to see if a class from our breakpoints object has been applied,
			// and if so, stores it.
			for(var i = 0; i < arr.length; i++) {
				if($(el).hasClass(arr[i])) {
					that.oldClass = arr[i];
				}
			}
		},

		getNewClass: function(value, obj) {
			// Gets the key (class name) of the numerical value of the current breakpoint
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) {
					if(obj[prop] === value) {
						that.newClass = prop;

						return that.newClass;
					}
				}
			}
		},

		setClass: function() {
			if(this.oldClass !== this.newClass) {
				that.$el
					.removeClass(that.oldClass)
					.addClass(that.newClass);

					//console.log('removed ' + that.oldClass)
					//console.log('added ' + that.newClass)
			}
		},

		resize: function() {
			// Get the element's dimensions
			this.getDims();

			// What's the next lowest breakpoint (in px) compared to current el.outerWidth?
			this.getCurrentBreakpoint();

			// Get the class associated with the current breakpoint
			this.newClass = this.getNewClass(this.nextLowest, this.config.breakpoints);

			// Get the class that's already been applied, if any
			this.getOldClass(this.el, this.classes);

			// Set the new class, if it's changed
			this.setClass();
		}
	}

	ResponsiveClasses.defaults = ResponsiveClasses.prototype.defaults;

	$.fn.rclasses = function(options) {
		return this.each(function() {
			new ResponsiveClasses(this,options).init();
		});
	}

	window.ResponsiveClasses = ResponsiveClasses;
}( jQuery, window , document ));