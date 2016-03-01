'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('dolarhoy2', ['dolarHoy2.controllers', 'ngCordova', 'chart.js', 'ionic'])

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
    if(window.plugins && window.plugins.AdMob) {
      var admob_key = device.platform == 'Android' ? 'ca-app-pub-9034277405854547/8557728608' : 'ca-app-pub-9034277405854547/8387680207';
      var admob = window.plugins.AdMob;
      console.log(admob_key);
      admob.createBannerView({
        'publisherId': admob_key,
        'adSize': admob.AD_SIZE.SMART_BANNER,
        'bannerAtTop': false
      },
      function() {
        admob.requestAd({
            'isTesting': false
          },
          function() {
            admob.showAd(true);
          },
          function() {
            console.log('failed to request ad');
          }
        );
      },
      function() {
        console.log('failed to create banner view');
      });
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'DolarCtrl'
    })

    .state('app.dolar', {
      url: "/dolar",
      views: {
        'menuContent' :{
          templateUrl: "templates/dolar.html",
          controller: 'DolarCtrl'
        }
      }
    })

    .state('app.calc', {
      url: "/calc",
      views: {
        'menuContent' :{
          templateUrl: "templates/calc.html",
          controller: 'DolarCtrl'
        }
      }
    })

    .state('app.result', {
      url: "/result",
      views: {
        'menuContent' :{
          templateUrl: "templates/result.html",
          controller: 'DolarCtrl'
        }
      }
    })

    .state('app.map', {
      url: "/map",
      views: {
        'menuContent' :{
          templateUrl: "templates/map.html",
          controller: 'DolarCtrl'
        }
      }
    })

    .state('app.contact', {
      url: "/contact",
      views: {
        'menuContent' :{
          templateUrl: "templates/contact.html",
          controller: 'DolarCtrl'
        }
      }
    })
    .state('app.graph', {
      url: "/graph",
      views: {
        'menuContent' :{
          templateUrl: "templates/graph.html",
          controller: 'DolarCtrl'
        }
      }
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dolar');
});
