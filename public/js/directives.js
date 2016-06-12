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
        controller: function($scope, $state, retslySvc) {

            $scope.showFullDetail = function() {
                $scope.detailInfo = $scope.listing;
            }

            $scope.getAgent = function() {
                console.log('getAgent');
                retslySvc.getAgent($scope.listing.id).then(function(res) {
                    console.log(res);
                    $scope.detailInfo = res.data.bundle;
                });
            };

            $scope.getOffice = function() {
                retslySvc.getOffice($scope.listing.id).then(function(res) {
                    console.log(res);

                })
            }

            $scope.closeDetail = function() {
                $scope.detailInfo = false;
            }



            $scope.currImg = $scope.listing.media[0];
            console.log('currImg.url: ' + $scope.currImg.url);
            $scope.changeMainImg = function(index) {
                $scope.currImg = $scope.listing.media[index];
            }

            //    $scope.goToListing = function(id) {
            //  console.log('goToListing');
            //  $state.go("listing-detail", {id:id})
            // }
        }
    }
  });
