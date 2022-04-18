angular.
  module('contact').
  component('contact', {
    templateUrl: 'Contact/contact.template.html',
    controller: ['$http',function ContactCtrl($http) {
      var self = this;
      
      self.firstName = localStorage.getItem("firstname")
      self.lastName = localStorage.getItem("lastname")
      self.email = localStorage.getItem("email")

      $http.get('products/addresses.json').then(function(response) {
        self.addresses = response.data;
      });

      $http.get('products/provinces.json').then(function(response) {
        self.provinces = response.data;
      });
    }]
  });