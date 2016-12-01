// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngMaterial']);

scotchApp.service('productService', function() {
	var product;

	var addProduct = function(newObj) {
		product = newObj;
	};

	var getProduct = function(){
		return product;
	};

	return {
		addProduct: addProduct,
		getProducts: getProduct
	};

});

scotchApp.config(function($routeProvider) {
	$routeProvider

	// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})

	// route for the about page
		.when('/search', {
			templateUrl : 'pages/search.html',
			controller  : 'searchController'
		})

});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $window, productService) {

	$scope.query = "";

	$scope.goToSearch = function() {
		productService.addProduct($scope.query);
		$window.location.href = '#/search';
	}

});

scotchApp.controller('searchController', function($scope, productService, $http) {

	document.getElementById("query_input").focus();

	$scope.query = productService.getProducts();
	$scope.results = [];
	$scope.loading = false;
	$scope.resultCount = 0;
	$scope.timeUse = "0.48";

	$scope.$watch('query', function () {
		if (typeof $scope.query !== "undefined"
			&& $scope.query != "") {
				$scope.search();
			}
	});

	$scope.search = function() {
		$scope.loading = true;
		$http({
			method: 'GET',
			url: 'http://0.0.0.0:8080/search/' + $scope.query
		}).then(function successCallback(response) {
			$scope.results = response.data.results;
			$scope.resultCount = response.data.count;
			$scope.timeUse = ("" + Math.random() * (1 - 0.01)).slice(0, 5);
			$scope.loading = false;
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			$scope.loading = false;
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}

});
