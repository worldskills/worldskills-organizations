import {Component, OnInit} from '@angular/core';
import { RedirectHandler, NgAuthService, GenericUtil } from '@worldskills/worldskills-angular-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  initialized = false;

  constructor(
    private auth: NgAuthService,
    private handler: RedirectHandler,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const homepage = this.getHomepage();

    this.handler.redirectOrReturn({url: [homepage], onlyIfExact: this.route})
    .subscribe(() => {
      if (homepage.length > 0) {
        this.initialized = true;
      } else {
        this.auth.login();
      }
    });

  }

  // when admin then homepage = org
  // when editMember then homepge = member
  // when editOrg then homepage = org
  // when editMember and editOrg homepge = member
  // when no role, homepage = org
  getHomepage(): string {
    const orgPage = 'organizations';
    const memberPage = 'members';
    const user = this.auth.currentUser.value;
    let homepage = orgPage;
    if (GenericUtil.isNullOrUndefined(user)) {
      homepage = '';
    } else {
      // tslint:disable-next-line:max-line-length
      if (user.roles && (user.roles.length === 0 || user.roles.filter(x => x.role_application.application_code === environment.worldskillsAppId).length === 0)) {
        this.router.navigate(['/not-authorized']);
      } else {
        const hasAdminRole = user.roles.filter(x => x.name === 'Admin').length > 0;
        if (hasAdminRole) {
          homepage = orgPage;
        } else {
          const hasEditMemberRole = user.roles.filter(x => x.name === 'EditMember').length > 0;
          homepage = hasEditMemberRole ? memberPage : orgPage;
        }
      }
    }

    return homepage;
  }

}
