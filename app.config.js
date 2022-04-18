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
          template: '<product-detail></product-detail>'
        }).
        when('/Homepage/:productId', {
          template: '<product-detail></product-detail>'
        }).
        when('/Checkout', {
          templateUrl: 'Checkout/checkout.template.html'
        }).
        when('/Contact', {
          template: '<contact></contact>'
        })
    }
  ]);