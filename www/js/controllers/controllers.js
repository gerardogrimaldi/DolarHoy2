'use strict';

angular.module('dolarHoy2.controllers', [])
  .controller('DolarCtrl', function DolarCtrl($scope, $rootScope, $ionicLoading, $ionicActionSheet, dolarService, //$timeout,
    $cordovaClipboard, $window, $cordovaDialogs, $email, $ionicPopup) {
    //var scope = $rootScope;
    // Triggered on a button click, or some other target
    $scope.copy = function (type, toCopyValue) {
      $scope.toCopyValue = toCopyValue;
      var hideSheet = $ionicActionSheet.show({
        buttons: [ {text: '<b>Copiar Valor</b>'} ],
        titleText: 'Copiar Valores de ' + type,
        cancelText: 'Cancel',
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
        template: '<p>Actualizando datos...</p><ion-spinner></ion-spinner>'
      });
      dolarService
        .getData()
        .then(function (data) {
          $scope.dolar = data;
          $scope.hide();
        });
    };

    $scope.hide = function () {
      $scope.loading = false;
      $ionicLoading.hide();
    };

    $scope.calcular = function (aCalcular) {
      if (isNaN(aCalcular)) {
        aCalcular = 0;
      }
      if ($scope.dolar) {
        $scope.valores = {};
        $scope.valores.oficial  = (aCalcular * Number($scope.dolar.dolarVenta)).toFixed(2);
        $scope.valores.ahorro   = (aCalcular * Number((($scope.dolar.dolarVenta * 20)) / 100)).toFixed(2);
        $scope.valores.blue     = (aCalcular * Number($scope.dolar.dolarBlueCompra)).toFixed(2);
        $scope.valores.tarjeta  = (aCalcular * Number($scope.dolar.dolarTarjeta)).toFixed(2);
        $scope.valores.real     = (aCalcular * Number($scope.dolar.realVenta)).toFixed(2);
        $scope.valores.euro     = (aCalcular * Number($scope.dolar.euroVenta)).toFixed(2);
      }
    };

    $scope.$watch('aCalcular', $scope.calcular());

    $scope.sendEmail = function(name, email, message) {
      if (!name || !email || !message) {
        $ionicPopup.alert({
          title: 'Alerta',
          template: 'Ingrese todos los campos para enviar...'
        });
        return;
      }
      $email.$send(null, null, null, message, email, name, null, null);

    }
});