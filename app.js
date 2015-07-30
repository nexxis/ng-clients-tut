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
				var objStore = db.createObjectStore('clients', {keyPath: 'id'});
				objStore.createIndex('name', 'name', {unique: false});
				objStore.createIndex('email', 'email', {unique: false});
				objStore.createIndex('phone', 'phone', {unique: false});
				console.log("upgradeDB OK");
			})
	})
	.controller('ListClientsCtrl', function( $scope, $indexedDB ) {

		    $indexedDB.openStore('clients', function(store){

		      store.insert({'id': 1, 'name': 'Petr Petrovich', 'email': 'petr@petrovich', 'phone': '913-xxx-xx-xx'});
		      store.insert({'id': 2, 'name': 'Ivan Ivanovich', 'email': 'ivan@ivanovich', 'phone': '923-xxx-xx-xx'});
		      store.insert({'id': 3, 'name': 'asdfasdf', 'email': 'iasdfh', 'phone': '9asdfxx'});

		      store.getAll().then(function(clients) {  
		        $scope.clients = clients;
		        console.log("запись в scope");
		      });
		  })


	})
	.controller('NewClientCtrl', function( $scope ) {

	});