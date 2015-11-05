'use strict';

angular.module('orgApp')
  .controller('MemberListCtrl', function ($scope, $rootScope, $state, $translate, Language, auth, user, WSAlert, Restangular, $modal) {
    
	  $scope.current_page = $rootScope.currentMemberPage;
	  $scope.items_per_page = 15;
	  
	  $scope.newMemberModal = false;
	  
	  $scope.filter = {
		  name: $rootScope.memFilter.name,
		  member: $rootScope.memFilter.memberOf,
		  sort: $rootScope.memFilter.sort,
		  editable: $rootScope.memFilter.editable
	  }
	  
	  $scope.clear = function() {
		  $scope.filter.name = undefined;
		  $scope.filter.memberOf = undefined;
		  $scope.filter.sort = 'name';
		  $scope.changePage(1);	
	  };
		
	  $scope.changePage = function(page) 
	  {
		  $rootScope.loading = true;
		  $rootScope.memFilter.name = $scope.filter.name;
		  $rootScope.memFilter.memberOf = $scope.filter.memberOf;
		  $rootScope.memFilter.sort = $scope.filter.sort;
		   
		  $scope.current_page = page;
		  Restangular.one('org/members').get({member_of: $scope.filter.memberOf, name: $scope.filter.name, editable: $scope.filter.editable,
			  sort: $scope.filter.sort, limit: $scope.items_per_page, offset: $scope.items_per_page * (page-1)})
			  .then( function(result) 
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
	  
	  
	  // new member form
	  $scope.showNewMemberForm = function()
	  {
		  $scope.newMemberModal = $modal.open({
			  scope: $scope,
			  templateUrl: 'views/new_member.html',
			  controller: 'NewMemberCtrl',
			  size: 'lg'
		  });
	  }
	  $scope.addContact = function(id)
	  {
		  $scope.savingContacts = true;
		  $scope.addContactModal.close();
		  var data = {
			  "contact": id
		  }
		  Restangular.one('/org/members/' + $scope.memberId + '/contacts').customPOST(data)
		 	  .then(function(response) {
		 		  $scope.member.contacts = response.contacts;
		 		  $scope.savingContacts = false;
		  	  }, function(response) {
		  		  $scope.savingContacts = false;
		  		  $rootScope.errorHandler(response);
		  	  });
	  };
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