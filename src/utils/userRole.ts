import {UserModel} from '@worldskills/worldskills-angular-lib';

export function userHasRoles(user: UserModel, appId: number, ...roles: Array<string>) {
  const userRoles = user && user.roles ? user.roles
    .filter(role => role.roleApplication.applicationCode === appId)
    .map(role => role.name) : [];
  return roles.some(r1 => userRoles.some(r2 => r1 === r2));
}

export function userHasAllRoles(user: UserModel, appId: number, ...roles: Array<string>) {
  const userRoles = user && user.roles ? user.roles
    .filter(role => role.roleApplication.applicationCode === appId)
    .map(role => role.name) : [];
  return roles.every(r1 => userRoles.some(r2 => r1 === r2));
}
