var app = angular.module("myApp", ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/",{
        templateUrl:"homepage.html"
    })
    .when("/Sales",{
        templateUrl:"./Sales/sales.html"
    })
    .when("/Contact",{
        templateUrl:"./Contact/contact.html"
    })
    .when("/About",{
        templateUrl:"./About/about.html"
    })
});