'use strict';

angular.module('orgApp')
  .controller('MemberCtrl', function ($scope, $rootScope, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular, API_IMAGES, FileUploader, $modal) {
    
	  // initialise variables
	  $scope.memberId = $stateParams.member_id;
	  $scope.savingMember = false;
	  $scope.showMembershipForm = false;
	  $scope.newMShip = {};
	  if ($rootScope.memStatusList === false)
	  {
		  $rootScope.getMemberStatusList();
	  }
	  if ($rootScope.allCountries === false)
	  {
		  $rootScope.getCountryList();
	  }
	  $scope.editMem = -1;
	  $scope.addContactModal = false;
	  $scope.editOrg = false;
	  $scope.savingOrg = false;
	  $scope.showOrgForm = false;
	  $scope.newOrg = {};
	  $scope.chooseOrgModal = false;
	  $scope.savingAddress = false;
	  $scope.showNewAddressForm = false;
	  $scope.newAddr = {};
	  $scope.editAddr = -1;
	  
	  
	  $scope.getMember = function(id)
	  {
		  Restangular.one('org/members', id).get().then( function(result) 
		  {
			  $scope.member = result;
		  }, $rootScope.errorHandler);
	  };
	  
	  $scope.clearNewMShip = function() 
	  {
		  $scope.newMShip = {
			  "member_id": undefined,
			  "status": undefined,
			  "year_joined": undefined
		  }
	  }
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
	  
	  
	  $scope.clearNewMShip();
	  $scope.clearNewAddr();
	  
	  // fetch the member
	  $scope.getMember($scope.memberId);
	  
	  
	  // set up flag uploader
	  $scope.uploader = new FileUploader({
          scope: $scope,                   
          queueLimit: 1,
          url: API_IMAGES,
          formData: [
              { key: 'value' }
          ],
          headers: {
        	  'Authorization': 'bearer ' + sessionStorage.getItem('access_token')
          },
          filters: []
      });
	  $scope.clearUploadQueue = function() 
	  {
		  $scope.uploader.clearQueue();
	  };
	  
	  $scope.saveMemberInfo = function() 
	  {
		  $scope.savingMember = true;
		  // do we have a new image to save?
		  if ($scope.uploader.queue.length > 0)
		  {
			  $scope.uploader.queue[0].url = API_IMAGES;
			  $scope.uploader.queue[0].method = 'POST';
			  //$scope.uploader.queue[0].formData.push({'requestData': angular.toJson(data)});
			  $scope.uploader.queue[0].upload();
		  }
		  else
		  {
			  $scope.sendMemberUpdate();
		  }
	  };
	  $scope.uploader.onErrorItem = function(item, response, status, headers) 
	  {
		  $scope.savingMember = false;
		  $translate('couldNotUploadImage').then(function(msg)
       	  {
        	  WSAlert.danger(msg);
          });
	  }
	  $scope.uploader.onSuccessItem = function(item, response, status, headers) 
	  {
		  // now that the upload is complete, send the update to the member with the new image
		  $scope.sendMemberUpdate(response.id, response.thumbnail_hash);
	  };
	  // send the update request
	  $scope.sendMemberUpdate = function(imageId, thumbnail) 
	  {
		  var data = {
			  "code": $scope.member.code,
			  "name": {
				  "lang_code": "en",
				  "text": $scope.member.name.text
			  },
			  "name_1058": { 		
				  "lang_code": "en",
				  "text": $scope.member.name_1058.text
			  },
		  };
		  if (imageId !== undefined && thumbnail !== undefined)
		  {
			  data.flag = {
				  "image_id": imageId,
				  "thumbnail_hash": thumbnail
			  }
		  }
		  Restangular.one('/org/members/' + $scope.memberId).customPUT(data)
		  		.then(function(response) {
		  			$scope.clearUploadQueue();
		  			$scope.savingMember = false;
		  			$scope.member = response;
			  		document.body.scrollTop = document.documentElement.scrollTop = 0;
			  		$translate('saveMemberMsg').then(function(msg)
			  		{
			  			  WSAlert.success(msg);
			  		});
			  	  }, function(response) {
			  		$scope.savingMember = false;
			  		$rootScope.errorHandler(response);
			  	  });
	  };
	  
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
	  
	  
	  
	  $scope.updateOrg = function()
	  {
		  $scope.savingOrg = true;
		  if ($scope.member.organization.websites[0] === undefined)
		  {
			  $scope.updateOrgName();
			  return;
		  }
		  
		  
		  var websiteData = {
			  "url": $scope.member.organization.websites[0].url
		  }
		  // update the website first
		  if ($scope.member.organization.websites[0].id !== undefined)
		  {
			  // update existing url
			  if ($scope.member.organization.websites[0].url !== undefined && $scope.member.organization.websites[0].url !== '')
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
		  else if ($scope.member.organization.websites[0].url !== undefined && $scope.member.organization.websites[0].url !== '')
		  {
			  // add a new url
			  Restangular.one('/org/' + $scope.member.organization.id + '/websites/').customPOST(websiteData).then(function(response) {
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
			  	if ($scope.newOrg.url !== undefined && $scope.newOrg.url !== '')
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
				  $scope.savingContacts = false;
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