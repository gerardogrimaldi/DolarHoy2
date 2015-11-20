'use strict';

angular
  .module('dolarHoy2.controllers')
  .factory('ambitoService', function($http) {
    return {
      graphDolarOficial: function () {
        return $http.get('http://localhost:3000/dolarGraph/Hola123!');
      }//,
      /*graphDolarBlue: function () {
        return $http.get('http://www.ambito.com/economia/mercados/monedas/x_monedas_get_grafico.asp?ric=ARSB=&tipo=ww&from=modulo_mercados');
      },
      graphDolarTarjeta: function () {
        return $http.get('http://www.ambito.com/economia/mercados/monedas/x_monedas_get_grafico.asp?ric=ARSSCBCRA=DT&tipo=ww&from=modulo_mercados');
      },
      graphDolarAhorro: function () {
        return $http.get('http://www.ambito.com/economia/mercados/monedas/x_monedas_get_grafico.asp?ric=ARSSCBCRA=TE&tipo=ww&from=modulo_mercados');
      }*/
    }
  });
