'use strict';

// Declare app level module which depends on filters, and services

angular.module("retslyListings", [
  "ui.router",
  "controllers",
  "filters",
  "services",
  "directives"
]).
config(function ( $locationProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state("listings-home", {
    url: "/",
    views: {
      "content": {
        "templateUrl": "views/listings-home.html",
        "controller": "MainCtrl"
      }
    }
  })
  .state("listing-detail", {
    url: "/:id",
    views: {
      "templateUrl": "views/listing-detail.html",
      "controller": "ListingDetailController"
    },
    resolve: {
      listing: function(retslySvc, $stateParams) {
        return retslySvc.getListingById($stateParams.id);
      }
    }
  })
  $locationProvider.html5Mode(true);
})
// .constant("CONSTANTS", {
//   "API_URL": "https://rets.io/api/v1/"
//   "TOKEN": "6baca547742c6f96a6ff71b138424f21"
// })
