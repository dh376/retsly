'use strict';

/* Controllers */

angular.module('controllers', []).
  controller('MainCtrl', function ($scope, $http, $state, retslySvc) {

    console.log("MainCtrl");

    // scope properties 
    angular.extend( $scope, {
    	limit: 20, // limit to 20 postings each call
    	sortByOptions: [
    		'id', 'office', 'mlsOfficeID', 'agent', 'mlsAgentID', 'parcelNumber', 'price', 'listDate', 'yearBuilt', 'status', 'city', 'previousPrice', 'originalPrice', 'closePrice', 'acres', 'livingArea', 'bedrooms', 'baths', 'garageSpaces', 'stories', 'dateSold', 'expirationDate', 'daysOnMarket', 'lastModified', 'statusChange', 'type', 'subtype'
    	],
    	order: "", // "asc" or "desc"
    	query: {
    		fields: "id,mlsListingId,address,unitNumber,streetName,city,zipCode,listDate,price,expirationDate,ownership,yearBuilt,daysOnMarket,bedrooms,squareFootage" // default fields // will make it dynamic later
    	},
    	listings: []
    });

    // scope functions
    angular.extend($scope, {
    	search: function() {


    			console.log('query: ', $scope.query);

		    	retslySvc.getVendorListings($scope.query).then(function(res) {
		    		
		    		$scope.listings = res.data.bundle;
		    		console.log($scope.listings);

			  	});
	    	},
	    loadMore: function () {
	    	$scope.query.offset = $scope.listings.length;
	    	retslySvc.getVendorListings($scope.query).then(function(res) {
	    		$scope.listings = $scope.listings.concat(res.data.bundle);
	    	})
	    }
    })

    $scope.search();


	})
	.controller('ListingDetailController', function ($scope, listing) {
	 	
	 	console.log("listing " + listing);

	});

