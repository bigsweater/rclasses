rclasses
========

## A jQuery plugin that responsively adds classes to an object based on its width.

[Respond.js](https://github.com/scottjehl/Respond) is awesome and works really well for me...except when including additional stylesheets. I've found that IE <= 8 has the annoying tendency to _continue_ ignoring certain media queries in `<link>`ed stylesheets called after the main one.

So, I created this jQuery plugin. It calculates the width of the element you apply it to, compares that number to a set of breakpoints (either the default breakpoints or ones you create), and applies a class accordingly).

### Usage
1.  Load jQuery
2.  Load the plugin
3.  Apply the plugin to an element you wish to measure. (You can apply it to anything on the page, but I use `<body>`: `$('body').rclasses();`
4.  Use the dynamic classes to style your element.

By default, there are four classes at four breakpoints. They're pretty arbitrary, though:
* `.rclass-small` (480px)
* `.rclass-medium` (640px)
* `.rclass-large` (960px)
* `.rclass-xlarge` (1200px)

That'll get ya started. But if you'd like to use your own breakpoints...

### Options

If you'd like to use your own breakpoints:
```javascript
$('body').rclasses({
	breakpoints: {
		'wee': 320,
		'notsowee': 768,
		'freakinhuge': 1200
	}
});
```
(Classic SNL references optional, but highly recommended.)

The keys in the `breakpoint` object will be used as the classes on the `body` element; the values are the pixel-widths at which the plugin begins to apply the classes. (So, in the above example, when the `body` element is between widths of 320 and 768 pixels, it will have a class of 'wee'.) 

You can also use Modernizr to dynamically load the plugin:
```javascript
Modernizr.load([
	{ // Test for media queries
		test:	Modernizr.mq('only all'),
		nope:	'//your-site.com/assets/js/vendor/rclasses.min.js',
		complete: function(){
			(function($) {
				$(document).ready(function() {
					if(jQuery().rclasses){
						$('body').rclasses();
					}
				});
			})(jQuery);			
		}
	}
]);
```

*NOTE:* The plugin checks the width of _the element you've applied it to_, not the `body` element (unless you applied it to `body`).

### TODO
* Bug: If multiple instances of the plugin are used, only the last one actually gets new classes on resize.
