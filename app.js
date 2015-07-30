angular.module('clients', [])
.config( function($routeProvider) {
	$routeProvider
	.when('/', {controller:ListCtrl, templateUrl:'list.html'})
	.when('/new', {controller:EditCtrl, templateUrl:'new.html'})
	.otherwise({redirectTo:'/'});
});

