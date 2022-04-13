angular.
  module('productCategory').
  component('productCategory', {
    templateUrl: 'ProductCategory/product-category.template.html',
    controller: ['$http',function ProductCategoryCtrl($http) {
      var self = this;

      $http.get('products/products.json').then(function(response) {
        self.products = response.data;
      });
    }]
  });