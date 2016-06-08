'use strict';

/* Directives */

angular.module('directives', []).
  directive('eachListing', function () {
    return {
    	restrict: 'E',
        templateUrl: 'views/each-listing.html',
        scope: {
            listing: "=",
        },
        controller: function($scope, $state) {
        	$scope.goToListing = function(id) {
		    	console.log('goToListing');
		    	$state.go("listing-detail", {id:id})
		    }
        }
    }
  });
