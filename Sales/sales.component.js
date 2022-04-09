angular.
  module('sales').
  component('sales', {
    templateUrl: 'Sales/sales.template.html',
    controller: function SalesCtrl() {
        $(".banner-carousel").owlCarousel({
            loop: true,
            margin: 13,
            nav: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true
        });
    }
  });