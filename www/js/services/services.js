
angular.module('dolarHoy2', [])
  .service('dolarService', function($http) {

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
