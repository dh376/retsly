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

            $scope.infoType = "";

            $scope.showFullDetail = function() {
                //console.log($scope.listing);
                var info = retslySvc.sortListingDetail($scope.listing);
                console.log(info);
                $scope.detailInfo = info;
                $scope.infoType = "listing";
            }

            $scope.getAgent = function() {
                console.log('getAgent');
                retslySvc.getAgent($scope.listing.id).then(function(res) {
                    console.log(res);
                    $scope.detailInfo = res.data.bundle;
                    $scope.infoType = "agent";
                }, function(err) {
                    console.log(err);
                    alert("Sorry, our server returned an error.\n\n"+err.data.bundle.name+"\n\n"+err.data.bundle.message);
                });
            };

            $scope.getOffice = function() {
                retslySvc.getOffice($scope.listing.id).then(function(res) {
                    console.log(res);
                    $scope.detailInfo = res.data.bundle;
                    $scope.infoType = "office";
                }, function(err) {
                    console.log(err);
                    alert("Sorry, our server returned an error.\n\n"+err.data.bundle.name+"\n\n"+err.data.bundle.message);
                })
            }

            $scope.closeDetail = function() {
                $scope.detailInfo = false;
                $scope.infoType = "";
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
