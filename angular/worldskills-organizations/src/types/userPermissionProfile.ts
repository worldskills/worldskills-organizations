import {AuthProfile} from './profile';
import {DynamicRole, DynamicRoleRequest} from './user';

export interface UserPermissionProfileRequest {
  id: number;
  dynamic_roles?: Array<DynamicRoleRequest>;
  people_ids?: Array<number>;
}

export interface UserPermissionProfile {
  id: number;
  profile: AuthProfile;
  dynamic_roles: Array<DynamicRole>;
}
