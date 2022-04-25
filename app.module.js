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
    $rootScope.subTotal = [0];
    $rootScope.tax = [0];
    $rootScope.total = [0];

    // When the user clicks on the button, scroll to the top of the document
    $rootScope.topFunction = function () {
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

    //Toggle heart
    $scope.favorite = function (index) {

    }
})

app.controller("CheckoutCtrl", function CheckoutCtrl($scope, $http) {
    $http.get('products/provinces.json').then(function (response) {
        $scope.provinces = response.data;
    });

    $scope.completeOrder = function () {  
        alert("Order successfully!")
    }

    $scope.firstName = localStorage.getItem("firstname");
    $scope.lastName = localStorage.getItem("lastname");
    $scope.email = localStorage.getItem("email");
})

app.controller("ProductDetailCtrl", function ProductDetailCtrl($scope, $http, $routeParams) {
    $scope.setImage = function setImage(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    };

    $http.get('products/' + $routeParams.productId + '.json').then(function (response) {
        $scope.product = response.data;
        $scope.setImage($scope.product.images[0]);
        $scope.reviews = $scope.product.reviewers;
        $scope.ratingStaticStar = $scope.product.starRating;
        $scope.quantity = parseInt($scope.product.productQuantity);
        $scope.newPriceCart = parseFloat($scope.product.newPrice.replace("$", ""));
        $scope.oldPriceCart = parseFloat($scope.product.oldPrice.replace("$", ""));
    });

    $scope.rating = 0;
    $scope.ratings = [{
        current: 3,
        max: 5
    }];

    $scope.add = function () {
        $scope.quantity++;
        $scope.newPriceCart = Math.round(parseFloat($scope.product.newPrice.replace("$", "")) * $scope.quantity * 100) / 100;
        if ($scope.product.oldPrice) {
            $scope.oldPriceCart = Math.round(parseFloat($scope.product.oldPrice.replace("$", "")) * $scope.quantity * 100) / 100;
        } else {
            $scope.oldPriceCart = "";
        }
    }

    $scope.remove = function () {
        if ($scope.quantity > 1) {
            $scope.quantity--;
        } else {
            $scope.quantity = 1;
        }
        $scope.newPriceCart = Math.round(parseFloat($scope.product.newPrice.replace("$", "")) * $scope.quantity * 100) / 100;
        if ($scope.product.oldPrice) {
            $scope.oldPriceCart = Math.round(parseFloat($scope.product.oldPrice.replace("$", "")) * $scope.quantity * 100) / 100;
        } else {
            $scope.oldPriceCart = "";
        }
    }

    $scope.addToCart = function () {
        var newProduct = { "imageUrl": $scope.product.imageUrl, "name": $scope.product.name, "oldPrice":"$" + $scope.oldPriceCart, "newPrice":"$" + $scope.newPriceCart, "productQuantity": $scope.quantity };
        $scope.myProduct.push(newProduct);
        $scope.addBuyNowBtn();

        $scope.price.push(parseFloat(newProduct.newPrice.replace("$","")))
    
        console.log($scope.price);

        var subTotalCal = Math.round(parseFloat($scope.price.reduce((total, current) => total + current, 0))*100)/100
        var tax = subTotalCal*110/100;
        var total = tax + 5;

        $scope.subTotal.unshift("$"+subTotalCal);
        $scope.tax.unshift("$"+tax);
        $scope.total.unshift("$"+total);
    }

    $http.get('products/products.json').then(function (response) {
        $scope.relatedProduct = response.data;
    });

    $scope.addReview = function () {
        var userName = localStorage.getItem("firstname")
        var newReview = { "name": userName, "review": $scope.myReview, "avatarUrl": "imgs/ava/user.png", "starRating": $scope.ratings.current };
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

app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating cursorPointer">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});

app.controller('StarStaticCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('products/' + $routeParams.productId + '.json').then(function (response) {
        $scope.product = response.data;
        $scope.ratingStar = parseInt($scope.product.starRating);

        $scope.ratings = [{
            current: $scope.ratingStar,
            max: 5
        }];
    });
}]);

app.controller('StarReviewCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('products/' + $routeParams.productId + '.json').then(function (response) {
        $scope.product = response.data;
        $scope.reviews = $scope.product.reviewers;
        $scope.reviewStar = parseInt($scope.reviews[0].starRating);
        console.log($scope.reviewStar)

        $scope.ratingReviews = [{
            current: $scope.reviewStar,
            max: 5
        }];
    });
}]);

app.directive('starStaticRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});