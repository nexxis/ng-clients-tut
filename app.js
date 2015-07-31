angular.module('clients', ['ui.router', 'indexedDB'])
	.config (function ($urlRouterProvider, $stateProvider, $indexedDBProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/',
				controller:'ListClientsCtrl',
				templateUrl:'list.html'
			})
			.state('new', {
				url: '/new',
				controller:'NewClientCtrl',
				templateUrl:'new.html'
			})
			.state('edit', {
				url: '/edit/:clientId',
				controller: 'EditClientCtrl',
				templateUrl:'edit.html'
			})

		$indexedDBProvider
			.connection('ClientsDB')
			.upgradeDatabase(1, function(event, db, tx){
				var objStore = db.createObjectStore('clients', {keyPath: 'id', autoIncrement:true });
				objStore.createIndex('name', 'name', {unique: false});
				objStore.createIndex('contacts', 'cantacts', {unique: false});
			})
	})
	.controller('ListClientsCtrl', function( $scope, $indexedDB ) {

		    $indexedDB.openStore('clients', function(store){
				// store.insert({'name': 'Petr Petrovich', 'email': 'petr@petrovich', 'phone': '913-xxx-xx-xx'});
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

		$scope.addContact = function(contactType, contactName) {
			$scope.person.contacts.push({type: contactType, name: contactName, value: ''})
		}

		$scope.addClient = function () {
			$indexedDB.openStore('clients', function(store) {
				store.insert($scope.person)
				.then(function() {
					$state.go('home')
				});
			})
		};

		$scope.delContact = function (contact) {
			index = $scope.person.contacts.indexOf(contact)
			if(index > -1) {
				$scope.person.contacts.splice(index, 1)
			}
		};

	})
	.controller('EditClientCtrl', function( $scope, $indexedDB, $state ) {

		var clientId = $stateParams.clientId;
		console.log(clientId);

		$scope.addContact = function(contactType, contactName) {
			$scope.person.contacts.push({type: contactType, name: contactName, value: ''})
		}

		$scope.addClient = function () {
			$indexedDB.openStore('clients', function(store) {
				store.insert($scope.person)
				.then(function() {
					$state.go('home')
				});
			})
		};

		$scope.delContact = function (contact) {
			index = $scope.person.contacts.indexOf(contact)
			if(index > -1) {
				$scope.person.contacts.splice(index, 1)
			}
		};

	});