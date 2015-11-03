'use strict';

angular.module('orgApp')
  .controller('MemberAddressesCtrl', function ($scope, $rootScope, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular, $modal) {
	 
	  $scope.savingAddress = false;
	  $scope.showNewAddressForm = false;
	  $scope.newAddr = {};
	  $scope.editAddr = -1;
	  
	  $scope.clearNewAddr = function() 
	  {
		  $scope.newAddr = {
			  "line1": undefined,
			  "line2": undefined,
			  "line3": undefined,
			  "line4": undefined,
			  "city": undefined,
			  "zip_code": undefined,
			  "country": undefined
		  }
	  }
	  
	  $scope.clearNewAddr();
	  
	  $scope.addAddress = function()
	  {
		  $scope.savingAddress = true;
		  var data = {
			  "line1": $scope.newAddr.line1,
			  "line2": $scope.newAddr.line2,
			  "line3": $scope.newAddr.line3,
			  "line4": $scope.newAddr.line4,
			  "city": $scope.newAddr.city,
			  "zip_code": $scope.newAddr.zip_code,
			  "country": $scope.newAddr.country
		  }
		  Restangular.one('/org/members/' + $scope.memberId + '/addresses').customPOST(data)
		 	  .then(function(response) {
		 		  $scope.member.addresses = response.address_list;
		 		  $scope.savingAddress = false;
		 		  $scope.showNewAddressForm = false;
		 		  $scope.clearNewAddr();
		  	  }, function(response) {
		  		  $scope.savingAddress = false;
		  		  $rootScope.errorHandler(response);
		  	  });
	  };
	  $scope.editAddress = function(addrIndex)
	  {
		  $scope.editAddr = addrIndex;
	  };
	  $scope.updateAddress = function()
	  {
		  if ($scope.editAddr > -1)
		  {
			  $scope.savingAddress = true;
			  var data = {
				  "line1": $scope.member.addresses[$scope.editAddr].line1,
				  "line2": $scope.member.addresses[$scope.editAddr].line2,
				  "line3": $scope.member.addresses[$scope.editAddr].line3,
				  "line4": $scope.member.addresses[$scope.editAddr].line4,
				  "city": $scope.member.addresses[$scope.editAddr].city,
				  "zip_code": $scope.member.addresses[$scope.editAddr].zip_code,
				  "country": $scope.member.addresses[$scope.editAddr].country.code
			  };
			  Restangular.one('/org/members/' + $scope.memberId + '/addresses/' + $scope.member.addresses[$scope.editAddr].id).customPUT(data)
			 	  .then(function(response) {
			 		  $scope.member.addresses[$scope.editAddr] = response;
			 		  $scope.savingAddress = false;
			 		  $scope.showNewAddressForm = false;
			 		  $scope.editAddr = -1;
			  	  }, function(response) {
			  		  $scope.savingAddress = false;
			  		  $rootScope.errorHandler(response);
			  	  });
		  }
	  };
	  $scope.removeAddress = function(id)
	  {
		  $scope.savingAddress = true;
		  $translate('RemoveAddrConfirm').then(function(msg)
		  {
			  if (confirm(msg))
			  {
				  Restangular.one('/org/members/' + $scope.memberId + '/addresses/' + id).customDELETE()
				  	  .then(function(response) {
				  		  // reload the list
				  		  $scope.getAddresses();
				  	  }, function(response) {
				  		  $scope.savingAddress = false;
				  		  $rootScope.errorHandler(response);
				  	  });
			  }
			  else
			  {
				  $scope.savingAddresses = false;
			  }
		  });
	  }
	  $scope.getAddresses = function()
	  {
		  $scope.savingAddress = true;
		  Restangular.one('/org/members/' + $scope.memberId + '/addresses/').get()
		  .then(function(response) {
	 		  $scope.member.addresses = response.address_list;
	 		  $scope.savingAddress = false;
	  	  }, function(response) {
	  		  $scope.savingAddress = false;
	  		  $rootScope.errorHandler(response);
	  	  });
	  }
	  
  });