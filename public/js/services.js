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

      // This api endpoint kept on giving me following error:
      // "Invalid token context. Please use a browser token for this request."
  		getListingById: function(id) {
  			//var queryString = $httpParamSerializerJQLike(options);
  			var url = "https://rets.io/api/v1/test/listings/" + id + "?access_token=6baca547742c6f96a6ff71b138424f21";
  			return $http({
          method: 'GET',
          url: url,
          headers: {
            'authorization': "Bearer 6baca547742c6f96a6ff71b138424f21"
          }
        });
  		},

      ///{vendor}/listings/{listingId}/agent
      // this api endpoint was giving me the same authentication error....
      getAgent: function(id) {
        var url = "https://rets.io/api/v1/test/listings/" + id + "/agent";
        return $http({
          method: 'GET',
          url: url,
          headers: {
            'Authorization': "Bearer 6baca547742c6f96a6ff71b138424f21"
          }
        });
      },

      // The format for authorization header is inconsistent.....
      getOffice: function(id) {
        var url = "https://rets.io/api/v1/test/listings/" + id + "/office";
        return $http({
          method: 'GET',
          url: url,
          headers: {
            'Authorization': "Bearer 6baca547742c6f96a6ff71b138424f21"
          }
        });
      },

  	}
  })
