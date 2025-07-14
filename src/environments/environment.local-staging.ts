// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

/*
export const environment = {
  production: false,
  version: '1.0.0',
  name: 'dev',
  sentryDsn: 'https://3600ef7737ac44dd9c51ee143b204c64@o200076.ingest.sentry.io/5226864',
  sentryEnvironment: 'staging',
  sentryDebug: true,
  sentryEnabled: true,
  defaultRoute: '/home',
  defaultUrl: 'http://localhost:13600/',
  loginUrl: 'https://auth.worldskills.show/oauth/authorize',
  apiUrl: 'https://api.worldskills.show',
  clientId: '9e5b29640b39',
  languageCode: 'en',
  sessionIdleTimeMS: 900000, // 15 minutes
  sessionPingTimeMS: 300000, // 5 minutes
};

export const routes = {
  authApi: `${environment.apiUrl}/auth`,
  votesApi: `${environment.apiUrl}/votes`,
  peopleApi: `${environment.apiUrl}/people`,
  orgApi: `${environment.apiUrl}/org`,
};

export const appRoles = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  VOTER: 'Voter'
};

export const errorMessages = {
  genericTitle: 'Oops! something went wrong!',
  genericMessage: 'Please try again, if this error persists contact your Administrator'
};

export const gaEntities = [ // general assembly
  { id: 1, year: 2020, active: false, note: 'General Assembly 2020 Vote' },
  { id: 2, year: 2021, active: false, note: 'General Assembly 2021 Vote' },
  // { id: 2611, year: 2022 } // session 1
  { id: 2867, year: 2022, active: false, note: 'General Assembly 2022 Vote' }, // session 2
  { id: 3163, year: 2023, active: false, note: 'General Assembly 2023 Vote' }, // GA 2023
  { id: 4325, year: 2024, active: false, note: 'General Assembly 2024 Vote' }, // GA2024
  { id: 5052, year: 2025, active: false, note: 'General Assembly 2025 Vote' }
];

export const cpwEntities = [ // competition preperation week
  { id: 2292, year: 2022, active: false, note: 'Competition Preperation Week 2022 Vote' }
];

export const egaEntities = [ // extraorginary general assembly
  { id: 2676, year: 2022, active: false, note: 'General Assembly 2022 Vote' },
  { id: 3145, year: 2023, active: false, note: 'General Assembly 2023 Vote' },
];

export const ccEntities = [ // competitions committee
  { id: 2803, year: 2022, active: false, note: 'Competitions Committee 2022 Vote' }
];

export const voteEntities = [gaEntities, cpwEntities, egaEntities, ccEntities];
*/
