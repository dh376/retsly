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

      sortListingDetail: function(listing) {

        // clean up text for readability
        var convertToText = function(obj) {
          if (obj instanceof Array) {
            var text = "";
            for (val of obj) {
              text = text + ' ' + val;
            }
            return text;
          } else if (obj == null) {
            return "";
          } else {
            return obj
          }
        }

        var locationInfoKeys = ['address','streetName','streetNumber','city','state','country', 'county','zipCode','zoning','zoneDescription','coordinates'];
        var locationInfo = {};

        var houseSpecsKeys = ['acres','accessibilityFeatures','applications','baths','bedrooms','constructionMaterials','cooling','gas','halfBaths','heating','laundry','livingArea','occupantType','ownership','pool','poolFeatures','poolPrivate','roadSurface','roof','roomsTotal','sewer','stories','storiesTotal','subType','telephoneService','unitsInBuilding','url','vendor','view','waterSource','waterFront','yearBuilt']
        var houseSpecs = {};

        var listingInfoKeys = ['possession','status','statusChanged','termsOfSale']
        var listingInfo = {};

        var priceInfoKeys = ['originalPrice','previousPrice','price','taxAnnual','taxAssessedValue','taxStatus','taxYear']
        var priceInfo = {};

        var otherKeys = ['privateRemarks', 'publicRemarks']
        var other = {};

        for (var key in listing) {

          if (locationInfoKeys.indexOf(key) != -1) {

            var val = convertToText(listing[key]);
            locationInfo[key] =  val;

          } else if (houseSpecsKeys.indexOf(key) != -1) {

            var val = convertToText(listing[key]);
            houseSpecs[key] =  val;

          } else if (listingInfoKeys.indexOf(key) != -1) {

            var val = convertToText(listing[key]);
            listingInfo[key] =  val;

          } else if (priceInfoKeys.indexOf(key) != -1) {

            var val = convertToText(listing[key]);
            priceInfo[key] =  val;

          } else if (otherKeys.indexOf(key) != -1) {

            var val = convertToText(listing[key]);
            other[key] =  val;

          }

        }

        // var finalArr = [];
        // finalArr.push("Location Info");
        // finalArr = finalArr.concat(locationInfo);
        // finalArr.push("House Specs");
        // finalArr = finalArr.concat(finalArr);
        // finalArr.push("Listing Info");
        // finalArr = finalArr.concat(listingInfo);
        // finalArr.push("Price Info");
        // finalArr = finalArr.concat(priceInfo);
        // finalArr.push("Other Info");
        // finalArr = finalArr.concat(other);

        return {
          locationInfo: locationInfo,
          houseSpecs: houseSpecs,
          listingInfo: listingInfo,
          priceInfo: priceInfo,
          other: other
        };
      }

  	}
  })
