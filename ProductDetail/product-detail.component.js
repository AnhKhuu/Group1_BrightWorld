angular.
  module('productDetail').
  component('productDetail', {
    templateUrl: 'ProductDetail/product-detail.template.html',
    controller: ['$http','$routeParams',function ProductDetailCtrl($http, $routeParams) {
      var self = this;

      self.setImage = function setImage(imageUrl) {
        self.mainImageUrl = imageUrl;
      };

      $http.get('products/'+$routeParams.productId+'.json').then(function(response)
      {
        self.product = response.data;
        self.setImage(self.product.images[0]);
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