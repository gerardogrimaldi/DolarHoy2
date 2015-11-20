'use strict';

angular.module('dolarHoy2.controllers', [])
  .controller('DolarCtrl', function DolarCtrl($scope, $rootScope, $ionicLoading, $ionicActionSheet, dolarService,
    $cordovaClipboard, $window, $cordovaDialogs, $email, $ionicPopup, $state, ambitoService) {

    var scope = $rootScope;
    scope.valores = {};
    // Triggered on a button click, or some other target
    scope.copy = function (type, toCopyValue) {
      scope.toCopyValue = toCopyValue;
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
                .copy(scope.toCopyValue)
                .then(function () {
                  $cordovaDialogs.alert('Copiado el valor ' + scope.toCopyValue,
                    'Copiar valor', 'Ok')
                    .then(function () {
                      // callback success
                    });
                  }, function () {
                    $window.console.log('error');
                  });
            } else {
              scope.copyToClipboard(scope.toCopyValue);
            }
            return true;
          }
        }
      });
    };

    scope.copyToClipboard = function (text) {
      //copiar a clipboard
    };

    scope.load = function () {
      scope.loading = true;
      $ionicLoading.show({
        template: '<p>Actualizando datos...</p><ion-spinner></ion-spinner>'
      });
      dolarService
        .getData()
        .then(function (data) {
          scope.dolar = data;
          scope.hide();
        });
    };

    scope.hide = function () {
      scope.loading = false;
      $ionicLoading.hide();
    };

    scope.calculate = function (toCalc) {
      if(toCalc) {
        if (isNaN(toCalc)) {
          toCalc = 0;
        }

        if (scope.dolar) {

          $state.go('app.result');
          scope.valores = {};
          scope.valores.oficial  = (toCalc * Number(scope.dolar.dolarVenta)).toFixed(2);
          scope.valores.ahorro   = (toCalc * Number(((scope.dolar.dolarVenta * 20)) / 100)).toFixed(2);
          scope.valores.blue     = (toCalc * Number(scope.dolar.dolarBlueCompra)).toFixed(2);
          scope.valores.tarjeta  = (toCalc * Number(scope.dolar.dolarTarjeta)).toFixed(2);
          scope.valores.real     = (toCalc * Number(scope.dolar.realVenta)).toFixed(2);
          scope.valores.euro     = (toCalc * Number(scope.dolar.euroVenta)).toFixed(2);
          console.log(scope.valores);

        }

      }
    };

    scope.sendEmail = function(name, email, message) {
      if (!name || !email || !message) {
        $ionicPopup.alert({
          title: 'Alerta',
          template: 'Ingrese todos los campos para enviar...'
        });
        return;
      }
      $email.$send(null, null, null, message, email, name, null, null);

    };

    scope.startGraph = function(){
      debugger;
      ambitoService
        .graphDolarAhorro()
        .then(function(data) {
          debugger;
            scope.graph ='bien';
        },
        function(data) {
          debugger;
          scope.graph ='como el orto';
        });
      /*scope.labels = ['2015/11/16', '2015/11/13', '2015/11/12', '2015/11/11', '2015/11/10', '2015/11/09'];
      scope.series = ['precio dolar'];
      scope.data = [
        ["17245.240","17448.070","17702.220","17758.210","17730.480"]
      ];
      scope.onClick = function (points, evt) {
        console.log(points, evt);
      };*/
    };



});