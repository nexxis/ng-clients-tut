angular.module('clients', ['ui.router', 'indexedDB'])
	.config (function ($urlRouterProvider, $stateProvider, $indexedDBProvider) {
		console.log('123')
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/',
				controller:'ListClientsCtrl',
				templateUrl:'list.html',
				onEnter: function() {
					console.log('enter')
				}
			})
			.state('new', {
				url: '/new',
				controller:'NewClientCtrl',
				templateUrl:'new.html'
			})

		$indexedDBProvider
			.connection('ClientsDB')
			.upgradeDatabase(1, function(event, db, tx){
				var objStore = db.createObjectStore('clients', {keyPath: 'id', autoIncrement:true });
				objStore.createIndex('name', 'name', {unique: true});
				objStore.createIndex('contacts', 'cantacts', {unique: false});
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
	.controller('NewClientCtrl', function( $scope, $indexedDB, $state) {

		$scope.person = {
			'name': '',
			'contacts': []
		}

		$scope.addContact = function() {
			$scope.person.contacts.push({type: '', value: ''})
		}

		$scope.addClient = function () {
			$indexedDB.openStore('clients', function(store) {
				store.insert($scope.person)
				.then(function(result) {
					console.log('result', result)
					$state.go('home')
				});
			})
		};

	});