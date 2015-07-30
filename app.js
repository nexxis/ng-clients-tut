angular.module('clients', ['ngRoute'])
	.config (function ($routeProvider) {
		$routeProvider
		.when('/', {
			controller:'ListClientsCtrl',
			templateUrl:'list.html'
		})
		.when('/new', {
			controller:'NewClientCtrl',
			templateUrl:'new.html'
		})
		.otherwise({
			redirectTo:'/'
		})
	})
	.controller('ListClientsCtrl', function( $scope ) {
		$scope.clients = [{
			'name': 'Иван',
			'email': 'ivan@ivan',
			'phone': '913 xxx xxxx'
		},
		{
			'name': 'Петр',
			'email': 'petr@petr',
			'phone': '923 xxx xxxx'
		}];
		
	})
	.controller('NewClientCtrl', function( $scope ) {

	});