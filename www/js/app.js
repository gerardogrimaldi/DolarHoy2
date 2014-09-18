// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('dolarhoy2', ['ionic', 'dolarHoy2.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.dolar', {
      url: "/dolar",
      views: {
        'menuContent' :{
          templateUrl: "templates/dolar.html"
        }
      }
    })

    .state('app.calculadora', {
      url: "/calculadora",
      views: {
        'menuContent' :{
          templateUrl: "templates/calculadora.html"
        }
      }
    })
    .state('app.mapa', {
      url: "/mapa",
      views: {
        'menuContent' :{
          templateUrl: "templates/mapa.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.contacto', {
      url: "/contacto",
      views: {
        'menuContent' :{
          templateUrl: "templates/contacto.html",
          controller: 'PlaylistsCtrl'
        }
      }
    }) ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dolar');
});
