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

})

.controller('CalcCtrl', function($scope, $stateParams, dolarService) {
  $scope.dolar = {"_id":"5435b1083b69850200000004","dolarCompra":"8.430","dolarVenta":"8.480","dolarBlueCompra":"14.550","dolarBlueVenta":"14.650","dolarTarjeta":"11.448","realCompra":"2.3766","realVenta":"2.3776","euroCompra":"10.900","euroVenta":"11.350","date":"2014-10-08T18:47:52.000Z"};

  $scope.calcular = function(aCalcular) {
    alert(aCalcular);
    dolarService.getData().then(function(data) {
      $scope.dolar = data;
      $scope.hide();
      if($scope.dolar){
        $scope.valores = {};
        $scope.valores.oficial = aCalcular * $scope.dolar.dolarVenta;
        $scope.valores.ahorro = aCalcular * (($scope.dolar.dolarVenta * 20) / 100);
        $scope.valores.blue = aCalcular * $scope.dolar.dolarBlueCompra;
        $scope.valores.tarjeta = aCalcular * $scope.dolar.dolarTarjeta;
        $scope.valores.real = aCalcular * $scope.dolar.realVenta;
        $scope.valores.euro = aCalcular * $scope.dolar.euroVenta;
      }

    });
  };

  $scope.$watch('$scope.aCalcular', $scope.calcular());
});
