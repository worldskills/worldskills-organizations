angular.module('orgApp')
  .controller('MemberMembershipCtrl', function ($scope, $rootScope, $state, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular, $modal) {
	  
	  $scope.showMembershipForm = false;
	  $scope.newMShip = {};
	  if ($rootScope.memStatusList === false)
	  {
		  $rootScope.getMemberStatusList();
	  }
	  if ($rootScope.editableMembers === undefined)
	  {
		  $rootScope.getEditableMembers();
	  }
	  $scope.editMem = -1;
	  
	  $scope.clearNewMShip = function() 
	  {
		  $scope.newMShip = {
			  "member_id": undefined,
			  "status": undefined,
			  "year_joined": undefined
		  }
	  }
	  
	  $scope.clearNewMShip();
	  
	  
	  // membership functions
	  $scope.addMembership = function()
	  {
		  $scope.savingMemberships = true;
		  var data = {
			  "id": $scope.newMShip.member_id,
			  "status": $scope.newMShip.status,
			  "year_joined": $scope.newMShip.year_joined
		  }
		  Restangular.one('/org/members/' + $scope.memberId + '/memberships').customPOST(data)
	  		  .then(function(response) {
	  			  $scope.member.member_of = response;
	  			  $scope.showMembershipForm = false;
	  			  $scope.savingMemberships = false;
	  		  }, function(response) {
	  			  $scope.savingMemberships = false;
	  			  $rootScope.errorHandler(response);
		  	  });
	  }
	  $scope.removeMembership = function(memId)
	  {
		  $scope.savingMemberships = true;
		  if (confirm("Are you sure you want to remove this membership?"))
		  {
			  Restangular.one('/org/members/' + $scope.memberId + '/memberships/' + memId).customDELETE()
		  		  .then(function(response) {
		  			  // reload the list
		  			  $scope.getMemberships();
			  	  }, function(response) {
			  		  $scope.savingMemberships = false;
			  		  $rootScope.errorHandler(response);
			  	  });
		  }
		  else
		  {
			  $scope.savingMemberships = false;
		  }
	  }
	  $scope.getMemberships = function()
	  {
		  $scope.savingMemberships = true;
		  Restangular.one('/org/members/' + $scope.memberId + '/memberships').get()
		  	  .then(function(response) {
		  		  $scope.member.member_of = response;
		  		  $scope.savingMemberships = false;
		  	  }, function(response) {
		  		  $scope.savingMemberships = false;
		  		  $rootScope.errorHandler(response);
		  	  });
	  }
	  $scope.editMembership = function(msIndex)
	  {
		  $scope.editMem = msIndex;
	  }
	  $scope.updateMembership = function()
	  {
		  var data = {
			  "status": $scope.member.member_of[$scope.editMem].status.id,
			  "year_joined": $scope.member.member_of[$scope.editMem].year_joined
		  }
		  console.log(data);
		  Restangular.one('/org/members/' + $scope.memberId + '/memberships/' + $scope.member.member_of[$scope.editMem].id).customPUT(data)
	  		  .then(function(response) {
	  			  // reload the list
	  			  $scope.getMemberships();
	  			  $scope.editMem = -1;
		  	  }, function(response) {
		  		  $scope.savingMemberships = false;
		  		  $rootScope.errorHandler(response);
		  	  });
	  }
  });