// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  worldskillsAppId: 800,
  worldskillsPeopleAppId: 600,
  worldskillsApi: 'http://localhost:8080',
  worldskillsApiOrg: 'http://localhost:8090/org',
  worldskillsApiPeople: 'http://localhost:8090/people',
  worldskillsApiImages: 'http://localhost:8080/images',
  worldskillsClientId: '49775efbb906',
  worldskillsAuthorizeUrl: 'http://localhost:8080/auth',
  worldskillsAuthorizeRedirect: 'http://localhost:10600/',
  worldskillsAuthorizeUserinfoEndpoint: 'http://localhost:8080/auth/users/loggedIn',
  worldskillsAuthUriPatterns: ['localhost'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
