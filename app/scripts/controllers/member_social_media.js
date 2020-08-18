'use strict';

angular.module('orgApp')
  .controller('MemberSocialMediaCtrl', function ($scope, $rootScope, $stateParams, $translate, Language, auth, user, 
		  WSAlert, Restangular) {
	 
	  $scope.savingSocMedia = false;
	  $scope.showSocMediaForm = false;
	  
	  $scope.newSocMedia = {};
	  
	  
	  $scope.clearNew = function() 
	  {
		  $scope.newSocMedia = {
			  "social_network": undefined,
			  "identifier": undefined
		  }
	  }
	  
	  if ($rootScope.socialNetworks === undefined)
	  {
		  $rootScope.getSocialNetworks();
	  }
	  
	  $scope.clearNew();
	  
	  $scope.getSocialLink = function(index)
	  {
		  var id = $scope.member.social_networks[index].social_network_identifier;
		  switch($scope.member.social_networks[index].social_network.id)
		  {
		  	  case 1:
		  		  return 'https://www.facebook.com/' + id;
		  	  case 3:
		  		  return 'https://twitter.com/' + id;
		  	  case 4:
		  		  return 'https://www.linkedin.com/' + id;
		  	  case 5:
		  		  return 'https://vine.co/' + id;
		  	  case 6:
		  		  return 'http://instagram.com/' + id;
		  	  case 7:
		  		  return 'https://www.flickr.com/photos/' + id;
		  	  case 8:
		  		  return 'https://www.youtube.com/' + id;
		  	  default:
		  		  return '';
		  }
	  }
	  $scope.addSocMedia = function()
	  {
		  $scope.savingSocMedia = true;
		  var data = {
			  "social_network": $scope.newSocMedia.social_network,
			  "social_network_identifier": $scope.newSocMedia.identifier
		  };
		  Restangular.one('/org/members/' + $scope.memberId + '/social_networks/').customPOST(data)
	 	  .then(function(response) {
	 		  // get the new list
	 		  $scope.getSocMedia();
	  	  }, function(response) {
	  		  $scope.savingSocMedia = false;
	  		  $rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.getSocMedia = function()
	  {
		  $scope.savingSocMedia = true;
		  Restangular.one('/org/members/' + $scope.memberId + '/social_networks/').get()
	 	  .then(function(response) {
	 		  // get the new list
	 		  $scope.member.social_networks = response.social_networks;
	 		  $scope.savingSocMedia = false;
	 		  $scope.showSocMediaForm = false;
	 		  $scope.clearNew();
	  	  }, function(response) {
	  		  $scope.savingSocMedia = false;
	  		  $rootScope.errorHandler(response);
	  	  });
	  }
	  $scope.removeSocMedia = function(id)
	  {
		  $scope.savingSocMedia = true;
		  $translate('DeleteSocMediaConfirm').then(function(msg)
		  {
			  if (confirm(msg))
			  {
				  Restangular.one('/org/members/' + $scope.memberId + '/social_networks/' + id).customDELETE()
			  		.then(function(response) {
			  			// reload the list
			  			$scope.getSocMedia();
				  	  }, function(response) {
				  		$scope.savingSocMedia = false;
				  		$rootScope.errorHandler(response);
				  	  });
			  }
			  else
			  {
				  $scope.savingSocMedia = false;
			  }
		  });
	  }
	  
	  
  });