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

scotchApp.controller('searchController', function($scope, productService) {

	$scope.query = productService.getProducts();

	document.getElementById("query_input").focus();

	$scope.$watch('query', function () {
		if (typeof $scope.query !== "undefined"
		 	&& $scope.query != "") {
				$scope.search();
		}
	});

	$scope.search = function() {
	}

});
