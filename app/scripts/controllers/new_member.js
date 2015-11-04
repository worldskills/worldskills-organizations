'use strict';

angular.module('orgApp')
  .controller('NewMemberCtrl', function ($scope, $rootScope, $state, $translate, Language, auth, user, WSAlert, Restangular) {
	  
	  $scope.showCountryForm = false;
	  $scope.savingMember = false;
	  
	  $scope.newMember = {
		  "name": undefined,
		  "code": undefined,
		  "parent_id": undefined,
		  "status": undefined,
		  "year": undefined,
		  "country_id": undefined
	  }
	  
	  if ($rootScope.memStatusList === false)
	  {
		  $rootScope.getMemberStatusList();
	  }
	  
	  if ($rootScope.allCountries === false)
	  {
		  $rootScope.getCountryList();
	  }
	  
	  // see if we should be showing the country form
	  $scope.$watch("newMember.parent_id", function(newValue, oldValue)
	  {
		  $scope.newMember.country_id = undefined;
		  $scope.showCountryForm = false;
		  angular.forEach($rootScope.allMembers, function(parent) {
			 if (parent.id == newValue && parent.member_of.length == 0) 
			 {
				 $scope.showCountryForm = true;
			 }
		  });
	  });
	  
	  $scope.createMember = function()
	  {
		  if ($scope.showCountryForm === true && $scope.newMember.country_id === undefined)
		  {
			  $translate('SelCountryMsg').then(function(msg)
			  {
				  WSAlert.danger(msg);
			  });
			  return;
		  }
		  $scope.savingMember = true;
		  
		  var memData = {
			  "code": $scope.newMember.code,
			  "name": {
				  "lang_code": "en",
				  "text": $scope.newMember.name
			  },
			  "name_1058": {
				  "lang_code": "en",
				  "text": $scope.newMember.name
			  },
			  "member_of": {
				  "id": $scope.newMember.parent_id,
				  "status": $scope.newMember.status,
				  "year_joined": $scope.newMember.year
			  }
		  }
		  console.log(memData);
		  // create the new member
		  Restangular.one('/org/members/').customPOST(memData)
	 	  .then(function(response) {
	 		  var newId = response.id;
	 		  if ($scope.newMember.country_id !== undefined)
	 		  {
	 			  // now set the country data
	 			  var country = $rootScope.getCountryWithId($scope.newMember.country_id);
	 			  if (country === undefined)
	 			  {
	 				  $translate('NoCountryDataMsg').then(function(msg)
	 				  {
	 					  WSAlert.danger(msg);
	 				  });
	 				  return;
	 			  }
	 			  
	 			  var countryData = {
	 				  "code": country.code,
	 				  "name": {
	 					  "lang_code": "en",
	 					  "text": country.name.text
	 				  },
	 				  "phone_prefix": country.phone_prefix,
	 				  "member": newId
	 			  };
	 			 Restangular.one('/org/countries/' + country.code).customPUT(countryData)
			 	  .then(function(response) {
			 		  // now redirect to editting the new member
			 		  $scope.newMemberModal.close();
			 		  $state.go('member.info', {member_id: newId});
			  	  }, function(response) {
			  		  $scope.savingMember = false;
			  		  $rootScope.errorHandler(response);
			  	  });
	 		  }
	 		  else
	 		  {
	 			  // just redirect to the edit screen
	 			  $scope.newMemberModal.close();
	 			  $state.go('member.info', {member_id: newId});
	 		  }
	  	  }, function(response) {
	  		  $scope.savingMember = false;
	  		  $rootScope.errorHandler(response);
	  	  });
	  }
	  
	  
  });
    

// filter to select countries without a Member
angular.module('orgApp').filter('countryWithoutMember', function () {
	  return function (items) {
	    var filtered = [];
	    for (var i = 0; i < items.length; i++) {
	      var item = items[i];
	      if (!item.member) {
	        filtered.push(item);
	      }
	    }
	    return filtered;
	  };
	});