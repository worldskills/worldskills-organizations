import { GenericUtil, User, UserRoleUtil } from '@worldskills/worldskills-angular-lib';
import { environment } from 'src/environments/environment';
export class PermissionHelper {
  static canEditMember(user: User, entityId: number): boolean {
    return PermissionHelper.canEdit(user, entityId, 'EditMember');
  }

  static canEditOrg(user: User, entityId: number): boolean {
    return PermissionHelper.canEdit(user, entityId, 'EditOrganization');
  }

  static canEdit(user: User, entityId: number, role: string): boolean {
    if (GenericUtil.isNullOrUndefined(user)) {
      return false;
    }

    if (UserRoleUtil.userHasRoles(user, environment.worldskillsAppId, 'Admin')) {
      return true;
    }

    return UserRoleUtil.userHasRolesOfEntity(user, environment.worldskillsAppId, entityId, role);
  }
}
