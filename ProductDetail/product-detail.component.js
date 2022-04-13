angular.
  module('productDetail').
  component('productDetail', {
    templateUrl: 'ProductDetail/product-detail.template.html',
    controller: ['$http','$routeParams',function ProductDetailCtrl($http, $routeParams) {
      var self = this;
      $http.get('products/'+$routeParams.productId+'.json').then(function(response)
      {
        self.product = response.data;
      });
      setTimeout(function(){
        $('.product-detail-carousel').owlCarousel(
          {
            loop: true,
            items: 1,
            responsiveClass: true,
            responsive: {
              992: {
                dots: false
              }
            }
          }
        )
      },1000);
    }]
  });