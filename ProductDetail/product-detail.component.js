angular.
  module('productDetail').
  component('productDetail', {
    templateUrl: 'ProductDetail/product-detail.template.html',
    controller: ['$http','$routeParams',function ProductDetailCtrl($http, $routeParams) {
      var self = this;
      self.quantity = 1;
      self.add = function() {
        self.quantity++;
      }
      self.remove = function() {
        if(self.quantity>=1)
        {
          self.quantity--;
        } else {
          self.quantity = 0;
        }
      }
      self.setImage = function setImage(imageUrl) {
        self.mainImageUrl = imageUrl;
      };

      $http.get('products/'+$routeParams.productId+'.json').then(function(response)
      {
        self.product = response.data;
        self.setImage(self.product.images[0]);
        self.reviews = self.product.reviewers;
        self.ratings = self.product.starRating;
      });

      $http.get('products/products.json').then(function(response) {
        // self.relatedProduct = response.data.filter(function(x){ return x.type == self.product.type});
        self.relatedProduct = response.data;
      });

      // var productRatingInput = $("#productRatingInput").val();

      // console.log(productRatingInput)

      // var fiveStar = "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>"
      // var fourStar = "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>"
      // var threeStar = "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>"
      // var twoStar = "<span class='material-icons star'> star </span>" + "<span class='material-icons star'> star </span>"
      // var oneStar = "<span class='material-icons star'> star </span>"

      // $(function () {  
      //   $( "#productRating" ).append(fiveStar)

      //   if(parseInt(self.ratings)<=5)
      //   {
      //     $( "#productRating" ).append(fiveStar)
      //   } else if(parseInt(self.ratings)<=4)
      //   {
      //     $( "#productRating" ).append(fourStar)
      //   } else if(parseInt(self.ratings)<=3)
      //   {
      //     $( "#productRating" ).append(threeStar)
      //   } else if(parseInt(self.ratings)<=2)
      //   {
      //     $( "#productRating" ).append(twoStar)
      //   } else if(parseInt(self.ratings)<=1)
      //   {
      //     $( "#productRating" ).append(oneStar)
      //   }
      // })

      self.addReview = function() {
        var userName = localStorage.getItem("firstname")
        var newReview = {"name": userName, "review": self.myReview, "avatarUrl": "imgs/ava/user.png"};
        self.reviews.push(newReview);
      }

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