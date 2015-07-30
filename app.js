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
			.connection('myIndexedDB')
			.upgradeDatabase(1, function(event, db, tx){
				var objStore = db.createObjectStore('people', {keyPath: 'ssn'});
				objStore.createIndex('name_idx', 'name', {unique: false});
				objStore.createIndex('age_idx', 'age', {unique: false});
			})
			.upgradeDatabase(2, function(event, db, tx){
				db.createObjectStore('peoplePhones', {keyPath: 'person_ssn'});
			});
	})
	.controller('ListClientsCtrl', function( $scope, $indexedDB ) {
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


			$scope.objects = [];

		    $indexedDB.openStore('people', function(store){

		      store.insert({"ssn": "444-444-222-111","name": "John Doe", "age": 57}).then(function(e){
		      	console.log("promise");
		      });

		      store.getAll().then(function(people) {  
		        // Update scope
		        $scope.objects = people;
		      });
		  })


	})
	.controller('NewClientCtrl', function( $scope ) {

	});