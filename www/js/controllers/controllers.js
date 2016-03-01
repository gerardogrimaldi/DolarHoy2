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
          buttons: [{text: '<b>Copiar Valor</b>'}],
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
                          'Copiar valor', 'Ok').then(
                          function () {});
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
        if (toCalc) {
          scope.toCalc = toCalc;
          //$state.go('app.result');
          if (!scope.dolar) {
            scope.load();
          }
          scope.valores.oficial = (scope.toCalc * Number(scope.dolar.dolarVenta)).toFixed(2);
          scope.valores.ahorro = (scope.toCalc * Number(((scope.dolar.dolarVenta * 20)) / 100)).toFixed(2);
          scope.valores.blue = (scope.toCalc * Number(scope.dolar.dolarBlueCompra)).toFixed(2);
          scope.valores.tarjeta = (scope.toCalc * Number(scope.dolar.dolarTarjeta)).toFixed(2);
          scope.valores.real = (scope.toCalc * Number(scope.dolar.realVenta)).toFixed(2);
          scope.valores.euro = (scope.toCalc * Number(scope.dolar.euroVenta)).toFixed(2);
          scope.showResult = true;
        }
      };

      scope.sendEmail = function (name, email, message) {
        if (!name || !email || !message) {
          $ionicPopup.alert({
            title: 'Alerta',
            template: 'Ingrese todos los campos para enviar...'
          });
          return;
        }
        $email.$send(null, null, null, message, email, name, null, null);

      };

      scope.startGraph = function () {
        $ionicLoading.show({
          template: '<p>Actualizando datos...</p><ion-spinner></ion-spinner>'
        });
        ambitoService
            .graphDolarOficial()
            .then(function (data) {
              data.data = data.data.reverse();
              scope.labelsDolarOficial = [];
              scope.dataDolarOficial = [];
              data.data.forEach(function (element, index, array) {
                var date = element[0].split('/');
                scope.labelsDolarOficial.push(date[2] + '/' + date[1] + '/'+ date[0]);
                scope.dataDolarOficial.push(element[1].toString());
              });
              scope.dataDolarOficial = [scope.dataDolarOficial];
              scope.seriesDolarOficial = ['Precio Dolar Oficial'];
              scope.optionsDolarOficial = {
                animation: false ,
                bezierCurve: false,
                tooltipTemplate: 'U$S <%= value %>'
              };
              scope.coloursDolarOficial = [{ // default
                fillColor: '#d6f5df',
                strokeColor: '#19662F',
                pointColor: 'rgba(255, 255, 255, 1)',
                pointStrokeColor: '#19662F',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)'
              }];
            },
            function (data) {
              console.log('error');
            });


        ambitoService
            .graphDolarBlue()
            .then(function (data) {
              data.data = data.data.reverse();
              scope.labelsDolarBlue = [];
              scope.dataDolarBlue = [];
              data.data.forEach(function (element, index, array) {
                var date = element[0].split('/');
                scope.labelsDolarBlue.push(date[2] + '/' + date[1] + '/'+ date[0]);
                scope.dataDolarBlue.push(element[1].toString());
              });
              scope.dataDolarBlue = [scope.dataDolarBlue];
              scope.seriesDolarBlue = ['Precio Dolar Blue'];
              scope.optionsDolarBlue = {
                animation: false ,
                bezierCurve: false,
                tooltipTemplate: 'U$S <%= value %>'
              };
              scope.coloursDolarBlue = [{ // default
                fillColor: '#cff3fc',
                strokeColor: '#11c1f3',
                pointColor: 'rgba(255, 255, 255, 1)',
                pointStrokeColor: '#11c1f3',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)'
              }];
            },
            function (data) {
              console.log('error');
            });

        ambitoService
            .graphDolarAhorro()
            .then(function (data) {
              data.data = data.data.reverse();
              scope.labelsDolarAhorro = [];
              scope.dataDolarAhorro = [];
              data.data.forEach(function (element, index, array) {
                var date = element[0].split('/');
                scope.labelsDolarAhorro.push(date[2] + '/' + date[1] + '/'+ date[0]);
                scope.dataDolarAhorro.push(element[1].toString());
              });
              scope.dataDolarAhorro = [scope.dataDolarAhorro];
              scope.seriesDolarAhorro = ['Precio Dolar Ahorro'];
              scope.optionsDolarAhorro  = {
                animation: false ,
                bezierCurve: false,
                tooltipTemplate: 'U$S <%= value %>'
              };
              scope.coloursDolarAhorro = [{ // default
                fillColor: '#fff4cc',
                strokeColor: '#ffc900',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#ffc900',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)'
              }];
            },
            function (data) {
              console.log('error');
            });
        scope.hide();
      };
      scope.myGoBack = function() {
        $state.go('app.calc');
      }
    });
