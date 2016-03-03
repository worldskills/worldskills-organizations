'use strict';

angular.module('orgApp')
  .controller('MemberWebsitesCtrl', function ($scope, $rootScope, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular) {
	  
	  $scope.editWeb = -1;
	  $scope.savingWebsite = false;
	  $scope.showWebForm = false;
	  
	  $scope.newWeb = {};
	  
	  
	  $scope.clearNew = function() 
	  {
		  $scope.newWeb = {
			  "url": undefined,
			  "name": undefined,
			  "description": undefined
		  }
	  }
	  
	  $scope.updateWebsite = function(idx)
	  {
		  $scope.savingWebsite = true;
		  $scope.editWeb = idx;
		  var data = {
			  "url": $scope.member.websites[$scope.editWeb].url,
			  "name": {
				  "lang_code": $scope.member.websites[$scope.editWeb].name.lang_code,
				  "text": $scope.member.websites[$scope.editWeb].name.text
			  }
		  }
		  if ($scope.member.websites[$scope.editWeb].description.text != undefined && $scope.member.websites[$scope.editWeb].description.text != null)
		  {
			  var language = $scope.member.websites[$scope.editWeb].description.lang_code;
			  if (language === undefined || language === null)
				  language = 'en';
			  var desc = {
				  "lang_code": language,
				  "text": $scope.member.websites[$scope.editWeb].description.text
			  }
			  data.description = desc;
		  }
		  Restangular.one('/org/members/' + $scope.memberId + '/websites/' + $scope.member.websites[$scope.editWeb].id).customPUT(data)
	 		.then(function(response) {
	 			$scope.member.websites[$scope.editWeb] = response;
	 			$scope.savingWebsite = false;
	 			$scope.editWeb = -1;
	  	  }, function(response) {
	  		$scope.savingWebsite = false;
	  		$rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.createNewWebsite = function()
	  {
		  $scope.savingWebsite = true;
		  var data = {
			  "url": $scope.newWeb.url,
			  "name": {
				  "lang_code": "en",
				  "text": $scope.newWeb.name
			  }
		  };
		  if ($scope.newWeb.description !== undefined && $scope.newWeb.description !== '' && $scope.newWeb.description !== null)
		  {
			  data.description = {
				  "lang_code": "en",
				  "text": $scope.newWeb.description
			  }
		  }
		  Restangular.one('/org/members/' + $scope.memberId + '/websites/').customPOST(data)
	 		  .then(function(response) {
	 			  // get the new list
	 			 $scope.getWebsites();
	  	  }, function(response) {
	  		  $scope.savingWebsite = false;
	  		  $rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.getWebsites = function()
	  {
		  Restangular.one('/org/members/' + $scope.memberId + '/websites/').get()
	 		.then(function(response) {
	 			$scope.member.websites = response.websites;
	 			$scope.savingWebsite = false;
	 			$scope.showWebForm = false;
	 			$scope.clearNew();
	  	  }, function(response) {
	  		$scope.savingWebsite = false;
	  		$rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.deleteWebsite = function(id)
	  {
		  $scope.savingWebsite = true;
		  $translate('DeleteWebsiteConfirm').then(function(msg)
		  {
			  if (confirm(msg))
			  {
				  Restangular.one('/org/members/' + $scope.memberId + '/websites/' + id).customDELETE()
			  		.then(function(response) {
			  			// reload the list
			  			$scope.getWebsites();
				  	  }, function(response) {
				  		$scope.savingWebsites = false;
				  		$rootScope.errorHandler(response);
				  	  });
			  }
			  else
			  {
				  $scope.savingWebsites = false;
			  }
		  });
	  }
	  
	  
  });