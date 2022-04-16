var app = angular.module('brightworldApp', [
    'ngRoute',
    'productCarousel',
    'homepage',
    'sales',
    'productDetail',
    'cart',
    'about',
    'contact'
]);

app.controller("SignupCtrl", function SignupCtrl($scope) {  
    $scope.add = function(){
        var newUser = {"name": $scope.uName, "salary": $scope.uSalary, "department": $scope.uDepartment};
        $scope.list.push(newUser);
        alert("Registry successfully!");
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
    $http.get('products/provinces.json').then(function(response) {
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
    });

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