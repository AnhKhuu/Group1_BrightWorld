angular.
  module('brightworldApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/', {
          template: '<homepage></homepage>'
        }).
        when('/Sales', {
          template: '<sales></sales>'
        }).
        when('/Product-category', {
          templateUrl: 'ProductCategory/product-category.template.html'
        }).
        when('/About', {
          template: '<about></about>'
        }).
        when('/Product-category/:productId', {
          templateUrl: 'ProductDetail/product-detail.template.html'
        }).
        when('/Homepage/:productId', {
          templateUrl: 'ProductDetail/product-detail.template.html'
        }).
        when('/Checkout', {
          templateUrl: 'Checkout/checkout.template.html'
        }).
        when('/Contact', {
          template: '<contact></contact>'
        })
    }
  ]);