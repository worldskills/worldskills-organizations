'use strict';

angular.module('orgApp')
  .controller('MemberCtrl', function ($scope, $rootScope, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular, API_IMAGES, FileUploader) {
    
	  $scope.memberId = $stateParams.member_id;
	  $scope.savingMember = false;
	  
	  $scope.getMember = function(id)
	  {
		  Restangular.one('org/members', id).get().then( function(result) 
		  {
			  $scope.member = result;
		  }, $rootScope.errorHandler);
	  };
	  
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
	  $scope.clearUploadQueue = function() {
		  $scope.uploader.clearQueue();
	  };
	  
	  $scope.saveMemberInfo = function() {
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
	  $scope.uploader.onErrorItem = function(item, response, status, headers) {
		  $scope.savingMember = false;
		  $translate('couldNotUploadImage').then(function(msg)
       	  {
        	  WSAlert.danger(msg);
          });
	  }
	  $scope.uploader.onSuccessItem = function(item, response, status, headers) {
		  // now that the upload is complete, send the update to the member with the new image
		  $scope.sendMemberUpdate(response.id, response.thumbnail_hash);
	  };
	  // send the update request
	  $scope.sendMemberUpdate = function(imageId, thumbnail) {
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
	  
	  
  });