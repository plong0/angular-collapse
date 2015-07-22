angular.module('angular-collapse', ['ngAnimate'])
.directive('ngCollapse', ['$animate', function($animate){
	return {
		link: function(scope, elem, attr){

			function collapse(){
				console.log('collapsing...');
			}

			function expand(){
				console.log('expanding...');
			}

			scope.$watch(attr.ngCollapse, function(shouldCollapse){
				if (shouldCollapse) {
				  collapse();
				} else {
				  expand();
				}
			});
		}
	};
}]);