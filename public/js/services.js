'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services', []).
  factory("retslySvc", function($http, $httpParamSerializerJQLike) {
  	return {

  		getVendorListings: function(options) {
  			var queryString = $httpParamSerializerJQLike(options);
  			var url = "https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&" + queryString
  			console.log("url: " + url);
  			return $http.get(url);
  		},

  		getListingById: function(id, options) {
  			var queryString = $httpParamSerializerJQLike(options);
  			var url = "https://rets.io/api/v1/test/listings/" + id + "?access_token=6baca547742c6f96a6ff71b138424f21&" + queryString;
  			return $http.get(url);
  		}

  	}
  })
