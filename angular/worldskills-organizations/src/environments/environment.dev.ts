// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  worldskillsAppId: 800,
  worldskillsPeopleAppId: 600,
  worldskillsAuthAppId: 300,
  worldskillsApi: 'http://localhost:8080',
  worldskillsApiAuth: 'http://localhost:8080/auth',
  worldskillsApiPeople: 'http://localhost:8090/people',
  worldskillsApiEvents: 'https://localhost:8090/events',
  worldskillsApiImages: 'http://localhost:8080/images',
  worldskillsApiResources: 'http://localhost:9999/resources',
  worldskillsClientId: '49775efbb906',
  worldskillsAuthorizeUrl: 'http://localhost:8080/auth',
  worldskillsAuthorizeRedirect: 'http://localhost:10600/',
  worldskillsAuthorizeUserinfoEndpoint: 'http://localhost:8080/auth/users/loggedIn',
  worldskillsPuppeteer: 'https://localhost:8080/auth/sessions/operate_puppet',
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
