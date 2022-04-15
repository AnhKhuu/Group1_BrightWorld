angular.
  module('checkout').
  component('checkout', {
    templateUrl: 'Checkout/checkout.template.html',
    controller: ['$http',function HomepageCtrl($http) {
      var self = this;
  
      $http.get('products/products.json').then(function(response) {
        self.provinces = response.data;
      });
    }]
  });
