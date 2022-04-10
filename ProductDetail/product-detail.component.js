angular.
  module('productDetail').
  component('productDetail', {
    templateUrl: 'ProductDetail/product-detail.template.html',
    controller: function ProductDetailCtrl() {
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
    }
  });