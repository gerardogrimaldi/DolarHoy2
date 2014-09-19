var app = angular.module('dolarHoy2.controllers', []);

app.controller('DolarCtrl', function DolarCtrl($scope, dolarFactory) {
  $scope.dolar = dolarFactory;
});

app.service('dolarService', function() {
  var that = this;
    this.dolar = {};

    this.initDolar = function() {
      $http.get('http://dolarhoyserver.herokuapp.com/dolar/Hola123!')
      .success(function(data) {
        that.dolar = data.dolar;
      })
      .error(function(data) {
        console.log('Error: ' + data.message);
      });
    };

    this.getDolar = function() {
      return this.dolar;
    };
});

app.factory('dolarFactory', function($http) {

  return JSON.parse('{"_id":"541c552d83247a020000002c","dolarCompra":"8.390","dolarVenta":"8.440","dolarBlueCompra":"14.900","dolarBlueVenta":"14.970","dolarTarjeta":"11.394","realCompra":"2.3757","realVenta":"2.3762","euroCompra":"10.900","euroVenta":"11.350","date":"2014-09-19T13:09:17.000Z"}');
    // $http.get('http://dolarhoyserver.herokuapp.com/dolar/Hola123!')
    // .success(function(data) {
    //   debugger;
    //   //return JSON.parse(data);
    //
    // })
    // .error(function(data) {
    //   console.log('Error: ' + data.message);
    // });

});
