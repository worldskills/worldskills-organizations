import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, GenericUtil, NgAuthService, RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../../types/member';
import {MemberService} from '../../../services/member/member.service';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {MemberOrganizationService} from '../../../services/member-organization/member-organization.service';
import {DEFAULT_FETCH_PARAMS, OrganizationsService} from '../../../services/organizations/organizations.service';
import {OrganizationService} from '../../../services/organization/organization.service';
import { MemberOrganizationRequest, Organization, OrganizationRequest, OrganizationRelationType, OrganizationRelation } from '../../../types/organization';
import {OrganizationWebsiteService} from '../../../services/organization-website/organization-website.service';
import {WebsiteRequest} from '../../../types/website';
import { PermissionHelper } from '../../helpers/permission-helper';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

enum EditMode {
  None = 0,
  Add = 1,
  Edit = 2,
  Change = 3,
}

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent extends WsComponent implements OnInit {

  member: Member;
  organizations: Array<Organization> = [];
  loading = false;
  canEdit = false;
  editMode: EditMode = EditMode.None;
  @ViewChild('form') form: NgForm;
  @ViewChild('changeForm') changeForm: NgForm;
  cacheDate: NgbDateStruct;

  constructor(
    private auth: NgAuthService,
    private memberService: MemberService,
    private alertService: AlertService,
    private memberOrganizationService: MemberOrganizationService,
    private organizationsService: OrganizationsService,
    private organizationService: OrganizationService,
    private organizationWebsiteService: OrganizationWebsiteService,
    private translateService: TranslateService,
  ) {
    super();
    this.search = this.search.bind(this);
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => {
        this.member = member;
        this.canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, member.ws_entity.id);
        if (this.member.organization) {
          this.organizations = [this.member.organization];
        }
        this.organizationsService.subject.subscribe(organizations => {
          if (this.member.organization && !organizations.org_list.find(o => o.id === this.member.organization.id)) {
            this.organizations = [this.member.organization, ...organizations.org_list];
          } else {
            this.organizations = organizations.org_list;
          }
        });
      }),
      RxjsUtil.loaderSubscriber(
        this.memberService,
        this.memberOrganizationService,
        this.organizationService,
        this.organizationWebsiteService,
      ).subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.member;
  }

  switchEditMode(editMode: EditMode) {
    const dt = new Date();
    this.cacheDate = {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDate()
    }
    console.log(this.cacheDate);
    this.editMode = editMode;
  }

  search(name: string) {
    return this.organizationsService.fetch({...DEFAULT_FETCH_PARAMS, name});
  }

  submitChangeForm() {
    if (this.changeForm.valid) {
      const memberId = this.member.id;
      const {id} = this.changeForm.value;
      const data: MemberOrganizationRequest = {id};
      this.memberOrganizationService.bind(memberId, data)
        .subscribe(() => {
          this.editMode = EditMode.None;
          this.memberService.fetch(memberId);
          this.translateService.get('Updated member organization').subscribe(t => {
            this.alertService.setAlert('updated-member-organization', AlertType.success, null, t, true);
          });
        });
    }
  }

  getMemberRelationName(org: Organization): string {
    const item = this.getMemberRelation(org);
    return GenericUtil.isNullOrUndefined(item) ? '' : item.entity.name.text;
  }

  getMemberRelationSince(org: Organization): Date {
    const item = this.getMemberRelation(org);
    return GenericUtil.isNullOrUndefined(item) ? null : item.since;
  }

  getMemberRelationEnd(org: Organization): Date {
    const item = this.getMemberRelation(org);
    return GenericUtil.isNullOrUndefined(item) ? null : item.end;
  }

  getMemberRelation(org: Organization): OrganizationRelation {
    let relation = null;
    if (GenericUtil.isNullOrUndefined(org)) {
      return relation;
    }

    this.member.orgHistory.forEach(oh => {
      if (oh.id == org.id) {
        oh.relations.forEach(r => {
          if (r.type == OrganizationRelationType.MEMBER && r.entity.id == this.member.ws_entity.id) {
            relation = r;
          }
        });
      }
    });

    return relation;
  }


  submitForm() {
    if (this.form.valid) {
      const {name, url} = this.form.value;

      const data = {
        entityId: this.member.ws_entity.id,
        relation: OrganizationRelationType.MEMBER,
        name: { lang_code: 'en', text: name},
        relationSince: `${this.cacheDate.year}-${this.cacheDate.month}-${this.cacheDate.day}`
      };
      const websiteData: WebsiteRequest = url ? {url} : null;
      if (this.editMode === EditMode.Add) {
        this.organizationsService.create(data).subscribe(organization => {
          const bindToMemberCallback = () => this.memberOrganizationService.bind(this.member.id, {id: organization.id}).subscribe(() => {
            this.editMode = EditMode.None;
            this.memberService.fetch(this.member.id);
            this.translateService.get('Created new organization').subscribe(t => {
              this.alertService.setAlert('created-organization', AlertType.success, null, t, true);
            });
          });
          if (websiteData) {
            this.organizationWebsiteService.create(organization.id, websiteData).subscribe(() => bindToMemberCallback());
          } else {
            bindToMemberCallback();
          }
        });
      } else if (this.editMode === EditMode.Edit) {
        const cleanup = () => {
          this.editMode = EditMode.None;
          this.memberService.fetch(this.member.id);
          this.translateService.get('Updated organization').subscribe(t => {
            this.alertService.setAlert('updated-organization', AlertType.success, null, t, true);
          });
        };
        const updateWebsiteUrl = () => {
          if (this.member.organization.websites[0]) {
            if (websiteData) {
              return this.organizationWebsiteService.update(
                this.member.organization.id,
                this.member.organization.websites[0].id,
                websiteData
              );
            } else {
              return this.organizationWebsiteService.delete(
                this.member.organization.id,
                this.member.organization.websites[0].id
              );
            }
          } else if (websiteData) {
            return this.organizationWebsiteService.create(this.member.organization.id, websiteData);
          }
        };
        if (this.member.organization.name.text !== name) {
          this.organizationService.update(this.member.organization.id, data).subscribe(() => {
            updateWebsiteUrl().subscribe(() => cleanup());
          });
        } else {
          updateWebsiteUrl().subscribe(() => cleanup());
        }
      }
    }
  }

}
