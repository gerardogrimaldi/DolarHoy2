'use strict';

angular.module('dolarHoy2.controllers', [])
  .controller('DolarCtrl', function DolarCtrl($scope, $rootScope,
                                              $ionicLoading,
                                              $ionicActionSheet,
                                              dolarService,
                                              //$timeout,
                                              $cordovaClipboard,
                                              $window,
                                              $cordovaDialogs,
                                              $cordovaSocialSharing) {
    //var scope = $rootScope;
    // Triggered on a button click, or some other target
    $scope.show = function (type, toCopyValue) {
      // Show the action sheet
      $scope.toCopyValue = toCopyValue;
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '<b>Copiar</b>'}
        ],
        titleText: 'Copiar Valores de ' + type, cancelText: 'Cancel',
        cancel: function () {
          hideSheet();
        },
        buttonClicked: function (index) {
          if (index === 0) {
            if ($window.cordova) {
              $cordovaClipboard
                .copy($scope.toCopyValue)
                .then(function () {
                  $cordovaDialogs.alert('Copiado el valor ' + $scope.toCopyValue,
                    'Copiar valor', 'Ok')
                    .then(function () {
                      // callback success
                    });
                  }, function () {
                    $window.console.log('error');
                  });
            } else {
              $scope.copyToClipboard($scope.toCopyValue);
            }
            return true;
          }
        }
      });
    };

    $scope.copyToClipboard = function (text) {
      //copiar a clipboard
    };

    $scope.valores = {};

    $scope.load = function () {
      $scope.loading = true;
      $ionicLoading.show({
        template: 'Actualizando datos...'
      });
      dolarService.getData().then(function (data) {
        $scope.dolar = data;
        $scope.hide();
      });
    };

    $scope.hide = function () {
      $scope.loading = false;
      $ionicLoading.hide();
    };

    $scope.calcular = function (aCalcular) {
      if ($scope.dolar) {
        $scope.valores = {};
        $scope.valores.oficial = (aCalcular * $scope.dolar.dolarVenta).toFixed(2);
        $scope.valores.ahorro = aCalcular * (($scope.dolar.dolarVenta * 20) / 100);
        $scope.valores.blue = aCalcular * $scope.dolar.dolarBlueCompra;
        $scope.valores.tarjeta = aCalcular * $scope.dolar.dolarTarjeta;
        $scope.valores.real = aCalcular * $scope.dolar.realVenta;
        $scope.valores.euro = aCalcular * $scope.dolar.euroVenta;
      }
    };

    $scope.$watch('aCalcular', $scope.calcular());

    $scope.shareViaTwitter = function (message, image, link) {
      $ionicLoading.show({
        template: 'Compartiendo...'
      });
      $cordovaSocialSharing
          .shareViaTwitter('Los valores de hoy del dolar son ' + message)
          .then(function (result) {
            $ionicLoading.hide();
          }, function (err) {
            $ionicLoading.hide();
          });
    };

    $scope.shareViaWhatsapp = function (message, image, link) {
      $ionicLoading.show({
        template: 'Compartiendo...'
      });
      $cordovaSocialSharing
          .shareViaWhatsApp(message, image, link)
          .then(function (result) {
            $ionicLoading.hide();
          }, function (err) {
            $ionicLoading.hide();
          });
    };

    $scope.shareViaFacebook = function (message, image, link) {
      $ionicLoading.show({
        template: 'Compartiendo...'
      });
      $cordovaSocialSharing
        .shareViaFacebook(message, image, link)
        .then(function (result) {
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });
    };
});