'strict'

angular.module('dolarhoy2')
  .directive('shareBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/shareBar.html'
    };
  });
