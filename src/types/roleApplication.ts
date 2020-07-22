import {Link, List} from './common';

export interface RoleApplication {
  id: number;
  name: string;
  application_code: number;
  links: Array<Link>;
  manages_own_roles: boolean;
}

export type RoleApplicationList = List<RoleApplication, 'role_applications'>;
