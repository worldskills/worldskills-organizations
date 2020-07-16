import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {Link, List} from './common';

export interface AuthEntityRequest {
  id: number;
}

export interface AuthEntity extends AuthEntityRequest {
  name: I18nModel;
  parent_id?: number;
  children?: Array<AuthEntity>;
  links: Array<Link>;
}

export interface OrgEntity {
  id: number;
  name: I18nModel;
  parent: OrgEntity;
  links: Array<Link>;
}

export type AuthEntityList = List<AuthEntity, 'ws_entity_list'>;

export type OrgEntityList = List<OrgEntity, 'entities'>;
