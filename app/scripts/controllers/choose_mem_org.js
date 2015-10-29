'use strict';

angular.module('orgApp')
  .controller('ChooseMemberOrgCtrl', function ($scope, $rootScope, $state, $translate, Language, auth, user, WSAlert, Restangular) {
    
	  $scope.current_org_page = 1;
	  $scope.org_items_per_page = 10;
	  $scope.searchingOrg = true;
	  
	  $scope.searchFilter = {
		  'name': undefined
	  }
		  
	  
	  $scope.clearFilter = function()
	  {
		  $scope.searchFilter.name = undefined;
		  $scope.changePage(1);
	  }
	  
	  $scope.changePage = function(page) 
	  {
		  $scope.searchingOrg = true;
		  Restangular.one('/org/').get({name: $scope.searchFilter.name, limit: $scope.org_items_per_page, offset: $scope.org_items_per_page * (page-1)})
		  .then(function(response) {
			    $scope.orgs = response;
			    $scope.searchingOrg = false;
		  	  }, function(response) {
		  		$scope.searchinOrg = false;
		  		$rootScope.errorHandler(response);
		  	  });
	  }
	  
	  $scope.getPrimaryAddress = function(addresses)
	  {
		  var email;
          angular.forEach(addresses, function(addr) {
              if (addr.type.primary === true) {
                  email = addr.email_address;
              }
          });
          return email;
	  }
	  
	  $scope.changePage($scope.current_org_page);
  });


angular.module('orgApp')
.controller('OrgFilterController', function ($scope, $rootScope, $element)
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