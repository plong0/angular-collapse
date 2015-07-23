angular.module('angular-collapse', [])
.directive('ngCollapse', ['$animate', '$timeout', function($animate, $timeout){
	return {
		link: function(scope, element, attrs){
			// main collapse class, use collapse-options to override transition settings
			element.addClass('collapse');

			var init = true;
			var config;
			var animator;

			function expand(){
				if(init){ return expandDone(); }

				// before setting up the animation, add the in class so the element is displayed (and we can read its rendered dimensions)
				element.addClass('in')
				  .attr('aria-expanded', true)
				  .attr('aria-hidden', false);

			    var css = {};
			    var animate = { to: {}, from: {} };

			    // build the animation

			    // vertical
			    if(!config || config.vertical){
			    	animate.from.height = '0';
			    	animate.to.height = element[0].scrollHeight + 'px';
			    }

			    // horizontal
			    if(config && config.horizontal){
			    	animate.from.width = '0';
			    	animate.to.width = element[0].scrollWidth + 'px';
			    }

			    // set the appropriate transition properties
			    var animate_props = Object.keys(animate.to);
			    animate_props.push('visibility');
			    css['-webkit-transition-property'] = css['transition-property'] = animate_props.join(',');

			    // apply the css needed for the transition
			    element.css(css)

			    // cancel any existing animations
				if(animator){
					$animate.cancel(animator);
				}

				// animate with the collapsing class applied
				animator = $animate.animate(element, animate.from, animate.to, 'collapsing');
				animator.then(expandDone);
			}

			function expandDone(){
				if(animator){ delete animator; }

				// reset element's style for expanded state
				var css = {};

				// vetical
				if(!config || config.vertical){
					css.height =  'auto';
				}

				// horizontal
				if(config && config.horizontal){
					css.width = 'auto';
				}

				// reset transition properties
				css['transition-property'] = css['-webkit-transition-property'] = 'all';

				// apply post-expand css
				element.css(css)
						.addClass('in');
			}


			function collapse(){
				if(init){ return collapseDone(); }

				var css = {};
				var animate = { to: {}, from: {} };

				if(!config || config.vertical){
					//css.height = element[0].scrollHeight + 'px';
					animate.from.height = element[0].scrollHeight + 'px';
					animate.to.height = '0';
				}

				if(config && config.horizontal){
					//css.width = element[0].scrollWidth + 'px';
					animate.from.width = element[0].scrollWidth + 'px';
					animate.to.width = '0';
				}

				// set the appropriate transition properties
				var animate_props = Object.keys(animate.to);
				animate_props.push('visibility');
				css['-webkit-transition-property'] = css['transition-property'] = animate_props.join(', ');

				// apply the css needed for the transition
				element.css(css)
						.removeClass('in')	// remove the in class before animating to prevent flicker at end (collapsing class has display: block)
						.attr('aria-expanded', false)
				  		.attr('aria-hidden', true);				  

				// cancel any existing animations
				if(animator){
					$animate.cancel(animator);
				}

				// animate with the collapsing class applied
				animator = $animate.animate(element, animate.from, animate.to, 'collapsing');
				animator.then(collapseDone);
			}

			function collapseDone(){
				if(animator){ delete animator; }
				
				// reset element's style for collapsed state
				var css = {};

				// vertical
				if(!config || config.vertical){
					css.height = '0';
				}

				// horizontal
				if(config && config.horizontal){
					css.width = '0';
				}

				// reset transition properties
				css['transition-property'] = css['-webkit-transition-property'] = 'all';

				// apply post-collapse css
				element.css(css);
			}

			// watch the ng-collapse toggler
			scope.$watch(attrs.ngCollapse, function(shouldCollapse){
				if (shouldCollapse) {
				  collapse();
				} else {
				  expand();
				}
				if(init){ init = false; } // initialization done
			});

			// watch the collapse-options, reading them into config
			scope.$watchCollection(attrs.collapseOptions, function(options){
				config = options;
			});
		}
	};
}]);