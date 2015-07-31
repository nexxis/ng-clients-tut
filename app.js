angular.module('clients', ['ngRoute', 'indexedDB'])
	.config (function ($routeProvider, $indexedDBProvider) {
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
			});

		$indexedDBProvider
			.connection('ClientsDB')
			.upgradeDatabase(1, function(event, db, tx){
				var objStore = db.createObjectStore('clients', {keyPath: 'id', autoIncrement:true });
				objStore.createIndex('name', 'name', {unique: true});
				objStore.createIndex('email', 'email', {unique: false});
				objStore.createIndex('phone', 'phone', {unique: false});
			})
	})
	.controller('ListClientsCtrl', function( $scope, $indexedDB ) {

		    $indexedDB.openStore('clients', function(store){
				// store.insert({'name': 'Petr Petrovich', 'email': 'petr@petrovich', 'phone': '913-xxx-xx-xx'});
				// store.insert({'name': 'Ivan Ivanovich', 'email': 'ivan@ivanovich', 'phone': '923-xxx-xx-xx'});
				store.getAll().then(function(clients) {  
					$scope.clients = clients;
				});
			})


	})
	.controller('NewClientCtrl', function( $scope, $indexedDB ) {

		$indexedDB.openStore('clients', function(store){
			store.getAll().then(function(clients) {  
				$scope.clients = clients;
			});
		})

		$scope.newClient = function () {
			$indexedDB.openStore('clients', function(store){
				store.insert({'name': 'New', 'email': 'new@new', 'phone': '9139139131'});
				store.getAll().then(function(clients) {  
					$scope.clients = clients;
				});
			})
		};

	});