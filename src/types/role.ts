import {Link, List} from './common';
import {AuthEntity} from './entity';
import {RoleApplication} from './roleApplication';

export interface RoleRequest {
  role_id: number;
  ws_entity_id?: number;
  people_ids?: Array<number>;
}

export interface Role {
  id: number;
  role_application_id: number;
  name: string;
  description: string;
  apply_per_entity: boolean;
  ws_entity: AuthEntity;
  links: Array<Link>;
  role_application: RoleApplication;
}

export type RoleList = List<Role, 'roles'>;
