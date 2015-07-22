angular.module('angular-collapse', ['ngAnimate'])
.directive('ngCollapse', ['$animate', function($animate){
	return {
		link: function(scope, element, attrs){

			function collapse(){
				console.log('collapsing...');

				element
				  // IMPORTANT: The height must be set before adding "collapsing" class.
				  // Otherwise, the browser attempts to animate from height 0 (in
				  // collapsing class) to the given height here.
				  .css({height:element[0].scrollHeight + 'px'})
				  // initially all panel collapse have the collapse class, this removal
				  // prevents the animation from jumping to collapsed state
				  .removeClass('collapse')
				  .addClass('collapsing')
				  .attr('aria-expanded', false)
				  .attr('aria-hidden', true);


				collapseDone();
			}

			function collapseDone(){

				element.css({height: 0});
				element.removeClass('collapsing');
				element.addClass('collapse');

			}

			function expand(){
				console.log('expanding...');

				element.removeClass('collapse')
				  .addClass('collapsing')
				  .attr('aria-expanded', true)
				  .attr('aria-hidden', false);

				  expandDone();
			}

			function expandDone(){

				element.removeClass('collapsing');
				element.css({height: 'auto'});
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