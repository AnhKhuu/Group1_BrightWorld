angular.
  module('homepage').
  component('homepage', {
    templateUrl: 'Homepage/homepage.template.html',
    controller: ['$http',function HomepageCtrl($http) {
      var self = this;
  
      $http.get('products/products.json').then(function(response) {
        self.filteredBestSellers = response.data.filter(function(x){ return parseInt(x.sold) >= 120});
        self.filteredForYou = response.data.filter(function(x){ return x.hasOwnProperty("forYou")});
        self.filteredNewItems = response.data.filter(function(x){ return x.publishDate>"03/04/2022"});
      });

      setTimeout(function(){
        $(".banner-carousel").owlCarousel({
          loop: true,
          margin: 13,
          items: 1,
          autoplay: true,
          autoplayTimeout: 2000,
          autoplayHoverPause: true,
          responsiveClass: true,
          responsive: {
            0: {
              nav: false
            },
            768: {
              nav: true
            }
          }
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
