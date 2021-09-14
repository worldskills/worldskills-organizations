import {Component, OnInit} from '@angular/core';
import { RedirectHandler, NgAuthService, GenericUtil } from '@worldskills/worldskills-angular-lib';
import {ActivatedRoute} from '@angular/router';

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
  ) {
  }

  ngOnInit(): void {
    const homepage = this.getHomepage();
    this.handler.redirectOrReturn({url: [homepage], onlyIfExact: this.route})
      .subscribe(() => (this.initialized = true));
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
    if (!GenericUtil.isNullOrUndefined(user)) {
      homepage = orgPage;
    } else {
      const hasAdminRole = user.roles.filter(x => x.name === 'Admin').length > 0;
      if (hasAdminRole) {
        homepage = orgPage;
      } else {
        const hasEditMemberRole = user.roles.filter(x => x.name === 'EditMember').length > 0;
        homepage = hasEditMemberRole ? memberPage : orgPage;
      }
    }

    return homepage;
  }

}
