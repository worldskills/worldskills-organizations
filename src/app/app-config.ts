export const MembershipStatuses = [
  'FULL',
  'ASSOCIATE',
  'INACTIVE_FULL',
  'INACTIVE_ASSOCIATE',
  'FORMER_MEMBER'
];

export const defaultErrorMessage = 'An error has occured and your action was not processed.';
export const notLoggedInCode = '800-101';
export const authorizationMissingCode = '100-100';

export const menuConfig = [
  { label: 'Organizations', url: '/organizations', params: [], hidden: false, requireLogin: false, requiredRoles: [] },
  { label: 'Members', url: '/members', params: [], hidden: false, requireLogin: false, requiredRoles: [] },
];
