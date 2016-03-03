angular.module('orgApp')
  .controller('MemberOrgCtrl', function ($scope, $rootScope, $state, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular, $modal) {
	  
	  $scope.editOrg = false;
	  $scope.savingOrg = false;
	  $scope.showOrgForm = false;
	  $scope.newOrg = {};
	  $scope.chooseOrgModal = false;
	  
	  
	  $scope.updateOrg = function()
	  {
		  $scope.savingOrg = true;
		  if ($scope.member.organization.websites[0] === undefined || $scope.member.organization.websites[0] === null)
		  {
			  $scope.updateOrgName();
			  return;
		  }
		  
		  
		  var websiteData = {
			  "url": $scope.member.organization.websites[0].url
		  }
		  // update the website first
		  if ($scope.member.organization.websites[0].id !== undefined && $scope.member.organization.websites[0].id !== null)
		  {
			  // update existing url
			  if ($scope.member.organization.websites[0].url !== undefined && $scope.member.organization.websites[0].url !== '' && $scope.member.organization.websites[0].url !== null)
			  {
				  Restangular.one('/org/' + $scope.member.organization.id + '/websites/' + $scope.member.organization.websites[0].id)
				  	  .customPUT(websiteData).then(function(response) {
				  		  // now update the organization
				  		  $scope.updateOrgName();
				  	  }, function(response) {$scope.savingOrg = false;
				  	  	  $rootScope.errorHandler(response);
				  	  });
			  }
			  // remove existing url
			  else
			  {
				  Restangular.one('/org/' + $scope.member.organization.id + '/websites/' + $scope.member.organization.websites[0].id)
				  	  .customDELETE().then(function(response) {
				  		  // now update the organization
				  		  $scope.updateOrgName();
				  	  }, function(response) {$scope.savingOrg = false;
				  	  	  $rootScope.errorHandler(response);
				  	  });
			  }
		  }
		  else if ($scope.member.organization.websites[0].url !== undefined && $scope.member.organization.websites[0].url !== '' && $scope.member.organization.websites[0].url !== null)
		  {
			  // add a new url
			  Restangular.one('/org/' + $scope.member.organization.id + '/websites/').customPOST(websiteData)
			  	  .then(function(response) {
			  		  // now update the organization
			  		  $scope.updateOrgName();
			  	  }, function(response) {$scope.savingOrg = false;
			  	  	  $rootScope.errorHandler(response);
			  	  });
		  }
		  else
		  {
			  // nothing to do, just update the org name
			  $scope.updateOrgName();
		  }
	  }
	  $scope.updateOrgName = function()
	  {
		  var nameData = {
			  "name": {
				  "lang_code": $scope.member.organization.name.lang_code,
				  "text": $scope.member.organization.name.text
			  }
		  }
		  Restangular.one('/org/' + $scope.member.organization.id).customPUT(nameData)
	 		  .then(function(response) {
	 			  $scope.member.organization = response;
	 			  $scope.savingOrg = false;
	 			  $scope.editOrg = false;
	 		  }, function(response) {
	 			  $scope.savingOrg = false;
	 			  $rootScope.errorHandler(response);
	 		  });
	  }
	  $scope.createNewOrg = function()
	  {
		  $scope.savingOrg = true;
		  var data = {
			  "name": {
				  "lang_code": "en",
				  "text": $scope.newOrg.name
			  }
		  }
		  // create the organization first
		  Restangular.one('/org/').customPOST(data).then(function(response) {
			  $scope.member.organization = response;
			  // now add the website
			  if ($scope.newOrg.url !== undefined && $scope.newOrg.url !== '' && $scope.newOrg.url !== null)
			  {
			  	  var websiteData = {
			  	      "url": $scope.newOrg.url
			  	  }
			  	  Restangular.one('/org/' + $scope.member.organization.id + '/websites').customPOST(websiteData)
				 	  .then(function(response) {
				 		  $scope.member.organization.websites = response;
				 		  // now update the member
				 		  $scope.setNewOrg();
				  	  }, function(response) {
				  		  $scope.savingOrg = false;
				  		  $rootScope.errorHandler(response);
				  	  });
			  	}
			  	else
			  	{
			  		// now update the member
			  		$scope.setNewOrg();
			  	}
	  	  }, function(response) {
	  		$scope.savingOrg = false;
	  		$rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.setNewOrg = function(id)
	  {
		  var memData = {
		      "id": $scope.member.organization.id
		  }
	 			
	 	  // now update the member
		  Restangular.one('/org/members/' + $scope.memberId + '/organization').customPUT(memData)
			  .then(function(response) {
				  $scope.member.organization = response;
				  $scope.savingOrg = false;
				  $scope.editOrg = false;
				  $scope.showOrgForm = false;
			  }, function(response) {
				  $scope.savingOrg = false;
				  $rootScope.errorHandler(response);
			  });
	  }
	  $scope.showChooseOrgForm = function()
	  {
		  $scope.chooseOrgModal = $modal.open({
			  scope: $scope,
			  templateUrl: 'views/choose_member_org.html',
			  controller: 'ChooseMemberOrgCtrl',
			  size: 'lg'
		  });
	  }
	  $scope.chooseOrg = function(id)
	  {
		  $scope.savingOrg = true;
		  $scope.chooseOrgModal.close();
		  var data = {
			  "id": id
		  }
		  Restangular.one('/org/members/' + $scope.memberId + '/organization').customPUT(data)
		 	  .then(function(response) {
		 		  $scope.member.organization = response;
		 		  $scope.savingOrg = false;
		  	  }, function(response) {
		  		  $scope.savingOrg = false;
		  		  $rootScope.errorHandler(response);
		  	  });
	  };
	  
	  
  });