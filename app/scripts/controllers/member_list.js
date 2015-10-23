'use strict';

angular.module('orgApp')
  .controller('MemberListCtrl', function ($scope, $rootScope, $state, $translate, Language, auth, user, WSAlert, Restangular) {
    
	  $scope.current_page = $rootScope.currentMemberPage;
	  $scope.items_per_page = 15;
	  
	  $scope.filter = {
		  name: $rootScope.memFilter.name,
		  member: $rootScope.memFilter.memberOf,
		  sort: $rootScope.memFilter.sort
	  }
	  
	  $scope.clear = function() {
		  $scope.filter.name = '';
		  $scope.filter.memberOf = '';
		  $scope.filter.sort = '';
		  $scope.changePage(1);	
	  };
		
	  $scope.changePage = function(page) 
	  {
		  $rootScope.loading = true;
		  $rootScope.memFilter.name = $scope.filter.name;
		  $rootScope.memFilter.memberOf = $scope.filter.memberOf;
		  $rootScope.memFilter.sort = $scope.filter.sort;
		   
		  $scope.current_page = page;
		  Restangular.one('org/members').get({member_of: $scope.filter.memberOf, name: $scope.filter.name,
			  									sort: $scope.filter.sort, limit: $scope.items_per_page, offset: $scope.items_per_page * (page-1), 
			  }).then( function(result) 
			  {
				  $scope.members = result;
				  $rootScope.loading = false;
			  }, $rootScope.errorHandler);
	  };
	  
	  $scope.filterResults = function()
	  {
		  $scope.changePage(1);
	  };
	  
	  $scope.changePage($scope.current_page);
  });


angular.module('orgApp')
.controller('MemberFilterController', function ($scope, $rootScope, $element)
{
	// filter the results when enter pressed in form
	$element.bind('keydown keypress', function (event) {
		if (event.keyCode === 13) { // enter key
			$scope.$apply(function() {
				$scope.changePage(1);
			});
		}
	});
});