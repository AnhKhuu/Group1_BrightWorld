angular.
  module('productCarousel').
  component('productCarousel', {
    templateUrl: 'ProductCarousel/product-carousel.template.html',
    controller: function ProductCarouselCtrl() {
        setTimeout(function(){
            $(".owl-product-carousel").owlCarousel({
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
            });
        })
    }
  });
