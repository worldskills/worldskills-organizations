'use strict';

angular.module('orgApp')
  .controller('MemberCtrl', function ($scope, $rootScope, $state, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular, API_IMAGES, FileUploader, $modal) {
    
	  // initialise variables
	  $scope.memberId = $stateParams.member_id;
	 
	  
	  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {    
	        if (typeof toState.data != 'undefined' && typeof toState.data.pageName != 'undefined') {            
	        	$translate($state.current.data.pageName).then(function(msg)
	        	{
	        		$scope.pageName = msg;
	        	});
	        }
	  });
	  
	  
	  $scope.getMember = function(id)
	  {
		  Restangular.one('org/members', id).get().then( function(result) 
		  {
			  $scope.member = result;
		  }, $rootScope.errorHandler);
	  };
	  
	 
	  // fetch the member
	  $scope.getMember($scope.memberId);
	  // get the country list if we need it
	  if ($rootScope.allCountries === false)
	  {
		  $rootScope.getCountryList();
	  }
	  
  });