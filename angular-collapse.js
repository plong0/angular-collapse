angular.module('angular-collapse', [])
.directive('ngCollapse', ['$animate', function($animate){
	return {
		link: function(scope, element, attrs){

			function expand(){
				element.removeClass('collapse')
				  .addClass('collapsing')
				  .attr('aria-expanded', true)
				  .attr('aria-hidden', false);

			    var animate = { to: {} };

			    animate.to.height = element[0].scrollHeight + 'px';

				$animate.addClass(element, 'in', animate).then(expandDone);
			}

			function expandDone(){
				var css = {};
				css.height =  'auto';

				element.removeClass('collapsing');
				element.css(css);
			}


			function collapse(){
				var css = {};
				var animate = { to: {} };
				
				css.height = element[0].scrollHeight + 'px';
				animate.to.height = '0';

				element
				  // IMPORTANT: The height must be set before adding "collapsing" class.
				  // Otherwise, the browser attempts to animate from height 0 (in
				  // collapsing class) to the given height here.
				  .css(css)
				  // initially all panel collapse have the collapse class, this removal
				  // prevents the animation from jumping to collapsed state
				  .removeClass('collapse')
				  .addClass('collapsing')
				  .attr('aria-expanded', false)
				  .attr('aria-hidden', true);

				$animate.removeClass(element, 'in', animate).then(collapseDone);
			}

			function collapseDone(){
				var css = {};
				css.height = 0;

				element.css(css);
				element.removeClass('collapsing');
				element.addClass('collapse');
			}

			

			scope.$watch(attrs.ngCollapse, function(shouldCollapse){
				if (shouldCollapse) {
				  collapse();
				} else {
				  expand();
				}
			});
		}
	};
}]);