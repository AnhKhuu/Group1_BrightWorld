angular.
  module('sales').
  component('sales', {
    templateUrl: 'Sales/sales.template.html',
    controller: ['$http',function SalesCtrl($http) {
      var self = this;
  
      $http.get('products/products.json').then(function(response) {
        self.filteredBulb = response.data.filter(function(x){ return x.type == "bulb-light" && x.hasOwnProperty("sale")});
        self.filteredSpot = response.data.filter(function(x){ return x.type == "spot-light" && x.hasOwnProperty("sale")});
        self.filteredSmart = response.data.filter(function(x){ return x.type == "smart-light" && x.hasOwnProperty("sale")});
        self.filteredDecoration = response.data.filter(function(x){ return x.type == "decoration-light" && x.hasOwnProperty("sale")});
      });

      $http.get('products/brands.json').then(function(response) {
        self.brands = response.data;
      });

      setTimeout(function(){
        $(".banner-carousel").owlCarousel({
          loop: true,
          margin: 13,
          nav: true,
          items: 1,
          autoplay: true,
          autoplayTimeout: 2000,
          autoplayHoverPause: true
      });
      },1000);


      setTimeout(function(){
        $('.owl-product-carousel').owlCarousel({
          loop: false,
          margin: 13,
          responsiveClass: true,
          nav: true,
          dots: false,
          responsive: {
              0: {
                  items: 2
              },
              768: {
                  items: 3
              },
              992: {
                  items: 4,
                  margin: 16
              }
          }
          }
        )
      },1000);
    }]
  });