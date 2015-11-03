'use strict';

angular.module('orgApp')
  .controller('MemberPhonesCtrl', function ($scope, $rootScope, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular) {
	 
	  $scope.editPhone = -1;
	  $scope.savingPhones = false;
	  $scope.showPhoneForm = false;
	  $scope.newPrefix = undefined;
	  
	  $scope.newPhone = {};
	  
	  
	  $scope.clearNew = function() 
	  {
		  $scope.newPhone = {
			  "country": undefined,
			  "phone_number": undefined,
			  "type": undefined
		  }
		  $scope.newPrefix = undefined;
	  }
	  
	  $scope.clearNew();
	  
	  // get the phone types if we need to
	  if ($rootScope.phoneTypes === undefined)
	  {
		  $rootScope.getPhoneTypes();
	  }
	  
	  $scope.$watch("newPhone.country", function(newValue, oldValue)
	  {
		  angular.forEach($rootScope.allCountries, function(country) {
			 if (country.id == newValue) 
			 {
				 $scope.newPrefix = country.phone_prefix;
			 }
		  });
	  });
	  $scope.addPhone = function()
	  {
		  $scope.savingPhones = true;
		  var data = {
			  "type": $scope.newPhone.type,
			  "country": $scope.newPhone.country,
			  "phone_number": $scope.newPhone.phone_number
		  }
		  Restangular.one('/org/members/' + $scope.memberId + '/phones/').customPOST(data)
	 	  .then(function(response) {
	 		  // get the new list
	 		  $scope.getPhones();
	  	  }, function(response) {
	  		  $scope.savingPhones = false;
	  		  $rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.getPhones = function()
	  {
		  $scope.savingPhones = true;
		  Restangular.one('/org/members/' + $scope.memberId + '/phones/').get()
	 	  .then(function(response) {
	 		  $scope.member.phones = response.phones;
	 		  $scope.savingPhones = false;
	 		  $scope.showPhoneForm = false;
	 		  $scope.clearNew();
	  	  }, function(response) {
	  		  $scope.savingPhones = false;
	  		  $rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.removePhone = function(id)
	  {
		  $scope.savingPhones = true;
		  $translate('DeletePhoneConfirm').then(function(msg)
		  {
			  if (confirm(msg))
			  {
				  Restangular.one('/org/members/' + $scope.memberId + '/phones/' + id).customDELETE()
			 	  .then(function(response) {
			 		 $scope.getPhones();
			 	  }, function(response) {
			  		  $scope.savingPhones = false;
			  		  $rootScope.errorHandler(response);
			  	  });
			  }
			  else
			  {
				  $scope.savingPhones = false;
			  }
		  });
	  }
	  
  });