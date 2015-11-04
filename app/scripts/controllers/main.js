'use strict';

angular.module('orgApp')
  .controller('MainCtrl', function ($scope, $rootScope, $state, $translate, Language, auth, user, WSAlert, Restangular, PeopleRestangular) {
    $scope.selectedLanguage = Language.selectedLanguage;
    
    $scope.auth = auth;
    $scope.user = user;
    
    $rootScope.memStatusList = false;
    $rootScope.allCountries = false;
    
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
    
    // get the membership status list
    $rootScope.getMemberStatusList = function()
    {
    	Restangular.one('org/members/member_status').get().then( function(result)
    	{
    		$rootScope.memStatusList = result;
    	}, $rootScope.errorHandler);
    }
    
    // get the list of countries
    $rootScope.getCountryList = function()
    {
    	Restangular.one('org/countries').get().then( function(result)
    	{
    		$rootScope.allCountries = result.country_list;
    	}, $rootScope.errorHandler);
    }
    
    // get the list of phone types
    $rootScope.getPhoneTypes = function()
    {
    	Restangular.one('org/phone_types').get().then( function(result)
    	{
    		$rootScope.phoneTypes = result.phone_types;
    	}, $rootScope.errorHandler);
    }
    
    // get list of social networks
    $rootScope.getSocialNetworks = function()
    {
    	PeopleRestangular.one('/social_networks').get().then( function(result)
    	{
    		$rootScope.socialNetworks = result.socialNetworks;
    	}, $rootScope.errorHandler);
    }
    
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
    		if (response.data === undefined)
    		{
    			WSAlert.danger("Unknown error");
    		}
    		else
    		{
    			WSAlert.danger(errLabel + ' ' + response.data.code + ': ' + response.data.user_msg);
    		}
    	});
    	document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    
    $rootScope.getCountryWithId = function(id)
    {
    	if ($rootScope.allCountries === undefined)
    	{
    		return undefined;
    	}
    	
    	var c;
    	angular.forEach($rootScope.allCountries, function(country)
    	{
    		if (country.id == id)
    		{
    			c = country;
    		}
    	});
    	return c;
    }
  });
