'use strict';

angular
  .module('dolarhoy2')
  .directive('shareBar', ['$cordovaSocialSharing', '$ionicLoading', function($cordovaSocialSharing, $ionicLoading) {
      return {
        restrict: 'E',
        scope: {
          type: "@",
          compra: "@",
          venta: "@",
          unico: "@"
        },
        templateUrl: 'templates/directives/shareBar.html',
        link: function (scope, element, attrs) {

          var makeMessage = function() {
            return (!scope.unico) ? 'Los valores de hoy del ' + scope.type + ' son valor compra ' + scope.compra + ' y valor' +
            ' venta ' + scope.venta + '.' : 'El valor del dolar tarjeta  es ' + scope.unico + '.';
          };

          scope.shareViaFacebook = function (message, image, link) {
            $ionicLoading.show({
              template: '<p>Compartiendo...</p><ion-spinner></ion-spinner>'
            });
            $cordovaSocialSharing
                .shareViaFacebook(makeMessage(), image, link)
                .then(function (result) {
                  $ionicLoading.hide();
                }, function (err) {
                  $ionicLoading.hide();
                });
          };
          scope.shareViaTwitter = function (message, image, link) {
            $ionicLoading.show({
              template: '<p>Compartiendo...</p><ion-spinner></ion-spinner>'
            });
            $cordovaSocialSharing
                .shareViaTwitter(makeMessage(), image, link)
                .then(function (result) {
                  $ionicLoading.hide();
                }, function (err) {
                  $ionicLoading.hide();
                });
          };

          scope.shareViaWhatsapp = function (message, image, link) {
            $ionicLoading.show({
              template: '<p>Compartiendo...</p><ion-spinner></ion-spinner>'
            });
            $cordovaSocialSharing
                .shareViaWhatsApp(makeMessage(), image, link)
                .then(function (result) {
                  $ionicLoading.hide();
                }, function (err) {
                  $ionicLoading.hide();
                });
          };

        }
      };
    }]);
