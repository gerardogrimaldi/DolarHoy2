angular.module('dolarHoy2.controllers', [])
  .controller('DolarCtrl', function DolarCtrl($scope, $rootScope, $ionicLoading, dolarService) {
    var scope = $rootScope;
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

    $scope.$watch('aCalcular', function() {
      //$scope.calcular = function(){
      alert(aCalcular);
        valores = {};
        valores.oficial = $scope.aCalcular * scope.dolar.dolarVenta;
        valores.ahorro = $scope.aCalcular * ((scope.dolar.dolarVenta * 20) / 100);
        valores.blue = $scope.aCalcular * scope.dolar.dolarBlueCompra;
        valores.tarjeta = $scope.aCalcular * scope.dolar.dolarTarjeta;
        valores.real = $scope.aCalcular * scope.dolar.realVenta;
        valores.euro   = $scope.aCalcular * scope.dolar.euroVenta;
      //}
    });


});
