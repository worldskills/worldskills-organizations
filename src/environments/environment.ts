// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   worldskillsAppId: 800,
//   worldskillsPeopleAppId: 600,
//   worldskillsApi: 'http://localhost:8080',
//   worldskillsApiAwards: 'http://localhost:40800/awards',
//   worldskillsApiOrg: 'http://localhost:40800/org',
//   worldskillsApiPeople: 'http://localhost:8080/people',
//   worldskillsApiImages: 'http://localhost:8080/images',
//   worldskillsClientId: '01f623251c02',
//   worldskillsAuthorizeUrl: 'http://localhost:50300/oauth/authorize',
//   worldskillsAuthorizeRedirect: 'http://localhost:11307/',
//   worldskillsAuthorizeUserinfoEndpoint: 'http://localhost:8080/auth/users/loggedIn',
//   worldskillsAuthUriPatterns: ['http://localhost'],
// };
export const environment = {
  production: false,
  worldskillsAppId: 800,
  worldskillsPeopleAppId: 600,
  worldskillsApi: 'https://api.worldskills.show',
  worldskillsApiAwards: 'https://api.worldskills.show/awards',
  worldskillsApiOrg: 'https://api.worldskills.show/org',
  worldskillsApiPeople: 'https://api.worldskills.show/people',
  worldskillsApiImages: 'https://api.worldskills.show/images',
  worldskillsClientId: '58ca72ce57b9',
  worldskillsAuthorizeUrl: 'https://auth.worldskills.show/oauth/authorize',
  worldskillsAuthorizeRedirect: 'http://localhost:11307/',
  worldskillsAuthorizeUserinfoEndpoint: 'https://api.worldskills.show/auth/users/loggedIn',
  worldskillsAuthUriPatterns: ['http://localhost', 'https://api.worldskills.show', 'https://auth.worldskills.show'],
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
