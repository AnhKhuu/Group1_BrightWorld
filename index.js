var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./Homepage/homepage.html"
        })
        .when("/Sales", {
            templateUrl: "./Sales/sales.html"
        })
        .when("/Contact", {
            templateUrl: "./Contact/contact.html"
        })
        .when("/About", {
            templateUrl: "./About/about.html"
        })
        .when("/Carousel", {
            templateUrl: "./Homepage/carousel.html"
        })
});

app.controller("HomepageCtrl", function ($scope) {
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
            992: {
                items: 4,
                margin: 16
            }
        }
    });
});

app.controller("SalesCtrl", function ($scope) {  
    $(".banner-carousel").owlCarousel({
        loop: true,
        margin: 13,
        nav: false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });
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