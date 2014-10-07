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

    $scope.calcular = function(){
      dolarService.getData().then(function(data) {
        $scope.dolar = data;

        if($scope.dolar){
          debugger;
          $scope.valores = {};
          $scope.valores.oficial = $scope.aCalcular * $scope.dolar.dolarVenta;
          $scope.valores.ahorro = $scope.aCalcular * (($scope.dolar.dolarVenta * 20) / 100);
          $scope.valores.blue = $scope.aCalcular * $scope.dolar.dolarBlueCompra;
          $scope.valores.tarjeta = $scope.aCalcular * $scope.dolar.dolarTarjeta;
          $scope.valores.real = $scope.aCalcular * $scope.dolar.realVenta;
          $scope.valores.euro   = $scope.aCalcular * $scope.dolar.euroVenta;
        }

    });
    }
    $scope.$watch('acalcular', $scope.calcular);
});
