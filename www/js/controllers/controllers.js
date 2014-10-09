angular.module('dolarHoy2.controllers', [])
  .controller('DolarCtrl', function DolarCtrl($scope, $rootScope, $ionicLoading, dolarService) {
    var scope = $rootScope;

    $scope.valores = {};

    $scope.load = function() {
      $scope.loading = true;
      $ionicLoading.show({
        template: 'Actualizando datos...'
      });
      dolarService.getData().then(function(data) {
        $scope.dolar = data;
        $scope.hide();
      });
    }

    $scope.hide = function(){
      $scope.loading = false;
      $ionicLoading.hide();
    };

    $scope.calcular = function(aCalcular) {
      if($scope.dolar){
        $scope.valores = {};
        $scope.valores.oficial = (aCalcular * $scope.dolar.dolarVenta).toFixed(2);
        $scope.valores.ahorro = aCalcular * (($scope.dolar.dolarVenta * 20) / 100);
        $scope.valores.blue = aCalcular * $scope.dolar.dolarBlueCompra;
        $scope.valores.tarjeta = aCalcular * $scope.dolar.dolarTarjeta;
        $scope.valores.real = aCalcular * $scope.dolar.realVenta;
        $scope.valores.euro = aCalcular * $scope.dolar.euroVenta;
      }
    }

    $scope.$watch('aCalcular', $scope.calcular());

});
