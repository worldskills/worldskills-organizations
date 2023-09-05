import { Component, OnInit } from '@angular/core';
import { Organization, OrganizationRequest, OrganizationContact, OrganizationContactList } from '../../../../types/organization';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { take } from 'rxjs/operators';
import { BreadcrumbsService, ErrorUtil, AlertService, AlertType, NgAuthService, GenericUtil } from '@worldskills/worldskills-angular-lib';
import { defaultErrorMessage } from '../../../app-config';
import { Member } from '../../../../types/member';
import { ContactRequest } from '../../../../types/contact';
import { TranslateService } from '@ngx-translate/core';
import { Website, WebsiteList, WebsiteRequest, OrgWebsiteRequest, OrgWebsite } from '../../../../types/website';
import { PermissionHelper } from '../../../helpers/permission-helper';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  // main props
  canEdit = false;
  viewName: string;
  orgId: number;
  org: Organization;

  // sub props
  members: Member[];
  contactList: OrganizationContactList;
  websiteList: WebsiteList;

  loading = false;

  constructor(private breadcrumbs: BreadcrumbsService, private route: ActivatedRoute, private orgs: OrganizationService,
              private auth: NgAuthService, private translator: TranslateService, private alerts: AlertService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('viewName')) {
        this.viewName = params.viewName;
      } else {
        this.viewName = 'info';
      }
      if (params.hasOwnProperty('orgId')) {
        this.orgId = Number.parseInt(params.orgId, 10);
        this.loadOrg();
      }
    });
  }

  loadOrg() {
    this.loading = true;
    this.orgs.get(this.orgId).pipe(take(1)).subscribe(
      next => {
        this.org = next;
        this.canEdit = PermissionHelper.canEditOrg(this.auth.currentUser.value, this.org.wsEntity.id);
      },
      error => this.handleError(error, 'load-orgs'),
      () => {
        this.loading = false;
        this.breadcrumbs.replaceLabel('Organization', this.org.name.text);
        this.breadcrumbs.add({ key: 'view', label: this.viewName, url: `/organizations/${this.orgId}/${this.viewName}` });
        this.loadView();
      }
    );
  }

  loadMembers() {
    this.loading = true;
    this.orgs.getMembers(this.orgId).pipe(take(1)).subscribe(
      next => this.members = next,
      error => this.handleError(error, 'load-members'),
      () => this.loading = false
    );
  }

  loadContacts() {
    this.loading = true;
    this.orgs.getContacts(this.orgId).pipe(take(1)).subscribe(
      next => this.contactList = next,
      error => this.handleError(error, 'load-contacts'),
      () => this.loading = false
    );
  }

  loadWebsites() {
    this.loading = true;
    this.orgs.getWebsites(this.orgId).pipe(take(1)).subscribe(
      next => this.websiteList = next,
      error => this.handleError(error, 'load-websites'),
      () => this.loading = false
    );
  }


  loadView() {
    switch (this.viewName) {
      default:
      case 'info':
        break;
      case 'members':
        this.loadMembers();
        break;
      case 'contacts':
        this.loadContacts();
        break;
      case 'websites':
        this.loadWebsites();
        break;
      case 'awards':
        // let the awards component handle this
        break;
    }
  }

  save(org: Organization) {
    this.loading = true;
    const logo = GenericUtil.isNullOrUndefined(org.logo) ? null : {
      id:  org.logo.id,
      image_id: org.logo.image_id,
      thumbnail_hash: org.logo.thumbnail,
    }
    const update: OrganizationRequest = {
      name: org.name,
      logo
    };
    this.orgs.update(this.orgId, update).pipe(take(1)).subscribe(
      next => this.org = next,
      error => this.handleError(error, 'save-org'),
      () => this.loading = false
    );
  }

  deleteContact(contact: OrganizationContact) {
    this.translator.get('Are you sure you want to remove the contact').subscribe(t => {
      if (confirm(t)) {
        this.loading = true;
        this.orgs.deleteContacts(this.org.id, contact.id).pipe(take(1)).subscribe(
          next => this.handleSuccess('delete-contact', 'contact deleted'),
          error => this.handleError(error, 'delete-contact'),
          () => {
            this.loading = false;
            this.loadContacts();
          }
        );
      }
    });
  }

  saveContact(request: ContactRequest) {
    this.orgs.createContacts(this.org.id, request).pipe(take(1)).subscribe(
      next => this.handleSuccess('add-contact', 'contact added'),
      error => this.handleError(error, 'add-contact'),
      () => {
        this.loading = false;
        this.loadContacts();
      }
    );
  }

  saveWebsite(request: OrgWebsiteRequest) {
    this.orgs.createWebsite(this.orgId, request).pipe(take(1)).subscribe(
      next => this.handleSuccess('add-website', 'website added'),
      error => this.handleError(error, 'add-website'),
      () => {
        this.loading = false;
        this.loadWebsites();
      }
    );
  }

  updateWebsite(website: OrgWebsite) {
    this.orgs.updateWebsite(this.orgId, website.id, website).pipe(take(1)).subscribe(
      next => this.handleSuccess('update-website', 'website update'),
      error => this.handleError(error, 'add-update'),
      () => {
        this.loading = false;
        this.loadWebsites();
      }
    );
  }

  deleteWebsite(website: Website) {
    this.translator.get('Are you sure you want to remove the website').subscribe(t => {
      if (confirm(t)) {
        this.loading = true;
        this.orgs.deleteWebsite(this.org.id, website.id).pipe(take(1)).subscribe(
          next => this.handleSuccess('delete-website', 'Website deleted'),
          error => this.handleError(error, 'delete-website'),
          () => {
            this.loading = false;
            this.loadWebsites();
          }
        );
      }
    });
  }

  handleError(error: any, context: string) {
    this.loading = false;
    const msg = ErrorUtil.getErrorMsg(error, defaultErrorMessage);
    this.alerts.setAlert(context, AlertType.error, null, msg, true);
  }

  handleSuccess(title: string, msg: string) {
    this.translator.get(msg).subscribe(t2 => {
      this.alerts.setAlert(title, AlertType.success, null, t2, true);
    });
  }

}
