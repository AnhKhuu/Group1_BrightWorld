var app = angular.module('brightworldApp', [
    'ngRoute',
    'homepage',
    'sales',
    'about',
    'contact'
]);

app.run(function ($rootScope, $http) {
    $rootScope.myProduct = [];
    $http.get('products/addresses.json').then(function (response) {
        $rootScope.addresses = response.data;
    });

    $rootScope.addBuyNowBtn = function () {
        if ($rootScope.myProduct.length > 0 && $rootScope.myProduct.length < 2) {
            $(".btn-bar-cart").append("<a href='#!Checkout' id='buyNow' class='btn buy-now w-100'>Check out</a>")
        }
    }

    $rootScope.delete = function (i) {
        $rootScope.myProduct.splice(i, 1);
        if ($rootScope.myProduct.length == 0) {
            $("#buyNow").detach();
        }
    }

    $rootScope.price = [];

    for(let i=0; i<$rootScope.myProduct.length; i++)
    {
        $rootScope.price.push($rootScope.myProduct[i].newPrice)
    }

    $rootScope.subTotal = $rootScope.price.reduce((total, current) => total+current,0);

    // When the user clicks on the button, scroll to the top of the document
    $rootScope.topFunction = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
})

app.controller("ProductCategoryCtrl", function ProductCategoryCtrl($scope, $http) {
    $http.get('products/products.json').then(function (response) {
        $scope.products = response.data;
    });

    // Filter By Brand
    $scope.filterBrand = [];
    $scope.filterByBrandCategory = filterByBrandCategory;
    $scope.getBrandCategories = getBrandCategories;

    function filterByBrandCategory(product) {
        return $scope.filterBrand[product.brand] || noFilter($scope.filterBrand);
    }

    function getBrandCategories() {
        return ($scope.products || []).
            map(function (product) { return product.brand; }).
            filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
    }

    function noFilter(filterObj) {
        return Object.
            keys(filterObj).
            every(function (key) { return !filterObj[key]; });
    }

    // Filter By Type
    $scope.filterType = [];
    $scope.filterByTypeCategory = filterByTypeCategory;
    $scope.getTypeCategories = getTypeCategories;

    function filterByTypeCategory(product) {
        return $scope.filterType[product.type] || noFilter($scope.filterType);
    }

    function getTypeCategories() {
        return ($scope.products || []).
            map(function (product) { return product.type; }).
            filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
    }
})

app.controller("CheckoutCtrl", function CheckoutCtrl($scope, $http) {
    $http.get('products/provinces.json').then(function (response) {
        $scope.provinces = response.data;
    });
})

app.controller("ProductDetailCtrl", function ProductDetailCtrl($scope, $http, $routeParams) {

    $scope.setImage = function setImage(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    };

    $http.get('products/' + $routeParams.productId + '.json').then(function (response) {
        $scope.product = response.data;
        $scope.setImage($scope.product.images[0]);
        $scope.reviews = $scope.product.reviewers;
        $scope.ratings = $scope.product.starRating;
        $scope.quantity = parseInt($scope.product.productQuantity);
    });

    $scope.add = function () {
        $scope.quantity++;
        $scope.oldPriceCart = "$" + Math.round(parseFloat($scope.product.oldPrice.replace("$", "")) * $scope.quantity * 100) / 100;
        $scope.newPriceCart = "$" + Math.round(parseFloat($scope.product.newPrice.replace("$", "")) * $scope.quantity * 100) / 100;
    }

    $scope.remove = function () {
        if ($scope.quantity > 1) {
            $scope.quantity--;
        } else {
            $scope.quantity = 1;
        }
        $scope.oldPriceCart = "$" + Math.round(parseFloat($scope.product.oldPrice.replace("$", "")) * $scope.quantity * 100) / 100;
        $scope.newPriceCart = "$" + Math.round(parseFloat($scope.product.newPrice.replace("$", "")) * $scope.quantity * 100) / 100;
    }

    $scope.addToCart = function () {
        var newProduct = { "imageUrl": $scope.product.imageUrl, "name": $scope.product.name, "oldPrice": $scope.oldPriceCart, "newPrice": $scope.newPriceCart, "productQuantity": $scope.quantity };
        $scope.myProduct.push(newProduct);
        $scope.addBuyNowBtn();
    }

    $http.get('products/products.json').then(function (response) {
        $scope.relatedProduct = response.data;
    });

    $scope.addReview = function () {
        var userName = localStorage.getItem("firstname")
        var newReview = { "name": userName, "review": $scope.myReview, "avatarUrl": "imgs/ava/user.png" };
        $scope.reviews.push(newReview);
    }

    setTimeout(function () {
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
    }, 1000);

    setTimeout(function () {
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
    }, 1000);
})