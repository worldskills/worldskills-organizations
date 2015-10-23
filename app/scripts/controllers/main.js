'use strict';

angular.module('orgApp')
  .controller('MainCtrl', function ($scope, $rootScope, $state, $translate, Language, auth, user, WSAlert, Restangular) {
    $scope.selectedLanguage = Language.selectedLanguage;
    
    $scope.auth = auth;
    $scope.user = user;
    
    
    $scope.logout = function (e) {
        auth.logout();
    };
    
    $scope.$on('$stateChangeStart', function () {
    	WSAlert.clear();
    });
    
    $rootScope.currentMemberPage = 1;
    $rootScope.memFilter = {
    	sort: "name"
    };
    
    // get all the existing members
    $rootScope.getAllMembers = function()
    {
    	Restangular.one('org/members').get({sort: name, limit: 500, offset: 0}).then( function(result)
    	{
    		$rootScope.allMembers = result.members;
    	}, $rootScope.errorHandler);
    };
    
    // load all the stuff we need 
    if ($rootScope.initialised === false)
    {
    	$rootScope.initialised = true;
    	$rootScope.getAllMembers();
    }
    
    // handler for an error
    $rootScope.errorHandler = function(response)
    {
    	$scope.loading = false;
    	$translate('Error').then(function(errLabel)
    	{
    		alert.error(errLabel + ' ' + response.data.code + ': ' + response.data.user_msg);
    	});
    	document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
  });
