'use strict';

/**
 * @ngdoc overview
 * @name orgApp
 * @description
 * # orgApp
 *
 * Main module of the application.
 */
angular
  .module('orgApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate',
    'worldskills.utils',
    'restangular',
    'ui.select2',
    'angularFileUpload'
  ])
    .config(function ($routeProvider, $translateProvider, $stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, REST_BASE_URL, APP_ROLES) {
    
    $urlRouterProvider.otherwise('/');

    
  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
  $translateProvider.useLocalStorage();
  $translateProvider.useSanitizeValueStrategy('sanitize');

  //language negotiation
  //http://angular-translate.github.io/docs/#/guide/09_language-negotiation
  // $translateProvider.registerAvailableLanguageKeys(['en', 'pt'], {
  //   'en_US': 'en',
  //   'en_UK': 'en',
  //   'pt_BR': 'pt'    
  // });

  RestangularProvider.setBaseUrl(REST_BASE_URL);

//routes
  $stateProvider

  // //index
    .state('index', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      data: {
          requireLoggedIn: true
      }
    })
    .state('member_list', {
      url: '/members',
      templateUrl: 'views/member_list.html',
      controller: 'MemberListCtrl',
      data: {
          requireLoggedIn: true
      }
    })
    /*.state('member', {
      url: '/members/{member_id}',
      templateUrl: 'views/member.html',
      controller: 'MemberCtrl',
      data: {
          requireLoggedIn: true
      }
    })*/
    .state('member', {
	    url: '/members/{member_id}',
	    templateUrl: 'views/member.html',
	    controller: 'MemberCtrl',
	    abstract: true,
	    data: {
	      requireLoggedIn: true,
	      requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	      ],
	      pageName: 'MemberInfo'
	    }
    })
    .state('member.info', {
	    url: '',
	    templateUrl: 'views/member.info.html',
	    controller: 'MemberInfoCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'MemberInfo'
	    }
	})
	.state('member.org', {
	    url: '/org',
	    templateUrl: 'views/member.org.html',
	    controller: 'MemberOrgCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'MemberOrg'
	    }
	})
	.state('member.membership', {
	    url: '/membership',
	    templateUrl: 'views/member.membership.html',
	    controller: 'MemberMembershipCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'Membership'
	    }
	})
	.state('member.contacts', {
	    url: '/contacts',
	    templateUrl: 'views/member.contacts.html',
	    controller: 'MemberContactsCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'Contacts'
	    }
	})
	.state('member.addresses', {
	    url: '/addresses',
	    templateUrl: 'views/member.addresses.html',
	    controller: 'MemberAddressesCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'Addresses'
	    }
	})
	.state('member.websites', {
	    url: '/websites',
	    templateUrl: 'views/member.websites.html',
	    controller: 'MemberWebsitesCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'Websites'
	    }
	})
	.state('member.phones', {
	    url: '/phones',
	    templateUrl: 'views/member.phones.html',
	    controller: 'MemberPhonesCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'PhoneNums'
	    }
	})
	.state('member.social_media', {
	    url: '/social_media',
	    templateUrl: 'views/member.social_media.html',
	    controller: 'MemberSocialMediaCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN},
	          {code: 800, role: APP_ROLES.EDIT_MEMBER}
	        ],
	        pageName: 'SocMedia'
	    }
	})
	.state('member_export', {
	    url: '/member_export',
	    templateUrl: 'views/member_export.html',
	    controller: 'MemberExportCtrl',
	    data:{
	        requireLoggedIn: true,
	        requiredRoles: [
	          {code: 800, role: APP_ROLES.ADMIN}
	        ]
	    }
	})
    ;

  })
  // set up a restangular object for the people service
  .factory('PeopleRestangular', function(Restangular, API_PEOPLE) {
	  return Restangular.withConfig(function(RestangularConfigurer) {
		  RestangularConfigurer.setBaseUrl(API_PEOPLE);
	  });
  })
.run(function($rootScope, $state, $stateParams, auth, user, $window, Restangular){
  $rootScope.available_languages = {"en":"English"};

  $rootScope.initialised = false;
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  
  if (!auth.loggedIn )
  {
	  $window.location.href = auth.loginUrl;
  }
  
  Restangular.setErrorInterceptor(
	  function(response)
	  {
		  // if the user is not authorised to perform the action, redirect to login
		  if (response.status == 401 || response.status == 403)
		  {
			  $window.location.href = auth.loginUrl;
		  }
	  }
  );
  
});
