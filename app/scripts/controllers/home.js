'use strict';

angular.module('orgApp')
  .controller('HomeCtrl', function ($scope, $state, $translate, Language, auth, user, WSAlert) {
    
	  $scope.$watch("auth.user.first_name", function(newValue, oldValue){
		  
		  $state.go("member_list");
		
	    });
  });