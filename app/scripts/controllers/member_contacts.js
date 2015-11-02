'use strict';

angular.module('orgApp')
  .controller('MemberContactsCtrl', function ($scope, $rootScope, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular, $modal) {
	  
	  $scope.addContactModal = false;
	  
	  // contact functions
	  $scope.removeContact = function(id)
	  {
		  $scope.savingContacts = true;
		  $translate('RemoveContactConfirm').then(function(msg)
		  {
			  if (confirm(msg))
			  {
				  Restangular.one('/org/members/' + $scope.memberId + '/contacts/' + id).customDELETE()
			  		.then(function(response) {
			  			// reload the list
			  			$scope.getContacts();
				  	  }, function(response) {
				  		$scope.savingContacts = false;
				  		$rootScope.errorHandler(response);
				  	  });
			  }
			  else
			  {
				  $scope.savingContacts = false;
			  }
		  });
	  }
	  $scope.getContacts = function()
	  {
		  $scope.savingContacts = true;
		  
		  Restangular.one('/org/members/' + $scope.memberId + '/contacts').get()
			  .then(function(response) {
				    $scope.member.contacts = response.contacts;
				    $scope.savingContacts = false;
			  	  }, function(response) {
			  		$scope.savingContacts = false;
			  		$rootScope.errorHandler(response);
			  	  });
		  
	  }
	  $scope.showContactForm = function()
	  {
		  $scope.addContactModal = $modal.open({
			  scope: $scope,
			  templateUrl: 'views/add_member_contact.html',
			  controller: 'AddMemberContactCtrl',
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