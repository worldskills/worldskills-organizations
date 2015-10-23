'use strict';

/**
 * @ngdoc service
 * @name orgApp.Language
 * @description
 * # Language
 * Service in the orgApp.
 */
angular.module('orgApp')
  .service('Language', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
        // AngularJS will instantiate a singleton by calling "new" on this function
	    var LanguageService = {
				selectedLanguage: 'en'	//defaults to en
	    };
	
	    return LanguageService;
  });
