'use strict';
angular
  .module('dolarHoy2.controllers')
  .service('dolarServiceOld', function() {
      var that = this;
      this.dolar = {};

      this.initDolar = function () {
        $http.get('http://dolarhoyapi.herokuapp.com/dolar/Hola123!')
            .success(function (data) {
              that.dolar = data.dolar;
            })
            .error(function (data) {
              console.log('Error: ' + data.message);
            });
      };

      this.getDolar = function () {
        return this.dolar;
      };
  });

angular
  .module('dolarHoy2.controllers')
  .factory('dolarFactory', function($http) {
      return $http
          .get('http://dolarhoyapi.herokuapp.com/dolar/Hola123!')
          .success(function (data) {
            return JSON.parse(data);
          })
          .error(function (data) {
            console.log('Error: ' + data.message);
          });
  });

//JSON.parse('{"_id":"541c552d83247a020000002c","dolarCompra":"8.390","dolarVenta":"8.440","dolarBlueCompra":"14.900","dolarBlueVenta":"14.970","dolarTarjeta":"11.394","realCompra":"2.3757","realVenta":"2.3762","euroCompra":"10.900","euroVenta":"11.350","date":"2014-09-19T13:09:17.000Z"}');

angular
  .module('dolarHoy2.controllers')
  .service('dolarService', function($q, $compile, $http) {
    this.getData = function() {
      var promise = $http.get('http://dolarhoyapi.herokuapp.com/dolar/Hola123!');
      promise = promise.then(function (response) {
        return response.data;
      });
      return promise;
    };
  });

angular
  .module('dolarHoy2.controllers')
  .factory('$email', function($http, $ionicLoading, $timeout) {
    return {
      $send: function (to, toname, subject, text, from, fromName, api_user, api_key) {
        $ionicLoading.show({
          template: '<p>Enviando...</p><ion-spinner></ion-spinner>'
        });

        var method = 'GET';
        var api_user = 'app15836318@heroku.com';
        var api_key = '60h4iban0994';
        var to = 'grimaldi.gerardo@gmail.com';

        var url = 'https://api.sendgrid.com/api/mail.send.json?' + 'api_user=' + api_user +
            '&api_key=' + api_key +
            '&to=' + to +
            '&subject=' + 'Consulta Doar Hoy 2 de ' + fromName +
            '&text=' + text +
            '&from=' + from;

        $http({
          method: method,
          url: url
        })
        .success(function (data, status) {
        })
        .error(function (data, status) {
          $ionicLoading.show({
            template: 'Mensaje enviado...'
          });
          $timeout(function () {
            $ionicLoading.hide();
          }, 3000);
        });
      }
    };
});
