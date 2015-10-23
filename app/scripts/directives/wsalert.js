'use strict';

/**
 * @ngdoc directive
 * @name orgApp.directive:WSAlert
 * @description
 * # WSAlert
 */
angular.module('orgApp')
  .directive('alerts', function (WSAlert) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/wsalert.html',
      link: function($scope, element, attrs) {
      	$scope.WSAlert = WSAlert;
      	$scope.close = function(index){
      		WSAlert.messages.splice(index, 1);
      	};
      	WSAlert.setAllDisplayed();        
      }
    };
  });
