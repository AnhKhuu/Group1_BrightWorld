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
          template: '<product-category></product-category>'
        }).
        when('/About', {
          template: '<about></about>'
        }).
        when('/Product-category/:productId', {
          template: '<product-detail></product-detail>'
        })
    }
  ]);