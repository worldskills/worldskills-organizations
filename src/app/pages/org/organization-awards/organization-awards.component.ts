import {Component, OnInit} from '@angular/core';
import {
  AlertService,
  AlertType,
  NgAuthService,
  OrganizationAward,
  RecipientAwardRequest,
  WsComponent
} from '@worldskills/worldskills-angular-lib';
import {Organization} from '../../../../types/organization';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {ActivatedRoute} from '@angular/router';
import {OrganizationAwardService} from '../../../../services/organization-award/organization-award.service';
import {PermissionHelper} from '../../../helpers/permission-helper';
import {TranslateService} from '@ngx-translate/core';
import {OrganizationAwardRequest} from '../../../../types/organization-award';

@Component({
  selector: 'app-organization-awards',
  templateUrl: './organization-awards.component.html',
  styleUrls: ['./organization-awards.component.css']
})
export class OrganizationAwardsComponent extends WsComponent implements OnInit {

  organization: Organization;
  organizationAwards: OrganizationAward[];
  canEdit = false;

  constructor(private orgService: OrganizationService,
              private orgAwardService: OrganizationAwardService,
              private auth: NgAuthService,
              private translateService: TranslateService,
              private alertService: AlertService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(({orgId}) => {
      this.orgService.get(orgId).subscribe(org => {
        this.organization = org;
        this.canEdit = PermissionHelper.canEditOrg(this.auth.currentUser.value, org.wsEntity.id);

        this.loadOrgAwards();
      });
    });
  }

  private loadOrgAwards() {
    this.orgAwardService.getOrgAwards(this.organization.id).subscribe(res => {
      this.organizationAwards = res.organization_awards;
    });
  }


  deleteOrganizationAward(orgAward: any) {
    const oa = orgAward as OrganizationAward;

    this.translateService.get('delete_org_award_confirm').subscribe(t => {
      if (confirm(t)) {
        this.orgAwardService.delete(oa.id).subscribe(_ => {
          this.loadOrgAwards();
          this.alertService.setAlert('new-alert', AlertType.success, null, 'Award deleted', true);
        });
      }
    });
  }

  saveOrganizationAward(rar: RecipientAwardRequest, type: 'create' | 'update') {
    const dataRequest: OrganizationAwardRequest = {
      organization_id: this.organization.id,
      award: rar.award,
      presented_at: rar.presented_at,
      extra_information: rar.extra_information,
    };

    (type === 'update' ?
      this.orgAwardService.update(rar.id, dataRequest) :
      this.orgAwardService.create(dataRequest)).subscribe(_ => {
      this.loadOrgAwards();
      this.alertService.setAlert('new-alert', AlertType.success, null, 'Award saved', true);
    });
  }
}
