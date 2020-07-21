import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../types/member';
import {MemberService} from '../../services/member/member.service';
import {combineLatest, Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {MemberOrganizationService} from '../../services/member-organization/member-organization.service';
import {OrganizationsFetchParams, OrganizationsService} from '../../services/organizations/organizations.service';
import {OrganizationService} from '../../services/organization/organization.service';
import {MemberOrganizationRequest, Organization, OrganizationRequest} from '../../types/organization';
import {OrganizationWebsiteService} from '../../services/organization-website/organization-website.service';
import {WebsiteRequest} from '../../types/website';

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
  loadingOrganizations = false;
  editMode: EditMode = EditMode.None;
  debouncer = new Subject<OrganizationsFetchParams>();
  showMessage = true;
  @ViewChild('form') form: NgForm;
  @ViewChild('changeForm') changeForm: NgForm;

  constructor(
    private memberService: MemberService,
    private alertService: AlertService,
    private memberOrganizationService: MemberOrganizationService,
    private organizationsService: OrganizationsService,
    private organizationService: OrganizationService,
    private organizationWebsiteService: OrganizationWebsiteService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => {
        this.member = member;
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
      this.organizationsService.loading.subscribe(loadingOrganizations => (this.loadingOrganizations = loadingOrganizations)),
      this.debouncer.pipe(debounceTime(200)).subscribe(fetchParams => this.organizationsService.fetch(fetchParams)),
      combineLatest([
        this.memberService.loading,
        this.memberOrganizationService.loading,
        this.organizationService.loading,
        this.organizationWebsiteService.loading,
      ]).pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.member;
  }

  switchEditMode(editMode: EditMode) {
    this.editMode = editMode;
  }

  search(name: string) {
    if (name.length > 2) {
      this.showMessage = false;
      this.debouncer.next({
        offset: 0,
        limit: 9999,
        name,
      });
    } else {
      this.showMessage = true;
    }
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
            this.alertService.setAlert('updated-member-organization', AlertType.success, null, null, t, true);
          });
        });
    }
  }

  submitForm() {
    if (this.form.valid) {
      const {name, url} = this.form.value;
      const data: OrganizationRequest = {
        name: {
          text: name,
          lang_code: 'en',
        },
      };
      const websiteData: WebsiteRequest = {url};
      if (this.editMode === EditMode.Add) {
        this.organizationService.create(data).subscribe(organization => {
          this.organizationWebsiteService.create(organization.id, websiteData).subscribe(() => {
            this.memberOrganizationService.bind(this.member.id, {id: organization.id}).subscribe(() => {
              this.editMode = EditMode.None;
              this.memberService.fetch(this.member.id);
              this.translateService.get('Created new organization').subscribe(t => {
                this.alertService.setAlert('created-organization', AlertType.success, null, null, t, true);
              });
            });
          });
        });
      } else if (this.editMode === EditMode.Edit) {
        const cleanup = () => {
          this.editMode = EditMode.None;
          this.memberService.fetch(this.member.id);
          this.translateService.get('Updated organization').subscribe(t => {
            this.alertService.setAlert('updated-organization', AlertType.success, null, null, t, true);
          });
        };
        const updateWebsiteUrl = () =>
          this.organizationWebsiteService.update(this.member.organization.id, this.member.organization.websites[0].id, websiteData);
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