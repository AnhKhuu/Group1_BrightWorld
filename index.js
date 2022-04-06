var app = angular.module("myApp", ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/",{
        templateUrl:"home.html"
    })
    .when("/Cart",{
        templateUrl:"./Cart/cart.html"
    })
});