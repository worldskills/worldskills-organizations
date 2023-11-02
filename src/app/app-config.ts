export const MembershipStatuses = [
  'FULL',
  'ASSOCIATE',
  'INACTIVE_FULL',
  'INACTIVE_ASSOCIATE',
  'FORMER_MEMBER'
];

export const OrgRelations = [
  { value : '', label: 'Any Relationship' },
  { value: 'CHILD', label: 'Child' },
  { value: 'GLOBAL_PARTNER', label: 'Global Partner' },
  { value: 'HOST', label: 'Host' },
  { value: 'OBSERVER', label: 'Observer' },
  { value: 'NGO_PARTNER', label: 'NGO Partner' },
  { value: 'MEMBER', label: 'Member' },
  { value: 'MEMBER_PARTNER', label: 'Member Partner' },
  { value: 'POTENTIAL_MEMBER', label: 'Potential Member' },
  { value: 'PARENT', label: 'Parent' },
  { value: 'SPONSOR', label: 'Sponsor' },
  { value: 'SUPPLIER', label: 'Supplier' },
  { value: 'SUPPORTER', label: 'Supporter' },
]

export const homepage = 'organizations';

export const defaultErrorMessage = 'An error has occured and your action was not processed.';
export const notLoggedInCode = '800-101';
export const authorizationMissingCode = '100-100';

export const menuConfig = [
  { label: 'Organizations', url: '/organizations', params: [], hidden: false, requireLogin: false, requiredRoles: [ 'Admin', 'EditOrganization'] },
  { label: 'Members', url: '/members', params: [], hidden: false, requireLogin: false, requiredRoles: [] },
];
