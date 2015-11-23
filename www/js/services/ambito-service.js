'use strict';

angular
  .module('dolarHoy2.controllers')
  .factory('ambitoService', function($http) {
    return {
      graphDolarOficial: function () {
        return $http.get('https://dolarhoyapi.herokuapp.com/dolar-graph/Hola123!');
      },
      graphDolarBlue: function () {
        return $http.get('http://dolarhoyapi.herokuapp.com/dolar-blue-graph/Hola123!');
      },
      graphDolarTarjeta: function () {
        return $http.get('http://dolarhoyapi.herokuapp.com/dolar-tarjeta-graph/Hola123!');
      },
      graphDolarAhorro: function () {
        return $http.get('http://dolarhoyapi.herokuapp.com/dolar-ahorro-graph/Hola123!');
      }
    }
  });
