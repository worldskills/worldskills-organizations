(function() {
    'use strict';

    var restBaseUrl = 'http://localhost:9090';
    var authBaseUrl = 'http://localhost:8088';
    var loginApp = 'http://worldskillsdevauth.com';
    
    var wsApp = angular.module('orgApp'); 
    wsApp.constant('REST_BASE_URL', restBaseUrl);
    wsApp.constant('CLIENT_ID', '01f623251c02');
    wsApp.constant('WORLDSKILLS_CLIENT_ID', 'a95703d1aa96');
    wsApp.constant('API_AUTH', authBaseUrl + '/auth');
    wsApp.constant('WORLDSKILLS_API_AUTH', authBaseUrl + '/auth');
    wsApp.constant('AUTHORIZE_URL', loginApp + '/oauth/authorize');
    wsApp.constant('WORLDSKILLS_AUTHORIZE_URL', loginApp + '/oauth/authorize');
    wsApp.constant('LOGOUT_URL', loginApp + '/logout');
    wsApp.constant('API_AUTH_CODE', 800);
    wsApp.constant('API_IMAGES', 'http://localhost:9292/images/');
    wsApp.constant('API_PEOPLE', 'http://localhost:8080/people');
    
    wsApp.constant('APP_ROLES', {
        ADMIN: 'Admin',
        EDIT_MEMBER: 'EditMember',
        EDIT_ORG: 'EditOrg',
        EDIT_COUNTRIES: 'EditCountries'
    });
    
})();
