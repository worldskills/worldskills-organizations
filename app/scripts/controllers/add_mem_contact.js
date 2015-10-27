'use strict';

angular.module('orgApp')
  .controller('AddMemberContactCtrl', function ($scope, $rootScope, $state, $translate, Language, auth, user, WSAlert, Restangular, PeopleRestangular) {
    
	  $scope.current_people_page = 1;
	  $scope.people_items_per_page = 10;
	  $scope.searchingPeople = true;
	  
	  $scope.searchFilter = {
		  'entity': $scope.member.ws_entity.id
	  }
	  
	  
	  $scope.clearFilter = function()
	  {
		  $scope.searchFilter.name = undefined;
		  $scope.searchFilter.email = undefined;
		  $scope.changePage(1);
	  }
	  
	  $scope.changePage = function(page) 
	  {
		  $scope.searchingPeople = true;
		  PeopleRestangular.one('/person').get({entity: $scope.searchFilter.entity, 
			  name: $scope.searchFilter.name, email: $scope.searchFilter.email,
			  limit: $scope.people_items_per_page, offset: $scope.people_items_per_page * (page-1)})
		  .then(function(response) {
			    $scope.people = response;
			    $scope.searchingPeople = false;
		  	  }, function(response) {
		  		$scope.searchingPeople = false;
		  		$rootScope.errorHandler(response);
		  	  });
	  }
	  
	  $scope.getPrimayAddress = function(addresses)
	  {
		  var email;
          angular.forEach(addresses, function(addr) {
              if (addr.type.primary === true) {
                  email = addr.email_address;
              }
          });
          return email;
	  }
	  
	  $scope.changePage($scope.current_people_page);
  });


angular.module('orgApp')
.controller('MemberContactFilterController', function ($scope, $rootScope, $element)
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