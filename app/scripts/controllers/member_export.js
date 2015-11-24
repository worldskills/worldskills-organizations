'use strict';

angular.module('orgApp')
  .controller('MemberExportCtrl', function ($scope, $rootScope, $state, $translate, auth, user, WSAlert, $http, REST_BASE_URL, Downloader) {
	  
	  $scope.export = function()
	  {
		  $http({url: REST_BASE_URL + "/org/members/export", method: "GET", params: { s: "xlsx" }, responseType : "blob"})
  		.success( function(data, status, headers) {
  			
  			var filename = 'WorldSkills_Members.xlsx';
  			Downloader.handleDownload(data, status, headers, filename);
  			
  		})
  	    .error(function(data, status) {
  	        console.log("Request failed with status: " + status);
  	    });
	  }
  });
