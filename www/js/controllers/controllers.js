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
});
