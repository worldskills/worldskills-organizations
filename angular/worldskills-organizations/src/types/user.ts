import {Link, List} from './common';
import {AuthEntity} from './entity';
import {Role} from './role';
import {UserPermissionProfile} from './userPermissionProfile';

export interface DynamicRoleRequest {
  role_id: number;
  ws_entity_id: number;
}

export interface DynamicRole {
  id: number;
  role: Role;
  ws_entity: AuthEntity;
}

export interface UserRequest {
  active: boolean;
  first_name: string;
  last_name: string;
  username: string;
}

export interface User extends UserRequest {
  id: number;
  person_id: number;
  legacy_id?: any;
  email_addresses: Array<string>;
  roles: Array<Role>;
  user_profiles: Array<UserPermissionProfile>;
  links: Array<Link>;
  password?: any;
  pin?: any;
  has_pin: boolean;
}

export type UserList = List<User, 'users'>;
