import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, NgAuthService, RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../../types/member';
import {MemberService} from '../../../services/member/member.service';
import {OrgWebsite as Website, OrgWebsiteRequest as WebsiteRequest} from '../../../types/website';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {WebsitesService} from '../../../services/websites/websites.service';
import { PermissionHelper } from '../../helpers/permission-helper';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent extends WsComponent implements OnInit {

  member: Member;
  loading = false;
  editingWebsite: Website = null;
  canEdit = false;
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private auth: NgAuthService,
    private memberService: MemberService,
    private websitesService: WebsitesService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => {
        this.member = member;
        this.calculateCanEdit(member);
      }),
      RxjsUtil.loaderSubscriber(
        this.memberService,
        this.websitesService,
      ).subscribe(loading => (this.loading = loading)),
    );
  }

  calculateCanEdit(member: Member)
  {
    let canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, member.ws_entity.id);
    if (!canEdit) {
      member.member_of.forEach(parent => {
        if (!canEdit) {
          canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, parent.ws_entity.id);
        }
      });
    }

    this.canEdit = canEdit;
  }

  get initialized() {
    return !!this.member;
  }

  editWebsite(website: Website) {
    this.editingWebsite = website;
  }

  cancelEditWebsite() {
    this.editingWebsite = null;
  }

  unbindWebsite(website: Website) {
    const memberId = this.member.id;
    this.translateService.get('Are you sure you want to remove the website').subscribe(t => {
      if (confirm(t)) {
        this.websitesService.unbind(memberId, website.id)
          .subscribe(() => {
            this.memberService.fetch(memberId);
            this.translateService.get('Removed website').subscribe(t2 => {
              this.alertService.setAlert('removed-website', AlertType.success, null, t2, true);
            });
          });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const memberId = this.member.id;
      const {url, name, description} = this.editForm.value;
      const data: WebsiteRequest = {
        url,
        name: {
          lang_code: 'en',
          text: name,
        },
        description: {
          lang_code: 'en',
          text: description,
        },
      };
      this.websitesService.update(memberId, this.editingWebsite.id, data)
        .subscribe(() => {
          this.editingWebsite = null;
          this.memberService.fetch(memberId);
          this.translateService.get('Updated website').subscribe(t => {
            this.alertService.setAlert('updated-website', AlertType.success, null, t, true);
          });
        });
    }
  }

  submitForm() {
    if (this.form.valid) {
      const memberId = this.member.id;
      const {url, name, description} = this.form.value;
      const data: WebsiteRequest = {
        url,
        name: {
          lang_code: 'en',
          text: name,
        },
        description: {
          lang_code: 'en',
          text: description,
        },
      };
      this.websitesService.bind(memberId, data)
        .subscribe(() => {
          this.memberService.fetch(memberId);
          this.translateService.get('Added website').subscribe(t => {
            this.alertService.setAlert('added-website', AlertType.success, null, t, true);
          });
        });
    }
  }

}
