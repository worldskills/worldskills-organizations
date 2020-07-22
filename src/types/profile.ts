import {Link, List} from './common';
import {Role} from './role';
import {AuthEntity} from './entity';
import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {Website} from './website';
import {ProfileSocialNetwork as SocialNetwork} from './socialNetwork';

export interface PermittedEntity {
  id: number;
  name: I18nModel;
  links: Array<Link>;
}

export interface AuthProfileRoleRequest {
  role: number;
  dynamic_entity: boolean;
  ws_entity?: number;
}

export interface AuthProfileRole {
  id: number;
  role: Role;
  ws_entity: AuthEntity;
  dynamic_entity: boolean;
}

export interface AuthProfileRequest {
  name: I18nModel;
  permitted_entities: Array<PermittedEntity>;
  roles: Array<AuthProfileRole>;
}

// tslint:disable-next-line:no-empty-interface
export interface AuthProfile extends AuthProfileRequest {
  id: number;
}

export type AuthProfileList = List<AuthProfile, 'profiles'>;

export interface PeopleProfile {
  id: number;
  description: I18nModel;
  quote: I18nModel;
  websites: Array<Website>;
  social_networks: Array<SocialNetwork>;
  links: Array<Link>;
}
